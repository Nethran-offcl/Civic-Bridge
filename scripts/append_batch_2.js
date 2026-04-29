const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/schemes/central_schemes.json');
const schemes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newSchemes = [
  // DOMESTIC WORKER
  {
    "id": "PMUY-026",
    "name": "Pradhan Mantri Ujjwala Yojana (PMUY)",
    "ministry": "Ministry of Petroleum and Natural Gas",
    "category": "women",
    "subCategory": "LPG Connection",
    "description": "Free LPG connection to women from BPL and poor households.",
    "descriptionDetailed": "PMUY aims to safeguard the health of women & children by providing them with a clean cooking fuel (LPG) without an upfront deposit fee.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "gender": "female",
      "occupations": ["domestic_worker", "agricultural_labourer", "unemployed", "other"],
      "incomeRanges": ["below_50000", "50000_100000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Applicant must be an adult woman from a poor household.", "No existing LPG connection in the household."]
    },
    "benefits": [
      { "title": "Free LPG Connection", "amount": "Rs 1,600 Support", "description": "Deposit-free LPG connection including cylinder, regulator, and hose." },
      { "title": "Refill Subsidy", "amount": "Rs 300/cylinder", "description": "Targeted subsidy up to 12 refills per year." }
    ],
    "applicationProcess": [
      { "title": "Contact Distributor", "description": "Visit the nearest LPG distributor." },
      { "title": "Submit KYC", "description": "Submit PMUY application form with KYC documents." },
      { "title": "Installation", "description": "Connection is issued after clearing deduplication checks." }
    ],
    "documents": ["Aadhaar", "Ration Card", "Bank Account Details", "Passport Size Photo"],
    "applicationUrl": "https://www.pmuy.gov.in/",
    "helplineNumber": "1906 / 1800-233-3555",
    "isActive": true,
    "tags": ["women", "health", "lpg", "subsidy", "poor"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://www.pmuy.gov.in/"
  },
  {
    "id": "PMMVY-027",
    "name": "Pradhan Mantri Matru Vandana Yojana",
    "ministry": "Ministry of Women and Child Development",
    "category": "women",
    "subCategory": "Maternity",
    "description": "Maternity benefit programme providing cash incentive to pregnant women.",
    "descriptionDetailed": "A cash incentive provided directly to the bank account of pregnant women and lactating mothers for first and second live births to meet enhanced nutritional needs and compensate for wage loss.",
    "eligibility": {
      "age": { "min": 19 },
      "states": ["all"],
      "gender": "female",
      "occupations": ["domestic_worker", "agricultural_labourer", "construction_worker", "unemployed", "other"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Applicable for the first two live births (second child must be a girl).", "Excludes regular employees of Central/State Govts/PSUs."]
    },
    "benefits": [
      { "title": "Cash Incentive", "amount": "Up to Rs 5,000", "description": "Paid in two installments upon early registration and institutional delivery." },
      { "title": "Girl Child Benefit", "amount": "Rs 6,000", "description": "Single installment if the second child is a girl." }
    ],
    "applicationProcess": [
      { "title": "Register Pregnancy", "description": "Register at the nearest Anganwadi Centre or ASHA worker." },
      { "title": "Submit Form", "description": "Submit application form along with MCP Card." },
      { "title": "DBT Transfer", "description": "Funds are transferred directly via Aadhaar linked bank account." }
    ],
    "documents": ["Aadhaar", "Bank Account", "MCP (Mother and Child Protection) Card", "Child Birth Certificate (for 2nd installment)"],
    "applicationUrl": "https://pmmvy.wcd.gov.in/",
    "helplineNumber": "Contact local Anganwadi/ASHA",
    "isActive": true,
    "tags": ["women", "maternity", "nutrition", "health"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
  },
  {
    "id": "SBM-028",
    "name": "Swachh Bharat Mission (Toilet Subsidy)",
    "ministry": "Ministry of Jal Shakti / Ministry of Housing and Urban Affairs",
    "category": "housing",
    "subCategory": "Sanitation",
    "description": "Financial incentive for the construction of Individual Household Latrines (IHHL).",
    "descriptionDetailed": "Provides an incentive to BPL and identified APL households to construct and use household toilets, promoting sanitation and hygiene.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["domestic_worker", "agricultural_labourer", "farmer", "unemployed", "other"],
      "incomeRanges": ["below_50000", "50000_100000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Household should not already possess a toilet.", "Applicable for all BPL and certain identified APL households."]
    },
    "benefits": [
      { "title": "Construction Incentive", "amount": "Rs 12,000", "description": "Provided for the construction of one unit of IHHL." }
    ],
    "applicationProcess": [
      { "title": "Apply Online/Offline", "description": "Submit an application at the Gram Panchayat or online portal." },
      { "title": "Verification", "description": "Officials verify the lack of a toilet and approve the application." },
      { "title": "Fund Release", "description": "Funds released post-construction and geo-tagging." }
    ],
    "documents": ["Aadhaar", "Bank Details", "Photograph of applicant"],
    "applicationUrl": "https://sbm.gov.in/",
    "helplineNumber": "Contact Gram Panchayat",
    "isActive": true,
    "tags": ["sanitation", "toilet", "health", "rural"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://sbm.gov.in/"
  },

  // SMALL BUSINESS
  {
    "id": "PMEGP-029",
    "name": "Prime Minister's Employment Generation Programme (PMEGP)",
    "ministry": "Ministry of Micro, Small and Medium Enterprises",
    "category": "startup",
    "subCategory": "Credit Linked Subsidy",
    "description": "Credit-linked subsidy program to generate employment through micro-enterprises.",
    "descriptionDetailed": "PMEGP provides financial assistance to set up new self-employment ventures/projects/micro-enterprises in non-farm sectors.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["small_business", "unemployed", "artisan", "other"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Minimum VIII pass for projects > 10 Lakh (Mfg) / 5 Lakh (Service).", "Only new projects are eligible."]
    },
    "benefits": [
      { "title": "Margin Money Subsidy", "amount": "15% to 35%", "description": "Subsidy depends on urban/rural location and category (General/Special)." },
      { "title": "Bank Loan", "amount": "Up to Rs 50 Lakh (Mfg) / Rs 20 Lakh (Service)", "description": "Balance amount provided as term loan by banks." }
    ],
    "applicationProcess": [
      { "title": "Online Application", "description": "Apply on the KVIC online portal." },
      { "title": "Interview/Selection", "description": "District Task Force Committee interviews the applicant." },
      { "title": "Bank Sanction", "description": "Bank sanctions the loan and claims the margin money subsidy." }
    ],
    "documents": ["Project Report", "Aadhaar", "Education Certificate", "Caste/Special Category Certificate"],
    "applicationUrl": "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    "helplineNumber": "1800-3000-0034",
    "isActive": true,
    "tags": ["business", "loan", "subsidy", "employment", "msme"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://msme.gov.in/pmegp"
  },
  {
    "id": "STANDUP-030",
    "name": "Stand-Up India Scheme",
    "ministry": "Ministry of Finance",
    "category": "startup",
    "subCategory": "Entrepreneurship",
    "description": "Facilitates bank loans for SC/ST and Women entrepreneurs.",
    "descriptionDetailed": "Stand-Up India aims to promote entrepreneurship among Women and SC/ST communities by facilitating bank loans for setting up a new enterprise.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["small_business", "unemployed", "other"],
      "incomeRanges": ["50000_100000", "100000_200000", "200000_500000", "above_500000"],
      "caste": ["SC", "ST"],
      "landHolding": [],
      "notes": ["Applicant must be SC/ST or a Woman entrepreneur.", "Loan is available only for greenfield (new) enterprises in manufacturing, services, agri-allied, or trading sectors."]
    },
    "benefits": [
      { "title": "Term Loan/Working Capital", "amount": "Rs 10 Lakh to Rs 1 Crore", "description": "Composite loan to cover 85% of project cost." }
    ],
    "applicationProcess": [
      { "title": "Prepare Project", "description": "Ready a detailed business project report." },
      { "title": "Apply Online", "description": "Apply through the Stand-Up India portal, Lead District Manager, or directly at a bank branch." },
      { "title": "Loan Approval", "description": "Bank processes the application and sanctions the loan." }
    ],
    "documents": ["Aadhaar", "Caste Certificate (if applicable)", "Project Report", "Bank details"],
    "applicationUrl": "https://www.standupmitra.in/",
    "helplineNumber": "1800-180-1111",
    "isActive": true,
    "tags": ["loan", "business", "women", "sc", "st"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://www.standupmitra.in/"
  },
  {
    "id": "SVANIDHI-031",
    "name": "PM SVANidhi",
    "ministry": "Ministry of Housing and Urban Affairs",
    "category": "startup",
    "subCategory": "Micro Credit",
    "description": "Special micro-credit facility for Street Vendors.",
    "descriptionDetailed": "PM SVANidhi provides affordable working capital loans to street vendors to resume their livelihoods.",
    "eligibility": {
      "age": { "min": 18 },
      "states": ["all"],
      "occupations": ["small_business"],
      "incomeRanges": ["below_50000", "50000_100000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Must be a street vendor operating in urban areas.", "Must possess a Certificate of Vending/Identity Card issued by ULBs."]
    },
    "benefits": [
      { "title": "Working Capital Loan", "amount": "Up to Rs 10,000 to Rs 50,000", "description": "Initial loan of 10k, enhanced upon prompt repayment to 20k and 50k." },
      { "title": "Interest Subsidy", "amount": "7% per annum", "description": "Interest subsidy credited quarterly for prompt repayment." }
    ],
    "applicationProcess": [
      { "title": "Get LoR/CoV", "description": "Obtain Letter of Recommendation or Certificate of Vending from ULB." },
      { "title": "Apply Online", "description": "Apply via the PM SVANidhi portal or visit a CSC/bank." },
      { "title": "Disbursement", "description": "Loan is disbursed directly to the vendor's bank account." }
    ],
    "documents": ["Aadhaar linked with mobile", "Vending Certificate/ID", "Bank Account Details"],
    "applicationUrl": "https://pmsvanidhi.mohua.gov.in/",
    "helplineNumber": "1800-11-1979",
    "isActive": true,
    "tags": ["business", "vendor", "loan", "micro credit", "urban"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://pmsvanidhi.mohua.gov.in/"
  },

  // STUDENT
  {
    "id": "PM-YASASVI-032",
    "name": "PM YASASVI Scholarship Scheme",
    "ministry": "Ministry of Social Justice and Empowerment",
    "category": "education",
    "subCategory": "Scholarship",
    "description": "Scholarship scheme for OBC, EBC, and DNT students studying in classes 9 to 12.",
    "descriptionDetailed": "PM Young Achievers Scholarship Award Scheme for Vibrant India (YASASVI) provides Pre-Matric and Post-Matric scholarships to eligible students to continue their education.",
    "eligibility": {
      "age": { "min": 13, "max": 19 },
      "states": ["all"],
      "occupations": ["student"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": ["OBC"],
      "landHolding": [],
      "notes": ["Annual family income must be less than Rs. 2.5 Lakhs.", "Must be studying in a recognized Top Class School."]
    },
    "benefits": [
      { "title": "Pre-Matric Scholarship", "amount": "Rs 4,000/year", "description": "For classes 9th and 10th." },
      { "title": "Post-Matric Scholarship", "amount": "Rs 5,000 to Rs 20,000/year", "description": "Varies based on course level." }
    ],
    "applicationProcess": [
      { "title": "Register on NSP", "description": "Apply through the National Scholarship Portal." },
      { "title": "Clear Entrance Test", "description": "Sometimes requires passing the YASASVI Entrance Test (YET)." },
      { "title": "Verification", "description": "School and State level verification of documents." }
    ],
    "documents": ["Aadhaar", "Income Certificate", "Caste Certificate", "Bank Account Details", "Previous Year Marksheet"],
    "applicationUrl": "https://scholarships.gov.in/",
    "helplineNumber": "0120-6619540",
    "isActive": true,
    "tags": ["student", "scholarship", "obc", "education"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://socialjustice.gov.in/schemes/"
  },
  {
    "id": "NMMSS-033",
    "name": "National Means-cum-Merit Scholarship",
    "ministry": "Ministry of Education",
    "category": "education",
    "subCategory": "Scholarship",
    "description": "Scholarships awarded to meritorious students of economically weaker sections to arrest dropouts in class VIII.",
    "descriptionDetailed": "NMMSS provides financial assistance to meritorious students to encourage them to continue their study at the secondary stage.",
    "eligibility": {
      "age": { "min": 12, "max": 18 },
      "states": ["all"],
      "occupations": ["student"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Must have scored minimum 55% in Class VII.", "Parental income should not exceed Rs 3,50,000 per annum."]
    },
    "benefits": [
      { "title": "Scholarship Amount", "amount": "Rs 12,000/year", "description": "Provided for classes IX to XII." }
    ],
    "applicationProcess": [
      { "title": "Clear Selection Test", "description": "Pass the state-level selection examination." },
      { "title": "Apply on NSP", "description": "Submit scholarship application on National Scholarship Portal." },
      { "title": "Renewal", "description": "Maintain minimum required marks to renew each year." }
    ],
    "documents": ["Aadhaar", "Income Certificate", "Selection Test Rank", "Bank Account"],
    "applicationUrl": "https://scholarships.gov.in/",
    "helplineNumber": "0120-6619540",
    "isActive": true,
    "tags": ["student", "scholarship", "merit", "education"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://dsel.education.gov.in/scheme/nmmss"
  },
  {
    "id": "ISHAN-UDAY-034",
    "name": "Ishan Uday Special Scholarship Scheme for NER",
    "ministry": "University Grants Commission",
    "category": "education",
    "subCategory": "Higher Education",
    "description": "Special scholarship scheme for students of the North Eastern Region.",
    "descriptionDetailed": "Ishan Uday promotes higher education and encourages children belonging to the North Eastern Region to pursue general degree courses, technical, and professional courses.",
    "eligibility": {
      "age": { "min": 17, "max": 25 },
      "states": ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"],
      "occupations": ["student"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Domicile of NER State.", "Annual family income not to exceed Rs. 4.5 Lakh."]
    },
    "benefits": [
      { "title": "Monthly Stipend", "amount": "Rs 5,400 to Rs 7,800/month", "description": "Depends on the type of course (General Degree vs Professional)." }
    ],
    "applicationProcess": [
      { "title": "Admission", "description": "Secure admission in a recognized university/college." },
      { "title": "Apply Online", "description": "Apply via the National Scholarship Portal." },
      { "title": "Verification", "description": "Institutional verification followed by fund transfer." }
    ],
    "documents": ["Domicile Certificate", "Income Certificate", "Aadhaar", "Admission Proof"],
    "applicationUrl": "https://scholarships.gov.in/",
    "helplineNumber": "0120-6619540",
    "isActive": true,
    "tags": ["student", "scholarship", "northeast", "higher education"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://ugc.ac.in/page/Ishan-Uday.aspx"
  },

  // UNEMPLOYED
  {
    "id": "PMKVY-035",
    "name": "Pradhan Mantri Kaushal Vikas Yojana",
    "ministry": "Ministry of Skill Development and Entrepreneurship",
    "category": "skills",
    "subCategory": "Skill Training",
    "description": "Flagship scheme to enable Indian youth to take up industry-relevant skill training.",
    "descriptionDetailed": "PMKVY provides free short-term training and Recognition of Prior Learning (RPL) to school/college dropouts and unemployed youth.",
    "eligibility": {
      "age": { "min": 15, "max": 45 },
      "states": ["all"],
      "occupations": ["unemployed", "other"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Open to any candidate of Indian nationality.", "Priority given to school/college dropouts."]
    },
    "benefits": [
      { "title": "Free Training", "amount": "N/A", "description": "Industry recognized skill training and certification." },
      { "title": "Placement Assistance", "amount": "N/A", "description": "Job fairs and placement support provided by training centers." }
    ],
    "applicationProcess": [
      { "title": "Register on Skill India", "description": "Enroll on the Skill India Digital Portal." },
      { "title": "Select Course", "description": "Choose an affiliated PMKVY Training Center." },
      { "title": "Assessment & Certification", "description": "Complete the course and clear the third-party assessment." }
    ],
    "documents": ["Aadhaar", "Bank Account Details", "Education Certificate (if any)", "Passport Photo"],
    "applicationUrl": "https://www.skillindiadigital.gov.in/",
    "helplineNumber": "1800-123-9626",
    "isActive": true,
    "tags": ["youth", "skill", "training", "unemployed", "jobs"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://pmkvyofficial.org/"
  },
  {
    "id": "NAPS-036",
    "name": "National Apprenticeship Promotion Scheme",
    "ministry": "Ministry of Skill Development and Entrepreneurship",
    "category": "skills",
    "subCategory": "Apprenticeship",
    "description": "Promotes apprenticeship training and incentivizes employers.",
    "descriptionDetailed": "NAPS provides financial support to establishments undertaking apprenticeship programs and helps youth gain practical industry experience while earning a stipend.",
    "eligibility": {
      "age": { "min": 14 },
      "states": ["all"],
      "occupations": ["unemployed", "student", "other"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Candidate must have minimum educational qualification required for the specific trade."]
    },
    "benefits": [
      { "title": "Monthly Stipend", "amount": "Rs 5,000 to Rs 9,000+", "description": "Stipend is paid during the training period. Govt shares 25% of the stipend (up to Rs 1500)." },
      { "title": "On-the-job Training", "amount": "N/A", "description": "Practical experience leading to a National Apprenticeship Certificate." }
    ],
    "applicationProcess": [
      { "title": "Register on Portal", "description": "Register on the Apprenticeship India portal." },
      { "title": "Apply for Opportunities", "description": "Search and apply for apprenticeship openings in various companies." },
      { "title": "Sign Contract", "description": "Sign the apprenticeship contract with the employer." }
    ],
    "documents": ["Aadhaar", "Education Certificates", "Bank Details"],
    "applicationUrl": "https://www.apprenticeshipindia.gov.in/",
    "helplineNumber": "1800-123-9626",
    "isActive": true,
    "tags": ["apprentice", "training", "youth", "employment"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://www.apprenticeshipindia.gov.in/"
  },
  {
    "id": "RSETI-037",
    "name": "Rural Self Employment Training Institutes",
    "ministry": "Ministry of Rural Development",
    "category": "startup",
    "subCategory": "Training",
    "description": "Free intensive short term residential training for rural youth for self-employment.",
    "descriptionDetailed": "RSETIs are managed by banks with active co-operation from Govt. of India to mitigate the unemployment problem among rural youth through self-employment.",
    "eligibility": {
      "age": { "min": 18, "max": 45 },
      "states": ["all"],
      "occupations": ["unemployed", "agricultural_labourer", "other"],
      "incomeRanges": ["below_50000", "50000_100000"],
      "caste": [],
      "landHolding": ["landless", "below_1acre"],
      "notes": ["Targeted at rural BPL youth."]
    },
    "benefits": [
      { "title": "Free Training", "amount": "N/A", "description": "Free training with food and accommodation." },
      { "title": "Credit Linkage", "amount": "N/A", "description": "Banks assist in providing loans to set up micro-enterprises post-training." }
    ],
    "applicationProcess": [
      { "title": "Locate RSETI", "description": "Find the Lead Bank RSETI in your district." },
      { "title": "Enroll", "description": "Submit application with BPL proof/MGNREGA card." },
      { "title": "Handholding", "description": "Receive 2 years of post-training handholding support." }
    ],
    "documents": ["Aadhaar", "BPL Card / Ration Card", "Photographs"],
    "applicationUrl": "https://nirdpr.org.in/rseti/",
    "helplineNumber": "Contact local District Lead Bank",
    "isActive": true,
    "tags": ["rural", "youth", "self employment", "training", "business"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://nirdpr.org.in/rseti/"
  },

  // OTHER
  {
    "id": "PM-VVY-038",
    "name": "Pradhan Mantri Vaya Vandana Yojana",
    "ministry": "Ministry of Finance / LIC",
    "category": "pension",
    "subCategory": "Senior Citizens",
    "description": "Pension scheme exclusively for senior citizens providing an assured return.",
    "descriptionDetailed": "PMVVY is implemented through LIC and offers a guaranteed payout of pension at a specified rate for 10 years.",
    "eligibility": {
      "age": { "min": 60 },
      "states": ["all"],
      "occupations": ["other", "unemployed", "farmer", "small_business"],
      "incomeRanges": ["50000_100000", "100000_200000", "200000_500000", "above_500000"],
      "caste": [],
      "landHolding": [],
      "notes": ["Must be 60 years or above.", "Requires lumpsum investment (Purchase price)."]
    },
    "benefits": [
      { "title": "Assured Pension", "amount": "7.4% p.a. approx", "description": "Guaranteed pension paid monthly, quarterly, half-yearly or yearly." }
    ],
    "applicationProcess": [
      { "title": "Visit LIC Branch", "description": "Approach any LIC office or buy online from LIC website." },
      { "title": "Pay Lumpsum", "description": "Invest the purchase price amount." },
      { "title": "Receive Pension", "description": "Pension begins as per the chosen frequency." }
    ],
    "documents": ["Aadhaar", "Age Proof", "Bank Account Details", "PAN Card"],
    "applicationUrl": "https://licindia.in/",
    "helplineNumber": "022-68276827",
    "isActive": true,
    "tags": ["senior citizen", "pension", "investment", "lic"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://financialservices.gov.in/"
  },
  {
    "id": "IGNOAPS-039",
    "name": "Indira Gandhi National Old Age Pension Scheme",
    "ministry": "Ministry of Rural Development",
    "category": "pension",
    "subCategory": "Senior Citizens",
    "description": "Non-contributory old age pension scheme for BPL individuals.",
    "descriptionDetailed": "IGNOAPS provides a monthly pension to senior citizens belonging to below poverty line households, supported by both central and state governments.",
    "eligibility": {
      "age": { "min": 60 },
      "states": ["all"],
      "occupations": ["other", "unemployed", "agricultural_labourer", "domestic_worker"],
      "incomeRanges": ["below_50000"],
      "caste": [],
      "landHolding": ["landless", "below_1acre"],
      "notes": ["Applicant must belong to a BPL household.", "Destitute elderly are prioritized."]
    },
    "benefits": [
      { "title": "Monthly Pension", "amount": "Rs 200 - Rs 500+", "description": "Central contribution is Rs 200 (60-79 yrs) or Rs 500 (80+ yrs). States add matching or higher amounts." }
    ],
    "applicationProcess": [
      { "title": "Apply locally", "description": "Submit application to Gram Panchayat / Municipality." },
      { "title": "Verification", "description": "Local officials verify age and BPL status." },
      { "title": "DBT Transfer", "description": "Pension is credited directly into the bank or post office account." }
    ],
    "documents": ["Age Proof", "BPL Ration Card", "Aadhaar", "Bank/Post Office Passbook"],
    "applicationUrl": "https://nsap.nic.in/",
    "helplineNumber": "Contact Gram Panchayat",
    "isActive": true,
    "tags": ["senior citizen", "pension", "bpl", "old age"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://nsap.nic.in/"
  },
  {
    "id": "NAYA-SAVERA-040",
    "name": "Naya Savera Scheme",
    "ministry": "Ministry of Minority Affairs",
    "category": "education",
    "subCategory": "Coaching",
    "description": "Free coaching and allied scheme for candidates belonging to minority communities.",
    "descriptionDetailed": "Naya Savera assists students/candidates from minority communities by providing free coaching for qualifying examinations for admission in technical/professional courses and competitive exams.",
    "eligibility": {
      "age": { "min": 17, "max": 30 },
      "states": ["all"],
      "occupations": ["student", "unemployed", "other"],
      "incomeRanges": ["below_50000", "50000_100000", "100000_200000", "200000_500000"],
      "caste": ["Minority"],
      "landHolding": [],
      "notes": ["Must belong to notified minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi).", "Family income must not exceed Rs. 6 Lakh per annum."]
    },
    "benefits": [
      { "title": "Free Coaching", "amount": "100% Fee Covered", "description": "Coaching fees paid directly to impanelled institutions." },
      { "title": "Stipend", "amount": "Rs 2,500/month", "description": "Stipend paid directly to the student for the duration of the coaching." }
    ],
    "applicationProcess": [
      { "title": "Select Institute", "description": "Find an empaneled coaching institution in your area." },
      { "title": "Enroll", "description": "Submit application directly to the coaching center with income and community proof." },
      { "title": "Attend Classes", "description": "Maintain minimum attendance to receive the stipend." }
    ],
    "documents": ["Minority Community Certificate", "Income Certificate", "Aadhaar", "Bank Account Details", "Educational Certificates"],
    "applicationUrl": "https://www.minorityaffairs.gov.in/",
    "helplineNumber": "1800-11-2001",
    "isActive": true,
    "tags": ["education", "coaching", "minority", "student", "exams"],
    "lastUpdated": "2026-04-26",
    "sourceUrl": "https://www.minorityaffairs.gov.in/"
  }
];

schemes.push(...newSchemes);

fs.writeFileSync(filePath, JSON.stringify(schemes, null, 4));
console.log(`Added ${newSchemes.length} schemes. Total is now ${schemes.length}.`);
