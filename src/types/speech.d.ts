interface CivicBridgeSpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface CivicBridgeSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: CivicBridgeSpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface CivicBridgeSpeechRecognitionConstructor {
  new (): CivicBridgeSpeechRecognition;
}
