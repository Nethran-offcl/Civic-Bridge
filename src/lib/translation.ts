import { GoogleGenerativeAI } from "@google/generative-ai";
import { FALLBACK_TRANSLATIONS, getLanguageName, SUPPORTED_LANGUAGES } from "@/lib/i18n";
import type { SupportedLanguage } from "@/types/profile";

type GoogleTranslateResponse = {
  data?: {
    translations?: Array<{
      translatedText?: string;
      detectedSourceLanguage?: string;
    }>;
  };
  error?: {
    message?: string;
  };
};

let geminiClient: GoogleGenerativeAI | null = null;

const EXACT_TRANSLATIONS: Partial<Record<SupportedLanguage, Record<string, string>>> = {
  hi: {
    "Ask AI Assistant": "AI सहायक से पूछें",
    "Find my schemes": "मेरी योजनाएं खोजें",
    Intake: "जानकारी",
    Results: "परिणाम",
    Chat: "चैट",
    "Private by default": "डिफॉल्ट रूप से निजी",
    "Privacy-first scheme discovery": "गोपनीयता-प्रथम योजना खोज",
    "Unlock your": "अपने",
    "Civic Benefits": "नागरिक लाभ खोलें",
    "Active Schemes": "सक्रिय योजनाएं",
    Languages: "भाषाएं",
    "Free & Private": "मुफ्त और निजी",
    "Live Match Engine": "लाइव मिलान इंजन",
    "How it works": "यह कैसे काम करता है",
    "Tell us basics": "बुनियादी जानकारी दें",
    "See matches": "मिलान देखें",
    "Ask follow-ups": "आगे के सवाल पूछें",
    "CivicBridge assistant": "CivicBridge सहायक",
    "Ask AI": "AI से पूछें",
    Apply: "आवेदन करें",
    Details: "विवरण",
    "Top benefit": "मुख्य लाभ",
    Benefits: "लाभ",
    Documents: "दस्तावेज",
    "Application steps": "आवेदन के चरण",
    "Eligibility notes": "पात्रता नोट्स",
    "Start intake": "जानकारी भरना शुरू करें",
    "Edit profile": "प्रोफाइल संपादित करें",
    "Matched schemes": "मिली हुई योजनाएं",
    Back: "वापस",
    Next: "आगे",
    "Show my schemes": "मेरी योजनाएं दिखाएं",
    "Matching...": "मिलान हो रहा है...",
    Login: "लॉगिन",
    Register: "रजिस्टर",
    Profile: "प्रोफाइल",
    "Find schemes in 2 minutes": "2 मिनट में योजनाएं खोजें",
    "Answer five simple sections. You can skip optional details.": "पांच सरल भागों के उत्तर दें। आप वैकल्पिक विवरण छोड़ सकते हैं।",
    "Demo farmer": "डेमो किसान",
    "Your data stays on your device unless you configure Supabase saving.": "आपका डेटा आपके डिवाइस पर ही रहता है जब तक कि आप सुपाबेस सेविंग कॉन्फ़िगर नहीं करते।",
    "Personal": "व्यक्तिगत",
    "Location": "स्थान",
    "Work": "काम",
    "Income": "आय",
    "More": "अधिक",
    "Age: ": "उम्र: ",
    "Gender": "लिंग",
    "Female": "महिला",
    "Male": "पुरुष",
    "Other": "अन्य",
    "State": "राज्य",
    "District": "जिला",
    "Example: Mandya": "उदाहरण: मांड्या"
  },
  kn: {
    "Ask AI Assistant": "AI ಸಹಾಯಕನನ್ನು ಕೇಳಿ",
    "Find my schemes": "ನನ್ನ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    Intake: "ಮಾಹಿತಿ",
    Results: "ಫಲಿತಾಂಶಗಳು",
    Chat: "ಚಾಟ್",
    "Private by default": "ಸ್ವಯಂ ಖಾಸಗಿ",
    "Privacy-first scheme discovery": "ಗೌಪ್ಯತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ ನೀಡುವ ಯೋಜನೆ ಹುಡುಕಾಟ",
    "Unlock your": "ನಿಮ್ಮ",
    "Civic Benefits": "ನಾಗರಿಕ ಲಾಭಗಳನ್ನು ತೆರೆಯಿರಿ",
    "Active Schemes": "ಸಕ್ರಿಯ ಯೋಜನೆಗಳು",
    Languages: "ಭಾಷೆಗಳು",
    "Free & Private": "ಉಚಿತ ಮತ್ತು ಖಾಸಗಿ",
    "Live Match Engine": "ಲೈವ್ ಹೊಂದಾಣಿಕೆ ಎಂಜಿನ್",
    "How it works": "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    "Tell us basics": "ಮೂಲ ಮಾಹಿತಿ ನೀಡಿ",
    "See matches": "ಹೊಂದಾಣಿಕೆಗಳನ್ನು ನೋಡಿ",
    "Ask follow-ups": "ಮುಂದಿನ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ",
    "CivicBridge assistant": "CivicBridge ಸಹಾಯಕ",
    "Ask AI": "AI ಕೇಳಿ",
    Apply: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    Details: "ವಿವರಗಳು",
    "Top benefit": "ಮುಖ್ಯ ಲಾಭ",
    Benefits: "ಲಾಭಗಳು",
    Documents: "ದಾಖಲೆಗಳು",
    "Application steps": "ಅರ್ಜಿಯ ಹಂತಗಳು",
    "Eligibility notes": "ಅರ್ಹತಾ ಟಿಪ್ಪಣಿಗಳು",
    "Start intake": "ಮಾಹಿತಿ ಆರಂಭಿಸಿ",
    "Edit profile": "ಪ್ರೊಫೈಲ್ ತಿದ್ದುಪಡಿ",
    "Matched schemes": "ಹೊಂದಿದ ಯೋಜನೆಗಳು",
    Back: "ಹಿಂದೆ",
    Next: "ಮುಂದೆ",
    "Show my schemes": "ನನ್ನ ಯೋಜನೆಗಳನ್ನು ತೋರಿಸಿ",
    "Matching...": "ಹೊಂದಿಸಲಾಗುತ್ತಿದೆ...",
    Login: "ಲಾಗಿನ್",
    Register: "ನೋಂದಣಿ",
    Profile: "ಪ್ರೊಫೈಲ್",
    "Find schemes in 2 minutes": "2 ನಿಮಿಷಗಳಲ್ಲಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    "Answer five simple sections. You can skip optional details.": "ಐದು ಸರಳ ವಿಭಾಗಗಳಿಗೆ ಉತ್ತರಿಸಿ. ಐಚ್ಛಿಕ ವಿವರಗಳನ್ನು ಬಿಡಬಹುದು.",
    "Demo farmer": "ಡೆಮೊ ರೈತ",
    "Your data stays on your device unless you configure Supabase saving.": "ನೀವು ಸುಪಬೇಸ್ ಸೇವಿಂಗ್ ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡದ ಹೊರತು ನಿಮ್ಮ ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿಯೇ ಇರುತ್ತದೆ.",
    "Personal": "ವೈಯಕ್ತಿಕ",
    "Location": "ಸ್ಥಳ",
    "Work": "ಕೆಲಸ",
    "Income": "ಆದಾಯ",
    "More": "ಹೆಚ್ಚು",
    "Age: ": "ವಯಸ್ಸು: ",
    "Gender": "ಲಿಂಗ",
    "Female": "ಮಹಿಳೆ",
    "Male": "ಪುರುಷ",
    "Other": "ಇತರೆ",
    "State": "ರಾಜ್ಯ",
    "District": "ಜಿಲ್ಲೆ",
    "Example: Mandya": "ಉದಾಹರಣೆ: ಮಂಡ್ಯ"
  },
  ta: {
    "Ask AI Assistant": "AI உதவியாளரிடம் கேள்",
    "Find my schemes": "என் திட்டங்களை கண்டறி",
    Intake: "விவரங்கள்",
    Results: "முடிவுகள்",
    Chat: "அரட்டை",
    "Private by default": "இயல்பாக தனியுரிமை",
    "Privacy-first scheme discovery": "தனியுரிமை முதன்மை திட்ட கண்டறிதல்",
    "Unlock your": "உங்கள்",
    "Civic Benefits": "குடிமக்கள் நன்மைகளை திறக்கவும்",
    "Active Schemes": "செயலில் உள்ள திட்டங்கள்",
    Languages: "மொழிகள்",
    "Free & Private": "இலவசம் மற்றும் தனியுரிமை",
    "Live Match Engine": "நேரடி பொருத்த இயந்திரம்",
    "How it works": "இது எப்படி செயல்படுகிறது",
    "Tell us basics": "அடிப்படை விவரங்களை சொல்லுங்கள்",
    "See matches": "பொருத்தங்களை பார்க்கவும்",
    "Ask follow-ups": "தொடர் கேள்விகள் கேளுங்கள்",
    "CivicBridge assistant": "CivicBridge உதவியாளர்",
    "Ask AI": "AI-யிடம் கேள்",
    Apply: "விண்ணப்பிக்கவும்",
    Details: "விவரங்கள்",
    "Top benefit": "முக்கிய நன்மை",
    Benefits: "நன்மைகள்",
    Documents: "ஆவணங்கள்",
    "Application steps": "விண்ணப்ப படிகள்",
    "Eligibility notes": "தகுதி குறிப்புகள்",
    "Start intake": "விவரங்களை தொடங்கு",
    "Edit profile": "சுயவிவரத்தை திருத்து",
    "Matched schemes": "பொருந்திய திட்டங்கள்",
    Back: "பின்",
    Next: "அடுத்து",
    "Show my schemes": "என் திட்டங்களை காட்டு",
    "Matching...": "பொருத்தப்படுகிறது...",
    Login: "உள்நுழை",
    Register: "பதிவு செய்",
    Profile: "சுயவிவரம்",
    "Find schemes in 2 minutes": "2 நிமிடங்களில் திட்டங்களைக் கண்டறியவும்",
    "Answer five simple sections. You can skip optional details.": "ஐந்து எளிய பகுதிகளுக்கு பதிலளிக்கவும். விருப்ப விவரங்களை நீங்கள் தவிர்க்கலாம்.",
    "Demo farmer": "டெமோ விவசாயி",
    "Your data stays on your device unless you configure Supabase saving.": "நீங்கள் Supabase சேமிப்பை உள்ளமைக்காவிட்டால் உங்கள் தரவு உங்கள் சாதனத்திலேயே இருக்கும்.",
    "Personal": "தனிப்பட்ட",
    "Location": "இடம்",
    "Work": "வேலை",
    "Income": "வருமானம்",
    "More": "மேலும்",
    "Age: ": "வயது: ",
    "Gender": "பாலினம்",
    "Female": "பெண்",
    "Male": "ஆண்",
    "Other": "மற்றவை",
    "State": "மாநிலம்",
    "District": "மாவட்டம்",
    "Example: Mandya": "உதாரணம்: மண்டியா"
  },
  te: {
    "Ask AI Assistant": "AI సహాయకుడిని అడగండి",
    "Find my schemes": "నా పథకాలను కనుగొనండి",
    Intake: "వివరాలు",
    Results: "ఫలితాలు",
    Chat: "చాట్",
    "Private by default": "డిఫాల్ట్‌గా ప్రైవేట్",
    "Privacy-first scheme discovery": "గోప్యతకు ప్రాధాన్యమిచ్చే పథక శోధన",
    "Unlock your": "మీ",
    "Civic Benefits": "పౌర ప్రయోజనాలను తెరవండి",
    "Active Schemes": "సక్రియ పథకాలు",
    Languages: "భాషలు",
    "Free & Private": "ఉచితం మరియు ప్రైవేట్",
    "Live Match Engine": "లైవ్ మ్యాచ్ ఇంజిన్",
    "How it works": "ఇది ఎలా పనిచేస్తుంది",
    "Tell us basics": "ప్రాథమిక వివరాలు చెప్పండి",
    "See matches": "సరిపోలినవి చూడండి",
    "Ask follow-ups": "తదుపరి ప్రశ్నలు అడగండి",
    "CivicBridge assistant": "CivicBridge సహాయకుడు",
    "Ask AI": "AIని అడగండి",
    Apply: "దరఖాస్తు చేయండి",
    Details: "వివరాలు",
    "Top benefit": "ప్రధాన ప్రయోజనం",
    Benefits: "ప్రయోజనాలు",
    Documents: "పత్రాలు",
    "Application steps": "దరఖాస్తు దశలు",
    "Eligibility notes": "అర్హత గమనికలు",
    "Start intake": "వివరాలు ప్రారంభించండి",
    "Edit profile": "ప్రొఫైల్ మార్చండి",
    "Matched schemes": "సరిపోలిన పథకాలు",
    Back: "వెనుకకు",
    Next: "తదుపరి",
    "Show my schemes": "నా పథకాలను చూపించు",
    "Matching...": "సరిపోలుస్తోంది...",
    Login: "లాగిన్",
    Register: "నమోదు",
    Profile: "ప్రొఫైల్",
    "Find schemes in 2 minutes": "2 నిమిషాల్లో పథకాలను కనుగొనండి",
    "Answer five simple sections. You can skip optional details.": "ఐదు సాధారణ విభాగాలకు సమాధానం ఇవ్వండి. ఐచ్ఛిక వివరాలను మీరు వదిలివేయవచ్చు.",
    "Demo farmer": "డెమో రైతు",
    "Your data stays on your device unless you configure Supabase saving.": "మీరు సుపాబేస్ సేవింగ్‌ను కాన్ఫిగర్ చేయకపోతే మీ డేటా మీ పరికరంలోనే ఉంటుంది.",
    "Personal": "వ్యక్తిగత",
    "Location": "స్థానం",
    "Work": "పని",
    "Income": "ఆదాయం",
    "More": "మరింత",
    "Age: ": "వయస్సు: ",
    "Gender": "లింగం",
    "Female": "స్త్రీ",
    "Male": "పురుషుడు",
    "Other": "ఇతర",
    "State": "రాష్ట్రం",
    "District": "జిల్లా",
    "Example: Mandya": "ఉదాహరణ: మాండ్యా"
  },
  mr: {
    "Ask AI Assistant": "AI सहाय्यकाला विचारा",
    "Find my schemes": "माझ्या योजना शोधा",
    Intake: "माहिती",
    Results: "निकाल",
    Chat: "चॅट",
    "Private by default": "डीफॉल्टने खाजगी",
    "Privacy-first scheme discovery": "गोपनीयता-प्रथम योजना शोध",
    "Unlock your": "तुमचे",
    "Civic Benefits": "नागरिक लाभ उघडा",
    "Active Schemes": "सक्रिय योजना",
    Languages: "भाषा",
    "Free & Private": "मोफत आणि खाजगी",
    "Live Match Engine": "लाइव्ह जुळणी इंजिन",
    "How it works": "हे कसे काम करते",
    "Tell us basics": "मूलभूत माहिती द्या",
    "See matches": "जुळण्या पहा",
    "Ask follow-ups": "पुढील प्रश्न विचारा",
    "CivicBridge assistant": "CivicBridge सहाय्यक",
    "Ask AI": "AI ला विचारा",
    Apply: "अर्ज करा",
    Details: "तपशील",
    "Top benefit": "मुख्य लाभ",
    Benefits: "लाभ",
    Documents: "कागदपत्रे",
    "Application steps": "अर्जाचे टप्पे",
    "Eligibility notes": "पात्रता नोंदी",
    "Start intake": "माहिती भरणे सुरू करा",
    "Edit profile": "प्रोफाइल संपादित करा",
    "Matched schemes": "जुळलेल्या योजना",
    Back: "मागे",
    Next: "पुढे",
    "Show my schemes": "माझ्या योजना दाखवा",
    "Matching...": "जुळवणी सुरू आहे...",
    Login: "लॉगिन",
    Register: "नोंदणी",
    Profile: "प्रोफाइल",
    "Find schemes in 2 minutes": "2 मिनिटांत योजना शोधा",
    "Answer five simple sections. You can skip optional details.": "पाच सोप्या विभागांची उत्तरे द्या. आपण ऐच्छिक तपशील वगळू शकता.",
    "Demo farmer": "डेमो शेतकरी",
    "Your data stays on your device unless you configure Supabase saving.": "तुम्ही सुपाबेस सेव्हिंग कॉन्फिगर करेपर्यंत तुमचा डेटा तुमच्या डिव्हाइसवरच राहील.",
    "Personal": "वैयक्तिक",
    "Location": "ठिकाण",
    "Work": "काम",
    "Income": "उत्पन्न",
    "More": "अधिक",
    "Age: ": "वय: ",
    "Gender": "लिंग",
    "Female": "स्त्री",
    "Male": "पुरुष",
    "Other": "इतर",
    "State": "राज्य",
    "District": "जिल्हा",
    "Example: Mandya": "उदाहरण: मंड्या"
  }
};

function getGeminiClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!geminiClient) geminiClient = new GoogleGenerativeAI(key);
  return geminiClient;
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function localFallback(texts: string[], targetLanguage: SupportedLanguage) {
  const dictionary = FALLBACK_TRANSLATIONS[targetLanguage];
  const englishDictionary = FALLBACK_TRANSLATIONS.en;

  return texts.map((text) => {
    const exact = EXACT_TRANSLATIONS[targetLanguage]?.[text];
    if (exact) return exact;

    const entry = Object.entries(englishDictionary).find(([, english]) => english === text);
    if (!entry) return text;
    return dictionary[entry[0]] ?? text;
  });
}

async function translateWithGoogle(texts: string[], targetLanguage: SupportedLanguage) {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!key || targetLanguage === "en") return null;

  const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: texts,
      target: SUPPORTED_LANGUAGES[targetLanguage].translateCode,
      format: "text"
    })
  });

  const data = (await response.json()) as GoogleTranslateResponse;
  if (!response.ok) {
    throw new Error(data.error?.message ?? "Google Translate request failed");
  }

  const translations = data.data?.translations ?? [];
  if (translations.length !== texts.length) return null;
  return translations.map((item, index) => {
    const translated = decodeHtmlEntities(item.translatedText ?? "");
    return translated === texts[index]
      ? EXACT_TRANSLATIONS[targetLanguage]?.[texts[index]] ?? translated
      : translated;
  });
}

async function translateWithGemini(texts: string[], targetLanguage: SupportedLanguage) {
  const client = getGeminiClient();
  if (!client) return null;
  
  const targetLanguageName = SUPPORTED_LANGUAGES[targetLanguage].name;
  
  const model = client.getGenerativeModel({ 
    model: "gemini-flash-latest",
    systemInstruction: `Translate the following JSON array of strings into ${targetLanguageName} language. 
You MUST translate or transliterate EVERY string into the ${targetLanguageName} script. Do not leave any string in English.
Maintain the exact array structure, order, and length. 
Only return the translated JSON array, with no markdown formatting or other text.`
  });
  
  const prompt = `Strings to translate:
${JSON.stringify(texts)}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const translated = JSON.parse(cleanText) as string[];
    
    if (Array.isArray(translated) && translated.length === texts.length) {
      return translated.map(t => decodeHtmlEntities(t));
    }
  } catch (error) {
    console.warn("Gemini translation failed:", error);
  }
  
  return null;
}

export async function translateTexts(texts: string[], targetLanguage: SupportedLanguage) {
  const normalized = texts.map((text) => text.trim()).filter(Boolean);
  if (targetLanguage === "en" || normalized.length === 0) return normalized;

  try {
    const google = await translateWithGoogle(normalized, targetLanguage);
    if (google) return google;
  } catch (error) {
    console.warn("Google Translate failed, trying Gemini fallback.", error);
  }

  try {
    const gemini = await translateWithGemini(normalized, targetLanguage);
    if (gemini) return gemini;
  } catch (error) {
    console.warn("Gemini translation failed, using local fallback.", error);
  }

  return localFallback(normalized, targetLanguage);
}
