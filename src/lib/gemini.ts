import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from "@/types/chat";
import type { Scheme } from "@/types/scheme";
import type { SupportedLanguage, UserProfile } from "@/types/profile";
import { FALLBACK_TRANSLATIONS } from "./i18n";
import { getCivicBridgeSystemPrompt } from "./prompts";
import { translateTexts } from "./translation";

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

  if (genAI) {
    try {
      const systemInstruction = getCivicBridgeSystemPrompt(language, profile, context);
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest",
        systemInstruction,
      });

      let rawHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      // Gemini requires history to start with 'user'
      if (rawHistory.length > 0 && rawHistory[0].role === "model") {
        rawHistory = [{ role: "user", parts: [{ text: "Hi, I need information about government schemes." }] }, ...rawHistory];
      }

      // Gemini requires strict alternation between 'user' and 'model'
      const history: { role: string; parts: { text: string }[] }[] = [];
      for (const msg of rawHistory) {
        if (history.length === 0) {
          history.push(msg);
        } else {
          const last = history[history.length - 1];
          if (last.role === msg.role) {
            last.parts[0].text += "\n\n" + msg.parts[0].text;
          } else {
            history.push(msg);
          }
        }
      }
      
      const lastMessage = messages[messages.length - 1];

      const chat = model.startChat({
        history
      });

      const result = await chat.sendMessageStream(lastMessage.content);
      
      let receivedAny = false;
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          receivedAny = true;
          yield text;
        }
      }
      
      if (receivedAny) {
        const warnings: Record<SupportedLanguage, string> = {
          en: "\n\n⚠️ Important: Never share Aadhaar, OTP, passwords, or bank details in this chat.",
          hi: "\n\n⚠️ महत्वपूर्ण: इस चैट में आधार, OTP, पासवर्ड या बैंक विवरण कभी साझा न करें।",
          kn: "\n\n⚠️ ಪ್ರಮುಖ: ಈ ಚಾಟ್‌ನಲ್ಲಿ ಆಧಾರ್, ಒಟಿಪಿ, ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
          ta: "\n\n⚠️ முக்கியமானது: இந்த அரட்டையில் ஆதார், OTP, கடவுச்சொற்கள் அல்லது வங்கி விவரங்களை ஒருபோதும் பகிர வேண்டாம்.",
          te: "\n\n⚠️ ముఖ్యమైనది: ఈ చాట్‌లో ఆధార్, OTP, పాస్‌వర్డ్‌లు లేదా బ్యాంక్ వివరాలను ఎప్పుడూ భాగస్వామ్యం చేయవద్దు.",
          mr: "\n\n⚠️ महत्त्वाचे: या चॅटमध्ये आधार, OTP, पासवर्ड किंवा बँक तपशील कधीही शेअर करू नका.",
          bn: "\n\n⚠️ গুরুত্বপূর্ণ: এই চ্যাটে কখনও আধার, OTP, পাসওয়ার্ড বা ব্যাঙ্কের বিবরণ শেয়ার করবেন না।",
          gu: "\n\n⚠️ મહત્વપૂર્ણ: આ ચેટમાં ક્યારેય આધાર, OTP, પાસવર્ડ અથવા બેંક વિગતો શેર કરશો નહીં.",
        };
        yield warnings[language] || warnings.en;
        return;
      }
    } catch (error) {
      console.warn("Dynamic Gemini chat failed, falling back to static rules.", error);
    }
  }

  // Use fallback if API key missing or generation failed
  yield* streamFallbackAnswer(messages, context, language);
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
  const lastQuestion = messages[messages.length - 1]?.content ?? "";
  const primary = context[0];
  
  if (!primary) {
    yield FALLBACK_TRANSLATIONS[language].fallbackNoScheme;
    return;
  }

  let pName = primary.name;
  let pBenefits = primary.benefits.map(b => ({ ...b }));
  let pDocs = [...(primary.documents || [])];
  let pElig = [...(primary.eligibilityCriteria || [])];

  if (language !== "en") {
    const map = new Map<string, string>();
    const textsToTranslate = new Set<string>();
    
    textsToTranslate.add(primary.name);
    primary.benefits.forEach(b => {
      if (b.title) textsToTranslate.add(b.title);
      if (b.amount) textsToTranslate.add(b.amount);
    });
    primary.documents?.forEach(d => { if (d) textsToTranslate.add(d); });
    primary.eligibilityCriteria?.forEach(e => { if (e) textsToTranslate.add(e); });
    
    const uniqueTexts = Array.from(textsToTranslate).filter(Boolean);
    if (uniqueTexts.length > 0) {
      const translatedTexts = await translateTexts(uniqueTexts, language);
      uniqueTexts.forEach((text, i) => {
        map.set(text, translatedTexts[i] || text);
      });
    }

    pName = map.get(primary.name) || primary.name;
    pBenefits = primary.benefits.map(b => ({
      ...b,
      title: map.get(b.title) || b.title,
      amount: b.amount ? (map.get(b.amount) || b.amount) : undefined
    }));
    pDocs = (primary.documents || []).map(d => map.get(d) || d);
    pElig = (primary.eligibilityCriteria || []).map(e => map.get(e) || e);
  }

  const questionLower = lastQuestion.toLowerCase();
  let answer = "";

  // Map of introductory text for each language
  const intros: Record<SupportedLanguage, string> = {
    en: (name: string) => `${name} offers these benefits:\n`,
    hi: (name: string) => `${name} ये लाभ प्रदान करती है:\n`,
    kn: (name: string) => `${name} ಈ ಪ್ರಯೋಜನಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ:\n`,
    ta: (name: string) => `${name} இந்த நன்மைகளை வழங்குகிறது:\n`,
    te: (name: string) => `${name} ఈ ప్రయోజనాలను అందిస్తుంది:\n`,
    mr: (name: string) => `${name} हे लाभ प्रदान करते:\n`,
    bn: (name: string) => `${name} এই সুবিধাগুলি প্রদান করে:\n`,
    gu: (name: string) => `${name} આ લાભો પ્રદાન કરે છે:\n`,
  };

  // Detect question type and generate tailored response
  if (questionLower.includes("benefit") || questionLower.includes("how much") || questionLower.includes("rupee") || questionLower.includes("amount")) {
    answer = intros[language](pName);
    pBenefits.forEach(b => {
      answer += `• ${b.title}: ${b.amount || fallbackLabels[language].benefitVaries}\n`;
    });
    answer += `\n${fallbackLabels[language].mainBenefit}: ${pElig?.slice(0, 2)?.join(", ") || fallbackLabels[language].notListed}`;
  } else if (questionLower.includes("document") || questionLower.includes("proof") || questionLower.includes("required") || questionLower.includes("paper")) {
    // Documents question
    const docIntro: Record<SupportedLanguage, string> = {
      en: `For ${pName}, you'll need these documents:\n`,
      hi: `${pName} के लिए ये दस्तावेज चाहिए:\n`,
      kn: `${pName} ಗಾಗಿ ನಿಮಗೆ ಈ ದಾಖಲೆಗಳ ಅಗತ್ಯವಿದೆ:\n`,
      ta: `${pName} க்காக உங்களுக்கு இந்த ஆவணங்கள் தேவை:\n`,
      te: `${pName} కోసం మీకు ఈ పత్రాలు అవసరమవుతాయి:\n`,
      mr: `${pName} साठी तुम्हाला या कागदपत्रांची गरज आहे:\n`,
      bn: `${pName} এর জন্য আপনার এই নথিগুলি প্রয়োজন:\n`,
      gu: `${pName} માટે તમને આ દસ્તાવેજોની જરૂર છે:\n`,
    };
    answer = docIntro[language];
    pDocs?.forEach((doc, i) => {
      answer += `${i + 1}. ${doc}\n`;
    });
  } else if (questionLower.includes("eligible") || questionLower.includes("qualify") || questionLower.includes("criteria")) {
    // Eligibility question
    const eligIntro: Record<SupportedLanguage, string> = {
      en: `To be eligible for ${pName}:\n`,
      hi: `${pName} के लिए पात्र होने के लिए:\n`,
      kn: `${pName} ಗೆ ಅರ್ಹರಾಗಲು:\n`,
      ta: `${pName} க்கு தகுதிவாய்ந்ததாக இருக்க:\n`,
      te: `${pName} కోసం అర్హుడిగా ఉండటానికి:\n`,
      mr: `${pName} साठी पात्र होण्यासाठी:\n`,
      bn: `${pName} এর জন্য যোগ্য হতে:\n`,
      gu: `${pName} માટે પાત્ર હોવા માટે:\n`,
    };
    answer = eligIntro[language];
    pElig?.forEach((criteria, i) => {
      answer += `${i + 1}. ${criteria}\n`;
    });
  } else if (questionLower.includes("apply") || questionLower.includes("application") || questionLower.includes("step") || questionLower.includes("process") || questionLower.includes("online") || questionLower.includes("offline")) {
    // Application steps question
    const appIntro: Record<SupportedLanguage, string> = {
      en: `How to apply for ${pName}:\n1. Check your eligibility\n2. Gather documents\n3. Visit official portal\n4. Fill application\n5. Submit\n6. Track status\n`,
      hi: `${pName} के लिए आवेदन कैसे करें:\n1. अपनी पात्रता जांचें\n2. दस्तावेज इकट्ठा करें\n3. आधिकारिक पोर्टल पर जाएं\n4. आवेदन पत्र भरें\n5. जमा करें\n6. स्थिति ट्रैक करें\n`,
      kn: `${pName} ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ:\n1. ನಿಮ್ಮ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ\n2. ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ\n3. ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಭೇಟಿ ನೀಡಿ\n4. ಅರ್ಜಿ ಭರ್ತಿ ಮಾಡಿ\n5. ಸಲ್ಲಿಸಿ\n6. ಸ್ಥಿತಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ\n`,
      ta: `${pName} க்கு விண்ணப்பிக்க எப்படி:\n1. உங்கள் தகுதியைச் சரிபார்க்கவும்\n2. ஆவணங்களைச் சேகரிக்கவும்\n3. அதிகாரப்பூர்வ போர்டலுக்குச் செல்லவும்\n4. விண்ணப்பத்தை நிரப்பவும்\n5. சமர்ப்பிக்கவும்\n6. நிலையைக் கண்காணிக்கவும்\n`,
      te: `${pName} కోసం దరఖాస్తు చేయడం ఎలా:\n1. మీ అర్హతను చెక్ చేయండి\n2. పత్రాలను సేకరించండి\n3. అధికారిక పోర్టల్‌ను సందర్శించండి\n4. దరఖాస్తును పూరించండి\n5. సమర్పించండి\n6. స్థితిని ట్రాక్ చేయండి\n`,
      mr: `${pName} साठी अर्ज कसे करावे:\n1. आपली पात्रता तपासा\n2. कागदपत्र जमा करा\n3. अधिकृत पोर्टलला भेट द्या\n4. अर्ज भरा\n5. सादर करा\n6. स्थिती ट्रॅक करा\n`,
      bn: `${pName} এর জন্য আবেদন করতে কীভাবে:\n1. আপনার যোগ্যতা যাচাই করুন\n2. নথি সংগ্রহ করুন\n3. সরকারি পোর্টালে যান\n4. আবেদন পূরণ করুন\n5. জমা দিন\n6. স্থিতি ট্রাক করুন\n`,
      gu: `${pName} માટે અરજી કેવી રીતે કરવી:\n1. તમારી પાત્રતા તપાસો\n2. દસ્તાવેજો એકત્ર કરો\n3. સત્તાવાર પોર્ટલને મુલાકાત આપો\n4. અરજી પૂર્ણ કરો\n5. સમર્પણ કરો\n6. સ્થિતિ ટ્રાક કરો\n`,
    };
    answer = appIntro[language];
  } else {
    // Default overview
    const defaultIntro: Record<SupportedLanguage, string> = {
      en: `${pName}\n\nKey Benefit: ${pBenefits[0]?.title || 'Various benefits'}\nDocuments: ${pDocs?.slice(0, 2)?.join(", ")}\nPortal: ${primary.applicationUrl || primary.sourceUrl || "Official portal"}`,
      hi: `${pName}\n\nमुख्य लाभ: ${pBenefits[0]?.title || 'विभिन्न लाभ'}\nदस्तावेज: ${pDocs?.slice(0, 2)?.join(", ")}\nपोर्टल: ${primary.applicationUrl || "आधिकारिक पोर्टल"}`,
      kn: `${pName}\n\nಮುಖ್ಯ ಲಾಭ: ${pBenefits[0]?.title || 'ವಿವಿಧ ಲಾಭ'}\nದಾಖಲೆಗಳು: ${pDocs?.slice(0, 2)?.join(", ")}\nಪೋರ್ಟಲ್: ${primary.applicationUrl || "ಅಧಿಕೃತ ಪೋರ್ಟಲ್"}`,
      ta: `${pName}\n\nமுக்கிய நன்மை: ${pBenefits[0]?.title || 'பல நன்மைகள்'}\nஆவணங்கள்: ${pDocs?.slice(0, 2)?.join(", ")}\nபோர்டல்: ${primary.applicationUrl || "அதிகாரப்பூர்வ போர்டல்"}`,
      te: `${pName}\n\nప్రధాన ప్రయోజనం: ${pBenefits[0]?.title || 'విభిన్న ప్రయోజనాలు'}\nపత్రాలు: ${pDocs?.slice(0, 2)?.join(", ")}\nపోర్టల్: ${primary.applicationUrl || "అధికారిక పోర్టల్"}`,
      mr: `${pName}\n\nमुख्य लाभ: ${pBenefits[0]?.title || 'विविध लाभ'}\nकागदपत्र: ${pDocs?.slice(0, 2)?.join(", ")}\nपोर्टल: ${primary.applicationUrl || "अधिकृत पोर्टल"}`,
      bn: `${pName}\n\nপ্রধান সুবিধা: ${pBenefits[0]?.title || 'বিভিন্ন সুবিধা'}\nনথি: ${pDocs?.slice(0, 2)?.join(", ")}\nপোর্টাল: ${primary.applicationUrl || "সরকারি পোর্টাল"}`,
      gu: `${pName}\n\nમુખ્ય લાભ: ${pBenefits[0]?.title || 'વિવિધ લાભો'}\nદસ્તાવેજો: ${pDocs?.slice(0, 2)?.join(", ")}\nપોર્ટલ: ${primary.applicationUrl || "સત્તાવાર પોર્ટલ"}`,
    };
    answer = defaultIntro[language];
  }

  // Add language-specific warning
  const warnings: Record<SupportedLanguage, string> = {
    en: "\n\n⚠️ Important: Never share Aadhaar, OTP, passwords, or bank details in this chat.",
    hi: "\n\n⚠️ महत्वपूर्ण: इस चैट में आधार, OTP, पासवर्ड या बैंक विवरण कभी साझा न करें।",
    kn: "\n\n⚠️ ಪ್ರಮುಖ: ಈ ಚಾಟ್‌ನಲ್ಲಿ ಆಧಾರ್, ಒಟಿಪಿ, ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
    ta: "\n\n⚠️ முக்கியமானது: இந்த அரட்டையில் ஆதார், OTP, கடவுச்சொற்கள் அல்லது வங்கி விவரங்களை ஒருபோதும் பகிர வேண்டாம்.",
    te: "\n\n⚠️ ముఖ్యమైనది: ఈ చాట్‌లో ఆధార్, OTP, పాస్‌వర్డ్‌లు లేదా బ్యాంక్ వివరాలను ఎప్పుడూ భాగస్వామ్యం చేయవద్దు.",
    mr: "\n\n⚠️ महत्त्वाचे: या चॅटमध्ये आधार, OTP, पासवर्ड किंवा बँक तपशील कधीही शेअर करू नका.",
    bn: "\n\n⚠️ গুরুত্বপূর্ণ: এই চ্যাটে কখনও আধার, OTP, পাসওয়ার্ড বা ব্যাঙ্কের বিবরণ শেয়ার করবেন না।",
    gu: "\n\n⚠️ મહત્વપૂર્ણ: આ ચેટમાં ક્યારેય આધાર, OTP, પાસવર્ડ અથવા બેંક વિગતો શેર કરશો નહીં.",
  };

  answer += warnings[language] || warnings.en;

  // Stream token by token
  const tokens = answer.split(/(\s+)/);
  for (const token of tokens) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    yield token;
  }
}
