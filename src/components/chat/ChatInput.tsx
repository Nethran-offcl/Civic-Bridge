"use client";

import { FormEvent, useMemo, useState } from "react";
import { Mic, MicOff, Send, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";
import type { SupportedLanguage } from "@/types/profile";

const sensitivePattern = /\b(aadhaar|aadhar|otp|bank account|ifsc|card number|cvv|password|pin)\b/i;

export function ChatInput({
  onSend,
  disabled,
  language
}: {
  onSend: (message: string) => void;
  disabled?: boolean;
  language: SupportedLanguage;
}) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const warning = sensitivePattern.test(message);
  const supportsSpeech = useMemo(() => {
    if (typeof window === "undefined") return false;
    const speechWindow = window as Window & {
      webkitSpeechRecognition?: CivicBridgeSpeechRecognitionConstructor;
      SpeechRecognition?: CivicBridgeSpeechRecognitionConstructor;
    };
    return Boolean(speechWindow.webkitSpeechRecognition ?? speechWindow.SpeechRecognition);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim() || warning) return;
    onSend(message);
    setMessage("");
  }

  function startVoice() {
    if (typeof window === "undefined") return;
    const speechWindow = window as Window & {
      webkitSpeechRecognition?: CivicBridgeSpeechRecognitionConstructor;
      SpeechRecognition?: CivicBridgeSpeechRecognitionConstructor;
    };
    const SpeechRecognitionConstructor = speechWindow.webkitSpeechRecognition ?? speechWindow.SpeechRecognition;
    if (!SpeechRecognitionConstructor) return;

    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = SUPPORTED_LANGUAGES[language].speechCode;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) setMessage((current) => `${current} ${transcript}`.trim());
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
  }

  return (
    <form onSubmit={submit} className="space-y-2 border-t border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-950">
      {warning ? (
        <div className="flex items-center gap-2 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
          <ShieldAlert className="h-4 w-4" />
          Do not share Aadhaar, OTP, passwords, or bank details here.
        </div>
      ) : null}
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask about documents, eligibility, or application steps"
          disabled={disabled}
          className="dark:shadow-none"
        />
        <Button
          type="button"
          size="icon"
          variant="secondary"
          onClick={startVoice}
          disabled={!supportsSpeech || isListening || disabled}
          title={supportsSpeech ? "Speak question" : "Voice input is available in supported Chrome browsers"}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button type="submit" size="icon" disabled={disabled || !message.trim() || warning} title="Send message">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
