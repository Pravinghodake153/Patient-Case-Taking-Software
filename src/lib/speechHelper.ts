/**
 * Helper for Web Speech Recognition with graceful simulated fallback
 */

interface SpeechRecognitionCustomInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: { results: Array<Array<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionCustomInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionCustomInstance;
  }
}

export class VoiceRecognitionService {
  private recognition: SpeechRecognitionCustomInstance | null = null;
  private isAvailable: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        try {
          this.recognition = new SpeechRec();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.isAvailable = true;
        } catch {
          this.isAvailable = false;
        }
      }
    }
  }

  public listen(
    lang: string,
    onInterim: (text: string) => void,
    onFinal: (text: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): () => void {
    if (!this.recognition || !this.isAvailable) {
      // Return simulated speech listening with realistic timer
      const demoPhrases = [
        'I have severe chest pain and breathlessness since morning',
        'सीने में बहुत तेज दर्द और भारीपन हो रहा है',
        'घुटनों में बहुत तेज दर्द है और सुबह उठने पर जकड़न रहती है',
        'पेट में बहुत जलन और खट्टी डकारें आ रही हैं',
      ];
      const randomPhrase = demoPhrases[Math.floor(Math.random() * demoPhrases.length)];
      
      let words = randomPhrase.split(' ');
      let currentWordIndex = 0;
      
      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          currentWordIndex++;
          onInterim(words.slice(0, currentWordIndex).join(' '));
        } else {
          clearInterval(interval);
          onFinal(randomPhrase);
          onEnd();
        }
      }, 400);

      return () => clearInterval(interval);
    }

    try {
      this.recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      
      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        onInterim(transcript);
        onFinal(transcript);
      };

      this.recognition.onerror = (event) => {
        onError(event.error);
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.start();

      return () => {
        try {
          this.recognition?.stop();
        } catch {
          // ignore
        }
      };
    } catch (e) {
      onError(String(e));
      return () => {};
    }
  }
}

export const voiceRecognition = new VoiceRecognitionService();
