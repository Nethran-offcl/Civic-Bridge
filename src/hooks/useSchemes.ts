"use client";

import { useCallback, useEffect, useState } from "react";
import type { Scheme, SchemeCategory } from "@/types/scheme";

export function useSchemes(initialCategory: SchemeCategory | "all" = "all") {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<SchemeCategory | "all">(initialCategory);
  const [query, setQuery] = useState("");

  const loadSchemes = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "all") params.set("category", category);

    const response = await fetch(`/api/schemes?${params.toString()}`);
    const data = (await response.json()) as { schemes: Scheme[] };
    setSchemes(data.schemes);
    setIsLoading(false);
  }, [category, query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadSchemes();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadSchemes]);

  return {
    schemes,
    isLoading,
    category,
    setCategory,
    query,
    setQuery,
    refresh: loadSchemes
  };
}
