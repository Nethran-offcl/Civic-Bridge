"use client";

import { useEffect, useRef } from "react";
import { useProfileStore } from "@/store/profileStore";
import type { SupportedLanguage } from "@/types/profile";

const textOriginals = new WeakMap<Text, string>();
const attrOriginals = new WeakMap<Element, Map<string, string>>();
const translationCache = new Map<string, string>();
const translatedAttributes = ["placeholder", "title", "aria-label", "alt"] as const;

type TranslateResponse = {
  texts?: string[];
};

function shouldSkipElement(element: Element | null) {
  return Boolean(
    element?.closest(
      '[data-no-translate], script, style, textarea, input, [contenteditable="true"]'
    )
  );
}

function shouldSkipAttributeElement(element: Element | null) {
  return Boolean(element?.closest('[data-no-translate], script, style, [contenteditable="true"]'));
}

function isTranslatable(value: string) {
  const text = value.trim();
  if (text.length < 2) return false;
  if (/^https?:\/\//i.test(text)) return false;
  if (/^[\d\s.,:%/+()-]+$/.test(text)) return false;
  return /[A-Za-z]/.test(text);
}

function withOriginalSpacing(original: string, translated: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function getTextNodes(root: ParentNode) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const textNode = node as Text;
      if (shouldSkipElement(textNode.parentElement)) return NodeFilter.FILTER_REJECT;
      if (textOriginals.has(textNode)) return NodeFilter.FILTER_ACCEPT;
      return isTranslatable(textNode.nodeValue ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  let next = walker.nextNode();
  while (next) {
    nodes.push(next as Text);
    next = walker.nextNode();
  }
  return nodes;
}

function getAttributeTargets(root: ParentNode) {
  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(document.querySelectorAll("*"));
  return elements.flatMap((element) => {
    if (shouldSkipAttributeElement(element)) return [];
    return translatedAttributes
      .filter((attribute) => attrOriginals.get(element)?.has(attribute) || isTranslatable(element.getAttribute(attribute) ?? ""))
      .map((attribute) => ({ element, attribute }));
  });
}

async function requestTranslations(texts: string[], language: SupportedLanguage) {
  const missing = texts.filter((text) => !translationCache.has(`${language}:${text}`));
  const chunks: string[][] = [];
  let current: string[] = [];
  let size = 0;

  for (const text of missing) {
    const nextSize = size + text.length;
    // Chunk size 50 is a sweet spot: it avoids the 5 requests/minute API rate limit 
    // while keeping the JSON array small enough for Gemini to maintain length stability.
    if (current.length > 0 && (current.length >= 50 || nextSize > 3000)) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(text);
    size += text.length;
  }
  if (current.length > 0) chunks.push(current);

  for (const chunk of chunks) {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: chunk, targetLanguage: language })
    });

    if (!response.ok) continue;

    const data = (await response.json()) as TranslateResponse;
    data.texts?.forEach((translated, index) => {
      translationCache.set(`${language}:${chunk[index]}`, translated);
    });
  }

  return texts.map((text) => translationCache.get(`${language}:${text}`) ?? text);
}

export function AppTranslator() {
  const language = useProfileStore((state) => state.language);
  const applyingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;

    async function translatePage(root: ParentNode = document.body) {
      if (!document.body || applyingRef.current) return;

      const textNodes = getTextNodes(root);
      const attrTargets = getAttributeTargets(root);

      for (const node of textNodes) {
        if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue ?? "");
      }

      for (const { element, attribute } of attrTargets) {
        const originalAttributes = attrOriginals.get(element) ?? new Map<string, string>();
        if (!originalAttributes.has(attribute)) {
          originalAttributes.set(attribute, element.getAttribute(attribute) ?? "");
          attrOriginals.set(element, originalAttributes);
        }
      }

      if (language === "en") {
        applyingRef.current = true;
        textNodes.forEach((node) => {
          const original = textOriginals.get(node);
          if (original) node.nodeValue = original;
        });
        attrTargets.forEach(({ element, attribute }) => {
          const original = attrOriginals.get(element)?.get(attribute);
          if (original) element.setAttribute(attribute, original);
        });
        applyingRef.current = false;
        return;
      }

      const originals = [
        ...textNodes.map((node) => textOriginals.get(node)?.trim() ?? ""),
        ...attrTargets.map(({ element, attribute }) => attrOriginals.get(element)?.get(attribute)?.trim() ?? "")
      ].filter(Boolean);

      const unique = Array.from(new Set(originals));
      const translated = await requestTranslations(unique, language);
      const byOriginal = new Map(unique.map((text, index) => [text, translated[index]]));

      applyingRef.current = true;
      textNodes.forEach((node) => {
        const original = textOriginals.get(node) ?? node.nodeValue ?? "";
        const translatedText = byOriginal.get(original.trim());
        if (translatedText) node.nodeValue = withOriginalSpacing(original, translatedText);
      });
      attrTargets.forEach(({ element, attribute }) => {
        const original = attrOriginals.get(element)?.get(attribute) ?? element.getAttribute(attribute) ?? "";
        const translatedText = byOriginal.get(original.trim());
        if (translatedText) element.setAttribute(attribute, translatedText);
      });
      applyingRef.current = false;
    }

    void translatePage();

    const observer = new MutationObserver((mutations) => {
      if (applyingRef.current) return;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const target = mutations.find((mutation) => mutation.target instanceof Element)?.target;
        void translatePage(target instanceof Element ? target : document.body);
      }, 150);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...translatedAttributes]
    });

    return () => {
      observer.disconnect();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [language]);

  return null;
}
