import { NextResponse } from "next/server";
import { searchSchemes } from "@/lib/schemes";
import type { SchemeCategory } from "@/types/scheme";

const categories: Array<SchemeCategory | "all"> = [
  "all",
  "agriculture",
  "health",
  "education",
  "housing",
  "women",
  "skill",
  "pension",
  "startup",
  "insurance",
  "labour"
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? undefined;
  const state = url.searchParams.get("state") ?? undefined;
  const rawCategory = url.searchParams.get("category") ?? "all";
  const category = categories.includes(rawCategory as SchemeCategory | "all")
    ? (rawCategory as SchemeCategory | "all")
    : "all";

  return NextResponse.json({
    schemes: searchSchemes({ query, state, category })
  });
}
