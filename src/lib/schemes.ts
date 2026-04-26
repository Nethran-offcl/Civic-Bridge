import centralSchemes from "../../data/schemes/central_schemes.json";
import stateSchemes from "../../data/schemes/state_schemes.json";
import type { Scheme, SchemeCategory } from "@/types/scheme";
import { normalizeText } from "./utils";

const allSchemes = [...centralSchemes, ...stateSchemes] as Scheme[];

export interface SchemeSearchParams {
  query?: string;
  category?: SchemeCategory | "all";
  state?: string;
}

export function getAllSchemes() {
  return allSchemes.filter((scheme) => scheme.isActive);
}

export function getSchemeById(id: string) {
  return getAllSchemes().find((scheme) => scheme.id === id);
}

export function getSchemesByCategory(category: SchemeCategory) {
  return getAllSchemes().filter((scheme) => scheme.category === category);
}

export function searchSchemes(params: SchemeSearchParams = {}) {
  const query = normalizeText(params.query ?? "");
  const state = normalizeText(params.state ?? "");
  const category = params.category ?? "all";

  return getAllSchemes().filter((scheme) => {
    const matchesCategory = category === "all" || scheme.category === category;
    const schemeStates = scheme.eligibility.states ?? ["all"];
    const matchesState =
      !state ||
      schemeStates.includes("all") ||
      schemeStates.some((schemeState) => normalizeText(schemeState) === state);

    const searchable = [
      scheme.name,
      scheme.ministry,
      scheme.category,
      scheme.subCategory ?? "",
      scheme.description,
      scheme.descriptionDetailed,
      scheme.tags.join(" "),
      scheme.documents.join(" "),
      scheme.eligibility.notes.join(" ")
    ].join(" ");

    const matchesQuery = !query || normalizeText(searchable).includes(query);
    return matchesCategory && matchesState && matchesQuery;
  });
}

export function getCategoryAccent(category: SchemeCategory) {
  const accents: Record<SchemeCategory, string> = {
    agriculture: "#16a34a",
    health: "#2563eb",
    education: "#7c3aed",
    housing: "#ea580c",
    women: "#db2777",
    skill: "#0891b2",
    pension: "#64748b",
    startup: "#9333ea",
    insurance: "#0f766e",
    labour: "#ca8a04"
  };

  return accents[category];
}
