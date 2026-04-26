export interface UserProfile {
  age: number;
  gender: Gender;
  state: string;
  district: string;
  occupation: OccupationCategory;
  annualIncome: IncomeRange;
  caste: CasteCategory;
  landHolding?: LandHolding;
  disability?: boolean;
  preferredLanguage: SupportedLanguage;
  familySize?: number;
}

export type Gender = "male" | "female" | "other";

export type OccupationCategory =
  | "farmer"
  | "agricultural_labourer"
  | "fisherman"
  | "artisan"
  | "construction_worker"
  | "domestic_worker"
  | "small_business"
  | "student"
  | "unemployed"
  | "other";

export type IncomeRange =
  | "below_50000"
  | "50000_100000"
  | "100000_200000"
  | "200000_500000"
  | "above_500000";

export type CasteCategory = "SC" | "ST" | "OBC" | "General" | "prefer_not_to_say";

export type LandHolding = "landless" | "below_1acre" | "1_2acres" | "2_5acres" | "above_5acres";

export type SupportedLanguage = "en" | "hi" | "kn" | "ta" | "te" | "mr" | "bn" | "gu";

export const INCOME_LABELS: Record<IncomeRange, string> = {
  below_50000: "Below Rs. 50,000",
  "50000_100000": "Rs. 50,000 - Rs. 1 lakh",
  "100000_200000": "Rs. 1 lakh - Rs. 2 lakh",
  "200000_500000": "Rs. 2 lakh - Rs. 5 lakh",
  above_500000: "Above Rs. 5 lakh"
};

export const OCCUPATION_LABELS: Record<OccupationCategory, string> = {
  farmer: "Farmer",
  agricultural_labourer: "Agricultural labourer",
  fisherman: "Fisherman",
  artisan: "Artisan",
  construction_worker: "Construction worker",
  domestic_worker: "Domestic worker",
  small_business: "Small business",
  student: "Student",
  unemployed: "Unemployed",
  other: "Other"
};
