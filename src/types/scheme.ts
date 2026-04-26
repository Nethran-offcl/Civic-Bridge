import type { CasteCategory, Gender, IncomeRange, LandHolding, OccupationCategory } from "./profile";

export type SchemeCategory =
  | "agriculture"
  | "health"
  | "education"
  | "housing"
  | "women"
  | "skill"
  | "pension"
  | "startup"
  | "insurance"
  | "labour";

export interface EligibilityCriteria {
  age?: {
    min?: number;
    max?: number;
  };
  states?: string[];
  gender?: Gender;
  occupations?: OccupationCategory[];
  incomeRanges?: IncomeRange[];
  caste?: Exclude<CasteCategory, "prefer_not_to_say">[];
  landHolding?: LandHolding[];
  disabilityOnly?: boolean;
  notes: string[];
}

export interface SchemeBenefit {
  title: string;
  amount?: string;
  description: string;
}

export interface ApplicationStep {
  title: string;
  description: string;
  url?: string;
}

export interface Scheme {
  id: string;
  name: string;
  nameHindi?: string;
  nameLocal?: string;
  ministry: string;
  category: SchemeCategory;
  subCategory?: string;
  description: string;
  descriptionDetailed: string;
  eligibility: EligibilityCriteria;
  benefits: SchemeBenefit[];
  applicationProcess: ApplicationStep[];
  documents: string[];
  applicationUrl?: string;
  helplineNumber?: string;
  deadline?: string;
  state?: string;
  isActive: boolean;
  tags: string[];
  lastUpdated: string;
  sourceUrl?: string;
}

export type EligibilityStatus = "Eligible" | "Likely Eligible" | "Check Required";

export interface MatchResult {
  scheme: Scheme;
  score: number;
  status: EligibilityStatus;
  matchedCriteria: string[];
  missingCriteria: string[];
  hardFailures: string[];
}
