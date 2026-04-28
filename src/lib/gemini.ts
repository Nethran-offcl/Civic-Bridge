import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from "@/types/chat";
import type { Scheme } from "@/types/scheme";
import type { SupportedLanguage, UserProfile } from "@/types/profile";
import { FALLBACK_TRANSLATIONS } from "./i18n";
import { getCivicBridgeSystemPrompt } from "./prompts";

let client: GoogleGenerativeAI | null = null;

function getGeminiClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!client) {
    client = new GoogleGenerativeAI(key);
  }
  return client;
}

export async function getEmbedding(text: string): Promise<number[]> {
  const genAI = getGeminiClient();
  if (!genAI) return localEmbedding(text);

  const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

export async function* streamChat(
  messages: ChatMessage[],
  context: Scheme[],
  language: SupportedLanguage,
  profile?: UserProfile
): AsyncGenerator<string> {
  const genAI = getGeminiClient();
  const system = getCivicBridgeSystemPrompt(language, profile, context);

  if (!genAI) {
    yield* streamFallbackAnswer(messages, context, language);
    return;
  }

  const geminiFlash = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { temperature: 0.3, topP: 0.95, maxOutputTokens: 2048 }
  });

  const conversation = messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  const result = await geminiFlash.generateContentStream(`${system}\n\nConversation:\n${conversation}`);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

function localEmbedding(text: string) {
  const vector = new Array<number>(32).fill(0);
  for (let index = 0; index < text.length; index += 1) {
    vector[index % vector.length] += text.charCodeAt(index) / 255;
  }
  return vector;
}

const fallbackLabels: Record<SupportedLanguage, {
  basedOn: string;
  mainBenefit: string;
  documents: string;
  apply: string;
  privacy: string;
  benefitVaries: string;
  notListed: string;
}> = {
  en: {
    basedOn: "Based on the scheme data I have",
    mainBenefit: "Main benefit",
    documents: "Documents usually needed",
    apply: "Apply or verify on the official portal",
    privacy: "Do not share Aadhaar, OTP, bank account number, or passwords in this chat.",
    benefitVaries: "benefit details vary",
    notListed: "not listed"
  },
  hi: {
    basedOn: "मेरे पास मौजूद योजना डेटा के आधार पर",
    mainBenefit: "मुख्य लाभ",
    documents: "आमतौर पर जरूरी दस्तावेज",
    apply: "आधिकारिक पोर्टल पर आवेदन या सत्यापन करें",
    privacy: "इस चैट में आधार, OTP, बैंक खाता नंबर या पासवर्ड साझा न करें।",
    benefitVaries: "लाभ का विवरण अलग हो सकता है",
    notListed: "सूचीबद्ध नहीं"
  },
  kn: {
    basedOn: "ನನ್ನಲ್ಲಿರುವ ಯೋಜನೆ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ",
    mainBenefit: "ಮುಖ್ಯ ಲಾಭ",
    documents: "ಸಾಮಾನ್ಯವಾಗಿ ಬೇಕಾಗುವ ದಾಖಲೆಗಳು",
    apply: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಅಥವಾ ಪರಿಶೀಲಿಸಿ",
    privacy: "ಈ ಚಾಟ್‌ನಲ್ಲಿ ಆಧಾರ್, OTP, ಬ್ಯಾಂಕ್ ಖಾತೆ ಸಂಖ್ಯೆ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
    benefitVaries: "ಲಾಭದ ವಿವರಗಳು ಬದಲಾಗಬಹುದು",
    notListed: "ಪಟ್ಟಿಯಲ್ಲಿ ಇಲ್ಲ"
  },
  ta: {
    basedOn: "என்னிடம் உள்ள திட்டத் தரவின் அடிப்படையில்",
    mainBenefit: "முக்கிய நன்மை",
    documents: "பொதுவாக தேவையான ஆவணங்கள்",
    apply: "அதிகாரப்பூர்வ போர்டலில் விண்ணப்பிக்கவும் அல்லது சரிபார்க்கவும்",
    privacy: "இந்த அரட்டையில் ஆதார், OTP, வங்கி கணக்கு எண் அல்லது கடவுச்சொற்களை பகிர வேண்டாம்.",
    benefitVaries: "நன்மை விவரங்கள் மாறலாம்",
    notListed: "பட்டியலிடப்படவில்லை"
  },
  te: {
    basedOn: "నా వద్ద ఉన్న పథకం డేటా ఆధారంగా",
    mainBenefit: "ప్రధాన ప్రయోజనం",
    documents: "సాధారణంగా అవసరమైన పత్రాలు",
    apply: "అధికారిక పోర్టల్‌లో దరఖాస్తు చేయండి లేదా ధృవీకరించండి",
    privacy: "ఈ చాట్‌లో ఆధార్, OTP, బ్యాంకు ఖాతా సంఖ్య లేదా పాస్‌వర్డ్‌లను పంచుకోవద్దు.",
    benefitVaries: "ప్రయోజన వివరాలు మారవచ్చు",
    notListed: "జాబితాలో లేదు"
  },
  mr: {
    basedOn: "माझ्याकडे असलेल्या योजनेच्या माहितीनुसार",
    mainBenefit: "मुख्य लाभ",
    documents: "साधारणपणे लागणारी कागदपत्रे",
    apply: "अधिकृत पोर्टलवर अर्ज करा किंवा पडताळणी करा",
    privacy: "या चॅटमध्ये आधार, OTP, बँक खाते क्रमांक किंवा पासवर्ड शेअर करू नका.",
    benefitVaries: "लाभाचे तपशील बदलू शकतात",
    notListed: "सूचीबद्ध नाही"
  },
  bn: {
    basedOn: "আমার কাছে থাকা প্রকল্পের তথ্য অনুযায়ী",
    mainBenefit: "প্রধান সুবিধা",
    documents: "সাধারণত প্রয়োজনীয় নথি",
    apply: "সরকারি পোর্টালে আবেদন বা যাচাই করুন",
    privacy: "এই চ্যাটে আধার, OTP, ব্যাংক অ্যাকাউন্ট নম্বর বা পাসওয়ার্ড শেয়ার করবেন না।",
    benefitVaries: "সুবিধার বিবরণ ভিন্ন হতে পারে",
    notListed: "তালিকাভুক্ত নয়"
  },
  gu: {
    basedOn: "મારી પાસે રહેલા યોજનાના ડેટા મુજબ",
    mainBenefit: "મુખ્ય લાભ",
    documents: "સામાન્ય રીતે જરૂરી દસ્તાવેજો",
    apply: "સત્તાવાર પોર્ટલ પર અરજી કરો અથવા ચકાસો",
    privacy: "આ ચેટમાં આધાર, OTP, બેંક એકાઉન્ટ નંબર અથવા પાસવર્ડ શેર કરશો નહીં.",
    benefitVaries: "લાભની વિગતો બદલાઈ શકે છે",
    notListed: "સૂચિબદ્ધ નથી"
  }
};

async function* streamFallbackAnswer(messages: ChatMessage[], context: Scheme[], language: SupportedLanguage) {
  const lastQuestion = messages[messages.length - 1]?.content ?? "this scheme";
  const primary = context[0];
  const labels = fallbackLabels[language];

  const answer = primary
    ? `1. ${labels.basedOn}, ${primary.name} may be relevant for your question: "${lastQuestion}".\n2. ${labels.mainBenefit}: ${primary.benefits[0]?.amount ?? primary.benefits[0]?.title ?? labels.benefitVaries}.\n3. ${labels.documents}: ${primary.documents.slice(0, 4).join(", ")}.\n4. ${labels.apply}: ${primary.applicationUrl ?? primary.sourceUrl ?? labels.notListed}.\n5. ${labels.privacy}`
    : FALLBACK_TRANSLATIONS[language].fallbackNoScheme;

  const tokens = answer.split(/(\s+)/);
  for (const token of tokens) {
    await new Promise((resolve) => setTimeout(resolve, 12));
    yield token;
  }
}
