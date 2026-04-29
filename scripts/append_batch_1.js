const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/schemes/central_schemes.json');
const schemes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newSchemes = [
  // FARMER
  {
    "id": "PM-FBY-011",
    "name": "Pradhan Mantri Fasal Bima Yojana",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "category": "agriculture",
    "subCategory": "Crop Insurance",
    "description": "Comprehensive crop insurance scheme from pre-sowing to post-harvest.",
    "descriptionDetailed": "PMFBY provides insurance cover against crop loss due to non-preventable natural risks, ensuring financial stability for farmers.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["farmer"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000", "above_500000"],
      "caste": [],
      "landHolding": ["below_1acre", "1_2acres", "2_5acres", "above_5acres"],
      "notes": ["All farmers growing notified crops in notified areas are eligible.", "Voluntary for all farmers."]
    },
    "benefits": [
      { "title": "Crop Insurance", "amount": "Varies by crop", "description": "Financial support in case of crop failure due to natural calamities, pests & diseases." }
    ],
    "applicationProcess": [
      { "title": "Contact Bank/CSC", "description": "Approach nearest bank branch, CSC, or authorized insurance agent." },
      { "title": "Submit Details", "description": "Provide land details, bank account, and sowing certificate." },
      { "title": "Pay Premium", "description": "Pay the nominal premium (1.5% - 2% for Rabi/Kharif, 5% for commercial/horticultural)." }
    ],
    "documents": ["Aadhaar Card", "Bank Passbook", "Land ownership records", "Sowing certificate"],
    "applicationUrl": "https://pmfby.gov.in/",
    "helplineNumber": "14447",
    "isActive": true,
    "tags": ["farmer", "insurance", "crops", "agriculture"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://pmfby.gov.in/"
  },
  {
    "id": "PM-KUSUM-012",
    "name": "PM KUSUM Yojana",
    "ministry": "Ministry of New and Renewable Energy",
    "category": "agriculture",
    "subCategory": "Renewable Energy",
    "description": "Subsidies for setting up solar pumps and grid-connected solar power plants.",
    "descriptionDetailed": "PM-KUSUM aims to provide energy security to farmers by subsidizing standalone solar agriculture pumps and solarization of existing grid-connected pumps.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["farmer"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000", "above_500000"],
      "caste": [],
      "landHolding": ["1_2acres", "2_5acres", "above_5acres"],
      "notes": ["Farmers, groups of farmers, cooperatives, and panchayats are eligible.", "Requires adequate land for solar installation."]
    },
    "benefits": [
      { "title": "Solar Pump Subsidy", "amount": "Up to 60%", "description": "CFA of 30% and State Government subsidy of 30% on the benchmark cost." }
    ],
    "applicationProcess": [
      { "title": "Register on State Portal", "description": "Apply through the respective State Nodal Agency (SNA) portal." },
      { "title": "Pay Farmer Share", "description": "Deposit the 40% farmer share after application approval." },
      { "title": "Installation", "description": "Vendor selected by SNA installs the solar pump." }
    ],
    "documents": ["Aadhaar Card", "Land records", "Bank details", "Recent photograph"],
    "applicationUrl": "https://pmkusum.mnre.gov.in/",
    "helplineNumber": "1800-180-3333",
    "isActive": true,
    "tags": ["farmer", "solar", "pump", "irrigation", "subsidy"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://pmkusum.mnre.gov.in/"
  },
  {
    "id": "SOIL-HEALTH-013",
    "name": "Soil Health Card Scheme",
    "ministry": "Ministry of Agriculture and Farmers Welfare",
    "category": "agriculture",
    "subCategory": "Soil Testing",
    "description": "Provides farmers with the nutrient status of their soil along with recommendations.",
    "descriptionDetailed": "The scheme provides a printed Soil Health Card to farmers every two years, containing the status of soil nutrients and recommendations on appropriate dosage of nutrients/fertilizers.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["farmer"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000", "above_500000"],
      "caste": [],
      "landHolding": ["below_1acre", "1_2acres", "2_5acres", "above_5acres"],
      "notes": ["Available to all farmers having agricultural land."]
    },
    "benefits": [
      { "title": "Free Soil Testing", "amount": "N/A", "description": "Soil samples are collected and tested in labs for free or nominal charge." },
      { "title": "Fertilizer Recommendations", "amount": "N/A", "description": "Helps in reducing cultivation cost and improving yield." }
    ],
    "applicationProcess": [
      { "title": "Sample Collection", "description": "State Govt officials collect soil samples from the farm." },
      { "title": "Testing", "description": "Samples are tested in the nearest soil testing laboratory." },
      { "title": "Card Generation", "description": "The Soil Health Card is generated and distributed to the farmer." }
    ],
    "documents": ["Aadhaar Card", "Land Details", "Mobile Number"],
    "applicationUrl": "https://soilhealth.dac.gov.in/",
    "helplineNumber": "1800-180-1551",
    "isActive": true,
    "tags": ["farmer", "agriculture", "soil test", "fertilizer"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://soilhealth.dac.gov.in/"
  },

  // AGRICULTURAL LABOURER
  {
    "id": "PM-SYM-014",
    "name": "Pradhan Mantri Shram Yogi Maandhan",
    "ministry": "Ministry of Labour & Employment",
    "category": "labour",
    "subCategory": "Pension",
    "description": "Voluntary and contributory pension scheme for unorganised workers.",
    "descriptionDetailed": "PM-SYM is a pension scheme for unorganised workers. Each subscriber shall receive minimum assured pension of Rs 3000/- per month after attaining the age of 60 years.",
    "eligibility": {
      "age": { "min": 18, "max": 40 },
      "states": ["all"],
      "occupations": ["agricultural_labourer", "construction_worker", "domestic_worker", "artisan", "fisherman", "other"],
      "incomeRanges": ["below_50000"],
      "caste": [],
      "landHolding": ["landless", "below_1acre"],
      "notes": ["Must not be engaged in Organized Sector (member of EPFO/NPS/ESIC).", "Monthly income must be Rs 15,000 or below."]
    },
    "benefits": [
      { "title": "Assured Pension", "amount": "Rs 3000/month", "description": "Monthly pension starting from age 60." },
      { "title": "Matching Contribution", "amount": "Variable", "description": "Central Govt contributes an equal matching amount in the pension account." }
    ],
    "applicationProcess": [
      { "title": "Visit CSC", "description": "Go to the nearest Common Service Centre." },
      { "title": "Enrollment", "description": "Provide Aadhaar, Savings Bank Passbook, and initial contribution." },
      { "title": "Auto Debit", "description": "Subsequent monthly contributions are auto-debited." }
    ],
    "documents": ["Aadhaar Card", "Savings Bank Account Details", "Mobile Number"],
    "applicationUrl": "https://maandhan.in/",
    "helplineNumber": "14434",
    "isActive": true,
    "tags": ["pension", "labour", "unorganised", "old age"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://labour.gov.in/pm-sym"
  },
  {
    "id": "DDU-GKY-015",
    "name": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    "ministry": "Ministry of Rural Development",
    "category": "skills",
    "subCategory": "Skill Training",
    "description": "Placement linked skill development program for rural youth.",
    "descriptionDetailed": "DDU-GKY aims to skill rural youth who are poor and provide them with jobs having regular monthly wages or above the minimum wages.",
    "eligibility": {
      "age": { "min": 15, "max": 35 },
      "states": ["all"],
      "occupations": ["agricultural_labourer", "unemployed", "other"],
      "incomeRanges": ["below_50000", "50000_100000"],
      "caste": [],
      "landHolding": ["landless", "below_1acre"],
      "notes": ["Must be from a rural poor household.", "Upper age limit is 45 years for women and vulnerable groups."]
    },
    "benefits": [
      { "title": "Free Skill Training", "amount": "100% Free", "description": "Free training, boarding, lodging, and uniforms." },
      { "title": "Placement Assistance", "amount": "N/A", "description": "Guaranteed placement for at least 70% trained candidates." }
    ],
    "applicationProcess": [
      { "title": "Find Training Center", "description": "Locate the nearest DDU-GKY Project Implementing Agency (PIA)." },
      { "title": "Registration", "description": "Register with BPL card/MGNREGA worker card." },
      { "title": "Attend Training", "description": "Complete the 3-12 month residential/non-residential course." }
    ],
    "documents": ["Aadhaar Card", "BPL Card/Ration Card", "MGNREGA Job Card of family member", "Passport Size Photo"],
    "applicationUrl": "http://ddugky.gov.in/",
    "helplineNumber": "Contact local Block Development Office",
    "isActive": true,
    "tags": ["youth", "skill", "training", "jobs", "rural"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "http://ddugky.gov.in/"
  },
  {
    "id": "APY-016",
    "name": "Atal Pension Yojana",
    "ministry": "Ministry of Finance",
    "category": "pension",
    "subCategory": "Old Age Security",
    "description": "A guaranteed pension scheme administered by PFRDA primarily for unorganised sector workers.",
    "descriptionDetailed": "APY provides a guaranteed minimum monthly pension ranging from Rs. 1000 to Rs. 5000 based on the contributions made by the subscriber.",
    "eligibility": {
      "age": { "min": 18, "max": 40 },
      "states": ["all"],
      "occupations": ["agricultural_labourer", "construction_worker", "domestic_worker", "artisan", "fisherman", "small_business", "unemployed", "other"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Subscriber must have a savings bank account or post office savings bank account.", "Since Oct 2022, income tax payers are not eligible to join."]
    },
    "benefits": [
      { "title": "Guaranteed Pension", "amount": "Rs 1000 - 5000/month", "description": "Guaranteed minimum monthly pension after 60 years." }
    ],
    "applicationProcess": [
      { "title": "Visit Bank/Post Office", "description": "Approach the bank/post office where you hold a savings account." },
      { "title": "Fill APY Form", "description": "Provide Aadhaar and mobile number." },
      { "title": "Auto Debit", "description": "Ensure sufficient balance for periodic contribution auto-debits." }
    ],
    "documents": ["Savings Bank Account", "Aadhaar Card", "Mobile Number"],
    "applicationUrl": "https://npscra.nsdl.co.in/nsdl/scheme-details/Atal_Pension_Yojana.pdf",
    "helplineNumber": "1800-110-069",
    "isActive": true,
    "tags": ["pension", "unorganised", "retirement", "savings"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://www.india.gov.in/spotlight/atal-pension-yojana"
  },

  // FISHERMAN
  {
    "id": "PM-MSY-017",
    "name": "Pradhan Mantri Matsya Sampada Yojana",
    "ministry": "Ministry of Fisheries, Animal Husbandry and Dairying",
    "category": "agriculture",
    "subCategory": "Fisheries",
    "description": "Scheme to bring about Blue Revolution through sustainable development of fisheries.",
    "descriptionDetailed": "PMMSY aims to enhance fish production and productivity, modernize the value chain, and ensure social and physical security for fishers.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["fisherman"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000", "above_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Includes fishers, fish farmers, fish workers, and fish vendors."]
    },
    "benefits": [
      { "title": "Project Subsidy", "amount": "40% - 60%", "description": "Financial assistance for fishing vessels, aquaculture, cold chains, and infrastructure." },
      { "title": "Livelihood Support", "amount": "Rs 3000/year", "description": "Support during fishing ban/lean periods (with fisher contribution)." }
    ],
    "applicationProcess": [
      { "title": "Submit Proposal", "description": "Submit detailed project report/application to the State Fisheries Department." },
      { "title": "Verification", "description": "District/State Level Committee scrutinizes the proposal." },
      { "title": "Sanction & Subsidy", "description": "Subsidy is released in installments directly into bank accounts." }
    ],
    "documents": ["Aadhaar", "Fisheries License/ID card", "Land/Lease Document (for aquaculture)", "Bank Details"],
    "applicationUrl": "https://pmmsy.dof.gov.in/",
    "helplineNumber": "1800-425-1660",
    "isActive": true,
    "tags": ["fisherman", "fisheries", "aquaculture", "subsidy", "blue revolution"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://pmmsy.dof.gov.in/"
  },
  {
    "id": "KCC-FISH-018",
    "name": "Kisan Credit Card (KCC) for Fisheries",
    "ministry": "Ministry of Fisheries, Animal Husbandry and Dairying",
    "category": "agriculture",
    "subCategory": "Credit",
    "description": "Short-term credit limits to meet working capital requirements for fisheries.",
    "descriptionDetailed": "Extension of KCC facility to fishers and fish farmers to help them meet their working capital needs for fish capture/culture.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["fisherman"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Inland fishers, marine fishers, aquaculture farmers, SHGs, and JLGs are eligible."]
    },
    "benefits": [
      { "title": "Working Capital Loan", "amount": "Up to Rs. 2 Lakhs", "description": "Credit limit for fisheries activities at concessional interest rates." },
      { "title": "Interest Subvention", "amount": "2% - 3%", "description": "Interest subvention of 2% and prompt repayment incentive of 3%." }
    ],
    "applicationProcess": [
      { "title": "Approach Bank", "description": "Visit a commercial bank, RRB, or cooperative bank." },
      { "title": "Submit Form", "description": "Fill the KCC application form with fisheries details." },
      { "title": "Card Issuance", "description": "Credit limit is sanctioned and a KCC is issued." }
    ],
    "documents": ["Aadhaar", "Fisheries License/Registration", "Land/Pond lease agreement", "Bank Details"],
    "applicationUrl": "https://dof.gov.in/kisan-credit-card",
    "helplineNumber": "Contact local bank branch",
    "isActive": true,
    "tags": ["fisherman", "loan", "kcc", "credit", "working capital"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://dof.gov.in/kisan-credit-card"
  },
  {
    "id": "NFDB-INSURE-019",
    "name": "Group Accident Insurance for Fishermen",
    "ministry": "National Fisheries Development Board",
    "category": "insurance",
    "subCategory": "Accident",
    "description": "Accident insurance coverage for registered fishermen.",
    "descriptionDetailed": "Provides insurance coverage against accidental death or permanent disability while engaged in fishing activities.",
    "eligibility": {
      "age": { "min": 18, "max": 70 },
      "states": ["all"],
      "occupations": ["fisherman"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Must be a registered fisher with the state fisheries department."]
    },
    "benefits": [
      { "title": "Accidental Death/Disability Cover", "amount": "Rs. 5,00,000", "description": "Lump sum amount in case of accidental death or permanent total disability." },
      { "title": "Partial Disability Cover", "amount": "Rs. 2,50,000", "description": "Support for permanent partial disability." }
    ],
    "applicationProcess": [
      { "title": "Registration", "description": "Register with the local Fisheries Cooperative Society or State Fisheries Dept." },
      { "title": "Premium Payment", "description": "Premium is mostly shared by Center and State Govt." },
      { "title": "Claim Submission", "description": "In case of accident, submit claim forms through the Fisheries Dept." }
    ],
    "documents": ["Fisherman ID", "Aadhaar", "FIR/Post Mortem report (for claims)", "Bank Details"],
    "applicationUrl": "https://nfdb.gov.in/",
    "helplineNumber": "1800-425-1660",
    "isActive": true,
    "tags": ["fisherman", "insurance", "accident", "disability"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://nfdb.gov.in/"
  },

  // ARTISAN
  {
    "id": "PM-VISHWAKARMA-020",
    "name": "PM Vishwakarma Yojana",
    "ministry": "Ministry of Micro, Small and Medium Enterprises",
    "category": "startup",
    "subCategory": "Artisan Support",
    "description": "Holistic end-to-end support to traditional artisans and craftspeople.",
    "descriptionDetailed": "Provides recognition, skill upgradation, toolkit incentive, credit support, and marketing assistance to artisans like carpenters, goldsmiths, blacksmiths, weavers, etc.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["artisan"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Must be engaged in one of the 18 specified traditional trades.", "One member per family is eligible."]
    },
    "benefits": [
      { "title": "Toolkit Incentive", "amount": "Rs 15,000", "description": "Grant to purchase modern tools." },
      { "title": "Credit Support", "amount": "Up to Rs 3 Lakhs", "description": "Collateral-free loan in two tranches at 5% concessional interest." },
      { "title": "Skill Training Stipend", "amount": "Rs 500/day", "description": "Stipend during basic and advanced skill training." }
    ],
    "applicationProcess": [
      { "title": "Register on Portal/CSC", "description": "Register through Common Service Centers." },
      { "title": "Verification", "description": "Three-tier verification by Gram Panchayat, District, and State Committees." },
      { "title": "Certification", "description": "Receive PM Vishwakarma Certificate and ID card." }
    ],
    "documents": ["Aadhaar", "Ration Card", "Bank Account Details", "Mobile Number"],
    "applicationUrl": "https://pmvishwakarma.gov.in/",
    "helplineNumber": "1800-267-7777",
    "isActive": true,
    "tags": ["artisan", "skills", "loan", "tools", "crafts"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://pmvishwakarma.gov.in/"
  },
  {
    "id": "AHVY-021",
    "name": "Ambedkar Hastshilp Vikas Yojana",
    "ministry": "Ministry of Textiles",
    "category": "skills",
    "subCategory": "Handicrafts",
    "description": "Empowerment of handicraft artisans through mobilization, training, and marketing.",
    "descriptionDetailed": "AHVY mobilizes artisans into Self Help Groups/Societies and provides them with design & technology upgradation, infrastructure, and marketing support.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["artisan"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Targeted at organized groups of artisans, NGOs, and Cooperatives."]
    },
    "benefits": [
      { "title": "Design & Skill Training", "amount": "Varies", "description": "Workshops and training for design development." },
      { "title": "Marketing Support", "amount": "Varies", "description": "Participation in exhibitions and craft bazars." },
      { "title": "Infrastructure", "amount": "Varies", "description": "Setting up of Common Facility Centers." }
    ],
    "applicationProcess": [
      { "title": "Form a Group", "description": "Artisans must form an SHG or Cooperative." },
      { "title": "Submit Proposal", "description": "Apply through the Regional Office of Development Commissioner (Handicrafts)." },
      { "title": "Approval", "description": "Funds are released to the implementing agency." }
    ],
    "documents": ["Artisan Pehchan Card (ID)", "Group Registration Details", "Project Proposal"],
    "applicationUrl": "http://handicrafts.nic.in/",
    "helplineNumber": "1800-208-4800",
    "isActive": true,
    "tags": ["artisan", "handicraft", "training", "marketing", "shg"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "http://handicrafts.nic.in/"
  },
  {
    "id": "MUDRA-ARTISAN-022",
    "name": "MUDRA Loan for Artisans (Weaver MUDRA)",
    "ministry": "Ministry of Textiles",
    "category": "startup",
    "subCategory": "Credit",
    "description": "Concessional credit specifically tailored for handloom weavers and artisans.",
    "descriptionDetailed": "Provides working capital and term loans to handloom weavers and artisans at concessional interest rates with margin money assistance.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["artisan"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Must possess a Weaver ID card or Artisan Pehchan card."]
    },
    "benefits": [
      { "title": "Margin Money Assistance", "amount": "Up to Rs 10,000", "description": "20% of the loan amount up to Rs 10,000 is provided as margin money." },
      { "title": "Interest Subvention", "amount": "Caps at 6%", "description": "Interest rate capped at 6% for loans up to Rs 2 Lakhs for a period of 3 years." }
    ],
    "applicationProcess": [
      { "title": "Obtain ID Card", "description": "Get Weaver/Artisan Pehchan Card from the department." },
      { "title": "Apply at Bank", "description": "Submit MUDRA loan application at a local bank." },
      { "title": "Loan Disbursement", "description": "Loan is sanctioned along with margin money and interest subvention benefits." }
    ],
    "documents": ["Weaver/Artisan ID Card", "Aadhaar", "Bank Account Details", "Business Plan/Details"],
    "applicationUrl": "http://handlooms.nic.in/",
    "helplineNumber": "Contact nearest Weavers Service Centre",
    "isActive": true,
    "tags": ["artisan", "weaver", "loan", "mudra", "credit"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "http://handlooms.nic.in/"
  },

  // CONSTRUCTION WORKER
  {
    "id": "BOCW-ED-023",
    "name": "BOCW Education Assistance Scheme",
    "ministry": "Ministry of Labour & Employment",
    "category": "education",
    "subCategory": "Scholarships",
    "description": "Financial assistance for the education of children of registered construction workers.",
    "descriptionDetailed": "State BOCW boards provide scholarships to children of registered building and other construction workers from Class 1 to higher education.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["construction_worker"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Worker must be registered with the State BOCW Welfare Board for at least 1 year.", "Child must be studying in a recognized institution."]
    },
    "benefits": [
      { "title": "Annual Scholarship", "amount": "Rs 1,000 to Rs 50,000", "description": "Amount varies by state and level of education (School to Professional Degrees)." }
    ],
    "applicationProcess": [
      { "title": "Register as Worker", "description": "Register with the State BOCW Welfare Board." },
      { "title": "Submit Application", "description": "Apply through the State Labor Department portal with child's school certificates." },
      { "title": "DBT Transfer", "description": "Funds transferred directly to the bank account." }
    ],
    "documents": ["BOCW Registration Card", "Child's School/College Certificate", "Bank Passbook", "Aadhaar"],
    "applicationUrl": "https://labour.gov.in/bocw",
    "helplineNumber": "Contact State Labour Department",
    "isActive": true,
    "tags": ["construction", "education", "scholarship", "children"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://labour.gov.in/bocw"
  },
  {
    "id": "NIPUN-024",
    "name": "NIPUN (National Initiative for Promoting Upskilling of Nirman workers)",
    "ministry": "Ministry of Housing and Urban Affairs",
    "category": "skills",
    "subCategory": "Upskilling",
    "description": "Skill training and certification program for construction workers.",
    "descriptionDetailed": "NIPUN aims to train over 1 lakh construction workers through fresh skilling and upskilling programs (RPL) to enhance their capabilities and wages.",
    "eligibility": {
      "age": { "min": 18, "max": 45 },
      "states": ["all"],
      "occupations": ["construction_worker"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Targeted at both fresh candidates and existing construction workers."]
    },
    "benefits": [
      { "title": "Free Training", "amount": "N/A", "description": "Free skill training and assessment." },
      { "title": "Insurance Cover", "amount": "Rs 2 Lakh", "description": "Trainees receive free Kaushal Bima (accident insurance) for 3 years." },
      { "title": "Stipend", "amount": "Varies", "description": "Wage compensation during the RPL training period." }
    ],
    "applicationProcess": [
      { "title": "Find Training Center", "description": "Locate an NSDC affiliated training center." },
      { "title": "Enrollment", "description": "Register for RPL (Recognition of Prior Learning) or fresh skilling." },
      { "title": "Certification", "description": "Clear the assessment to receive an NSDC certificate." }
    ],
    "documents": ["Aadhaar", "Bank Account Details", "Mobile Number"],
    "applicationUrl": "https://nsdcindia.org/",
    "helplineNumber": "1800-123-9626",
    "isActive": true,
    "tags": ["construction", "skills", "training", "nsdc", "rpl"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://nsdcindia.org/"
  },
  {
    "id": "BOCW-MATERNITY-025",
    "name": "BOCW Maternity Benefit Scheme",
    "ministry": "Ministry of Labour & Employment",
    "category": "women",
    "subCategory": "Maternity",
    "description": "Financial assistance for pregnancy and delivery for female construction workers or wives of male registered workers.",
    "descriptionDetailed": "State BOCW boards provide direct cash assistance to registered female construction workers during maternity to compensate for wage loss.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["construction_worker"],
      "incomeRanges": ["below_50000", "50000_100000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Worker must be registered with BOCW Board.", "Benefit is generally limited to the first two deliveries."]
    },
    "benefits": [
      { "title": "Maternity Benefit", "amount": "Rs 6,000 to Rs 30,000", "description": "Amount varies significantly by state. Paid in installments." }
    ],
    "applicationProcess": [
      { "title": "Register with BOCW", "description": "Ensure active registration with the State Welfare Board." },
      { "title": "Submit Medical Docs", "description": "Submit hospital delivery certificate and birth certificate." },
      { "title": "Receive Funds", "description": "Amount is credited directly to the bank account." }
    ],
    "documents": ["BOCW Registration Card", "Hospital Discharge Summary", "Birth Certificate", "Aadhaar", "Bank Details"],
    "applicationUrl": "https://labour.gov.in/bocw",
    "helplineNumber": "Contact State Labour Department",
    "isActive": true,
    "tags": ["construction", "maternity", "women", "welfare"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://labour.gov.in/bocw"
  }
];

schemes.push(...newSchemes);

fs.writeFileSync(filePath, JSON.stringify(schemes, null, 4));
console.log(`Added ${newSchemes.length} schemes. Total is now ${schemes.length}.`);
