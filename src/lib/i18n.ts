import type { SupportedLanguage } from "@/types/profile";

export const SUPPORTED_LANGUAGES: Record<
  SupportedLanguage,
  { name: string; nativeName: string; speechCode: string; translateCode: string }
> = {
  en: { name: "English", nativeName: "English", speechCode: "en-IN", translateCode: "en" },
  hi: { name: "Hindi", nativeName: "हिंदी", speechCode: "hi-IN", translateCode: "hi" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", speechCode: "kn-IN", translateCode: "kn" },
  ta: { name: "Tamil", nativeName: "தமிழ்", speechCode: "ta-IN", translateCode: "ta" },
  te: { name: "Telugu", nativeName: "తెలుగు", speechCode: "te-IN", translateCode: "te" },
  mr: { name: "Marathi", nativeName: "मराठी", speechCode: "mr-IN", translateCode: "mr" },
  bn: { name: "Bengali", nativeName: "বাংলা", speechCode: "bn-IN", translateCode: "bn" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી", speechCode: "gu-IN", translateCode: "gu" }
};

export const FALLBACK_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    findSchemes: "Find my schemes",
    trusted: "Your data stays on your device until you choose to save it.",
    chatStart: "Tell me which scheme you want to understand, or ask what you may be eligible for.",
    fallbackNoScheme:
      "I could not find a matching scheme in the local database. Please try asking about your occupation, state, age, or income range. Do not share Aadhaar, OTP, or bank details here."
  },
  hi: {
    findSchemes: "मेरी योजनाएं खोजें",
    trusted: "जब तक आप सेव नहीं करते, आपका डेटा आपके डिवाइस पर रहता है।",
    chatStart: "बताइए आप कौन सी योजना समझना चाहते हैं, या पूछें कि आप किन योजनाओं के पात्र हो सकते हैं।",
    fallbackNoScheme:
      "स्थानीय डेटाबेस में मिलती-जुलती योजना नहीं मिली। अपने काम, राज्य, उम्र या आय सीमा के बारे में पूछकर फिर कोशिश करें। यहां आधार, OTP या बैंक जानकारी साझा न करें।"
  },
  kn: {
    findSchemes: "ನನ್ನ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    trusted: "ನೀವು ಉಳಿಸುವವರೆಗೆ ನಿಮ್ಮ ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಇರುತ್ತದೆ.",
    chatStart:
      "ನೀವು ಯಾವ ಯೋಜನೆಯನ್ನು ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ಹೇಳಿ, ಅಥವಾ ನಿಮಗೆ ಯಾವ ಯೋಜನೆಗಳಿಗೆ ಅರ್ಹತೆ ಇರಬಹುದು ಎಂದು ಕೇಳಿ.",
    fallbackNoScheme:
      "ಸ್ಥಳೀಯ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಹೊಂದುವ ಯೋಜನೆ ಸಿಗಲಿಲ್ಲ. ನಿಮ್ಮ ಉದ್ಯೋಗ, ರಾಜ್ಯ, ವಯಸ್ಸು ಅಥವಾ ಆದಾಯದ ಬಗ್ಗೆ ಕೇಳಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. ಇಲ್ಲಿ ಆಧಾರ್, OTP ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
  },
  ta: {
    findSchemes: "என் திட்டங்களை கண்டறி",
    trusted: "நீங்கள் சேமிக்கும் வரை உங்கள் தரவு உங்கள் சாதனத்திலேயே இருக்கும்.",
    chatStart:
      "நீங்கள் எந்த திட்டத்தைப் புரிந்து கொள்ள விரும்புகிறீர்கள் என்று சொல்லுங்கள், அல்லது எந்த திட்டங்களுக்கு தகுதி இருக்கலாம் என்று கேளுங்கள்.",
    fallbackNoScheme:
      "உள்ளூர் தரவுத்தளத்தில் பொருந்தும் திட்டம் கிடைக்கவில்லை. உங்கள் தொழில், மாநிலம், வயது அல்லது வருமான வரம்பு பற்றி கேட்டு மீண்டும் முயற்சிக்கவும். இங்கே ஆதார், OTP அல்லது வங்கி விவரங்களை பகிர வேண்டாம்."
  },
  te: {
    findSchemes: "నా పథకాలను కనుగొనండి",
    trusted: "మీరు సేవ్ చేసే వరకు మీ డేటా మీ పరికరంలోనే ఉంటుంది.",
    chatStart:
      "మీరు ఏ పథకాన్ని అర్థం చేసుకోవాలనుకుంటున్నారో చెప్పండి, లేదా మీరు ఏ పథకాలకు అర్హులు కావచ్చో అడగండి.",
    fallbackNoScheme:
      "స్థానిక డేటాబేస్‌లో సరిపోలే పథకం కనిపించలేదు. మీ వృత్తి, రాష్ట్రం, వయస్సు లేదా ఆదాయ పరిధి గురించి అడిగి మళ్లీ ప్రయత్నించండి. ఇక్కడ ఆధార్, OTP లేదా బ్యాంకు వివరాలు పంచుకోవద్దు."
  },
  mr: {
    findSchemes: "माझ्या योजना शोधा",
    trusted: "तुम्ही सेव्ह करेपर्यंत तुमचा डेटा तुमच्या डिव्हाइसवरच राहतो.",
    chatStart: "तुम्हाला कोणती योजना समजून घ्यायची आहे ते सांगा, किंवा तुम्ही कोणत्या योजनांसाठी पात्र असू शकता ते विचारा.",
    fallbackNoScheme:
      "स्थानिक डेटाबेसमध्ये जुळणारी योजना सापडली नाही. तुमचा व्यवसाय, राज्य, वय किंवा उत्पन्न मर्यादा याबद्दल विचारून पुन्हा प्रयत्न करा. येथे आधार, OTP किंवा बँक तपशील शेअर करू नका."
  },
  bn: {
    findSchemes: "আমার প্রকল্প খুঁজুন",
    trusted: "আপনি সংরক্ষণ না করা পর্যন্ত আপনার ডেটা আপনার ডিভাইসেই থাকে।",
    chatStart: "আপনি কোন প্রকল্প বুঝতে চান বলুন, অথবা আপনি কোন প্রকল্পের জন্য যোগ্য হতে পারেন তা জিজ্ঞাসা করুন।",
    fallbackNoScheme:
      "স্থানীয় ডাটাবেসে মিল আছে এমন প্রকল্প পাওয়া যায়নি। আপনার পেশা, রাজ্য, বয়স বা আয়ের সীমা সম্পর্কে জিজ্ঞাসা করে আবার চেষ্টা করুন। এখানে আধার, OTP বা ব্যাংকের তথ্য শেয়ার করবেন না।"
  },
  gu: {
    findSchemes: "મારી યોજનાઓ શોધો",
    trusted: "તમે સેવ કરો ત્યાં સુધી તમારો ડેટા તમારા ઉપકરણ પર જ રહે છે.",
    chatStart: "તમે કઈ યોજના સમજવા માંગો છો તે કહો, અથવા તમે કઈ યોજનાઓ માટે પાત્ર હોઈ શકો તે પૂછો.",
    fallbackNoScheme:
      "સ્થાનિક ડેટાબેઝમાં મેળ ખાતી યોજના મળી નથી. તમારા વ્યવસાય, રાજ્ય, ઉંમર અથવા આવક મર્યાદા વિશે પૂછીને ફરી પ્રયાસ કરો. અહીં આધાર, OTP અથવા બેંક વિગતો શેર કરશો નહીં."
  }
};

export function detectLanguage(text: string): SupportedLanguage {
  if (/[\u0C80-\u0CFF]/.test(text)) return "kn";
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta";
  if (/[\u0C00-\u0C7F]/.test(text)) return "te";
  if (/[\u0980-\u09FF]/.test(text)) return "bn";
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu";
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  return "en";
}

export function getSupportedLanguages() {
  return Object.entries(SUPPORTED_LANGUAGES).map(([code, details]) => ({
    code: code as SupportedLanguage,
    ...details
  }));
}

export function getLanguageName(language: SupportedLanguage) {
  return SUPPORTED_LANGUAGES[language].name;
}
