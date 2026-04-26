import type { Scheme } from "@/types/scheme";
import { getAllSchemes, getSchemeById } from "./schemes";
import { normalizeText } from "./utils";

interface SchemeChunk {
  scheme: Scheme;
  text: string;
  vector: Map<string, number>;
}

let cachedChunks: SchemeChunk[] | null = null;

function tokenize(text: string) {
  return normalizeText(text)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

function vectorize(text: string) {
  const vector = new Map<string, number>();
  for (const token of tokenize(text)) {
    vector.set(token, (vector.get(token) ?? 0) + 1);
  }
  return vector;
}

export function cosineSimilarity(a: Map<string, number>, b: Map<string, number>) {
  let dot = 0;
  let aNorm = 0;
  let bNorm = 0;

  for (const value of a.values()) {
    aNorm += value * value;
  }

  for (const [token, value] of b.entries()) {
    bNorm += value * value;
    dot += (a.get(token) ?? 0) * value;
  }

  if (aNorm === 0 || bNorm === 0) return 0;
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm));
}

export function initRAG() {
  if (cachedChunks) return cachedChunks;

  cachedChunks = getAllSchemes().map((scheme) => {
    const text = [
      scheme.name,
      scheme.ministry,
      scheme.category,
      scheme.descriptionDetailed,
      scheme.eligibility.notes.join(" "),
      scheme.benefits.map((benefit) => `${benefit.title} ${benefit.amount ?? ""} ${benefit.description}`).join(" "),
      scheme.applicationProcess.map((step) => `${step.title} ${step.description}`).join(" "),
      scheme.documents.join(" "),
      scheme.tags.join(" ")
    ].join(" ");

    return {
      scheme,
      text,
      vector: vectorize(text)
    };
  });

  return cachedChunks;
}

export function retrieveRelevantSchemes(query: string, options: { schemeId?: string; topK?: number } = {}) {
  if (options.schemeId) {
    const scheme = getSchemeById(options.schemeId);
    if (scheme) return [scheme];
  }

  const queryVector = vectorize(query);
  const topK = options.topK ?? 5;

  return initRAG()
    .map((chunk) => ({
      scheme: chunk.scheme,
      score: cosineSimilarity(chunk.vector, queryVector)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((result) => result.scheme);
}
