import { NextResponse } from "next/server";
import { z } from "zod";
import { getAllSchemes } from "@/lib/schemes";
import { matchSchemesToProfile } from "@/lib/matcher";
import { supabaseAdmin } from "@/lib/supabase";
import type { UserProfile } from "@/types/profile";

const profileSchema = z.object({
  age: z.number().int().min(1).max(120),
  gender: z.enum(["male", "female", "other"]),
  state: z.string().min(1),
  district: z.string().min(0),
  occupation: z.enum([
    "farmer",
    "agricultural_labourer",
    "fisherman",
    "artisan",
    "construction_worker",
    "domestic_worker",
    "small_business",
    "student",
    "unemployed",
    "other"
  ]),
  annualIncome: z.enum(["below_50000", "50000_100000", "100000_200000", "200000_500000", "above_500000"]),
  caste: z.enum(["SC", "ST", "OBC", "General", "prefer_not_to_say"]),
  landHolding: z.enum(["landless", "below_1acre", "1_2acres", "2_5acres", "above_5acres"]).optional(),
  disability: z.boolean().optional(),
  preferredLanguage: z.enum(["en", "hi", "kn", "ta", "te", "mr", "bn", "gu"]),
  familySize: z.number().int().min(1).max(30).optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = profileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid profile", details: parsed.error.flatten() }, { status: 400 });
  }

  const profile: UserProfile = parsed.data;
  const matches = matchSchemesToProfile(profile, getAllSchemes());
  const topMatches = matches.filter((match) => match.score >= 50).slice(0, 12);

  let savedProfileId: string | null = null;

  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("user_profiles")
      .insert([
        {
          age: profile.age,
          gender: profile.gender,
          state: profile.state,
          district: profile.district,
          occupation: profile.occupation,
          annual_income: profile.annualIncome,
          caste: profile.caste,
          disability: profile.disability ?? false,
          land_holding: profile.landHolding,
          preferred_language: profile.preferredLanguage,
          family_size: profile.familySize
        }
      ])
      .select("id")
      .single();

    if (!error && data && typeof data.id === "string") {
      savedProfileId = data.id;
    }
  }

  return NextResponse.json({
    profileId: savedProfileId,
    matches: topMatches,
    allMatches: matches
  });
}
