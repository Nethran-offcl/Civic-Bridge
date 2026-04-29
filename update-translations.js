const fs = require('fs');
const path = require('path');

const newTranslations = {
  hi: {
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

const filePath = path.join(__dirname, 'src', 'lib', 'translation.ts');
let content = fs.readFileSync(filePath, 'utf8');

for (const lang in newTranslations) {
  const langBlockRegex = new RegExp(`\\s+${lang}:\\s+\\{[\\s\\S]*?\\},?`);
  const match = content.match(langBlockRegex);
  if (match) {
    let block = match[0];
    const insertIndex = block.lastIndexOf('}');
    let newEntries = ',\n'; 
    let isFirst = true;
    for (const [key, value] of Object.entries(newTranslations[lang])) {
      if (!isFirst) newEntries += ',\n';
      newEntries += `    "${key}": "${value}"`;
      isFirst = false;
    }
    newEntries += '\n  ';
    block = block.slice(0, insertIndex) + newEntries + block.slice(insertIndex);
    // Replace by splitting exactly
    content = content.substring(0, match.index) + block + content.substring(match.index + match[0].length);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Translations injected successfully!');
