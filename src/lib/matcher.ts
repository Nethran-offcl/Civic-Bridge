import type { IncomeRange, UserProfile } from "@/types/profile";
import type { MatchResult, Scheme } from "@/types/scheme";
import { clamp } from "./utils";

const incomeRank: Record<IncomeRange, number> = {
  below_50000: 1,
  "50000_100000": 2,
  "100000_200000": 3,
  "200000_500000": 4,
  above_500000: 5
};

export function matchSchemesToProfile(profile: UserProfile, schemes: Scheme[]): MatchResult[] {
  return schemes
    .map((scheme) => evaluateEligibility(profile, scheme))
    .sort((a, b) => b.score - a.score || a.scheme.name.localeCompare(b.scheme.name));
}

export function evaluateEligibility(profile: UserProfile, scheme: Scheme): MatchResult {
  const matchedCriteria: string[] = [];
  const missingCriteria: string[] = [];
  const hardFailures: string[] = [];
  const criteria = scheme.eligibility;

  if (criteria.states?.length && !criteria.states.includes("all") && !criteria.states.includes(profile.state)) {
    hardFailures.push(`Only available in ${criteria.states.join(", ")}`);
  } else {
    matchedCriteria.push(criteria.states?.includes("all") ? "Available nationally" : `Available in ${profile.state}`);
  }

  if (criteria.age?.min !== undefined && profile.age < criteria.age.min) {
    hardFailures.push(`Minimum age is ${criteria.age.min}`);
  }

  if (criteria.age?.max !== undefined && profile.age > criteria.age.max) {
    hardFailures.push(`Maximum age is ${criteria.age.max}`);
  }

  if (!hardFailures.some((failure) => failure.includes("age"))) {
    matchedCriteria.push("Age fits");
  }

  if (criteria.gender && criteria.gender !== profile.gender) {
    hardFailures.push(`Requires ${criteria.gender} applicant`);
  } else if (criteria.gender) {
    matchedCriteria.push("Gender criterion fits");
  }

  if (criteria.disabilityOnly && !profile.disability) {
    hardFailures.push("Requires disability status");
  }

  if (hardFailures.length > 0) {
    return {
      scheme,
      score: 25,
      status: "Check Required",
      matchedCriteria,
      missingCriteria,
      hardFailures
    };
  }

  let score = 45;

  if (criteria.occupations?.includes(profile.occupation)) {
    score += 20;
    matchedCriteria.push("Occupation matches");
  } else if (criteria.occupations?.length) {
    missingCriteria.push("Occupation may need manual verification");
  } else {
    score += 8;
  }

  if (criteria.incomeRanges?.includes(profile.annualIncome)) {
    score += 15;
    matchedCriteria.push("Income range matches");
  } else if (criteria.incomeRanges?.length) {
    const maxAllowed = Math.max(...criteria.incomeRanges.map((range) => incomeRank[range]));
    if (incomeRank[profile.annualIncome] <= maxAllowed) {
      score += 10;
      matchedCriteria.push("Income appears within broad range");
    } else {
      missingCriteria.push("Income may be above scheme range");
    }
  }

  if (profile.caste !== "prefer_not_to_say" && criteria.caste?.includes(profile.caste)) {
    score += 10;
    matchedCriteria.push("Category criterion matches");
  } else if (!criteria.caste?.length) {
    score += 5;
  } else if (profile.caste === "prefer_not_to_say") {
    missingCriteria.push("Category not provided");
  } else {
    missingCriteria.push("Category may need verification");
  }

  if (profile.landHolding && criteria.landHolding?.includes(profile.landHolding)) {
    score += 10;
    matchedCriteria.push("Landholding fits");
  } else if (!criteria.landHolding?.length) {
    score += 5;
  } else if (!profile.landHolding) {
    missingCriteria.push("Landholding not provided");
  } else {
    missingCriteria.push("Landholding may not fit");
  }

  if (criteria.states?.includes(profile.state)) {
    score += 5;
  }

  const finalScore = clamp(score, 0, 100);
  const status = finalScore >= 80 ? "Eligible" : finalScore >= 50 ? "Likely Eligible" : "Check Required";

  return {
    scheme,
    score: finalScore,
    status,
    matchedCriteria: matchedCriteria.slice(0, 5),
    missingCriteria,
    hardFailures
  };
}
