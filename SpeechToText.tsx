import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import Button from '../ui/Button';

interface SpeechToTextProps {
  onTranscript: (text: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const currentTranscript = event.results[current][0].transcript;
        setTranscript(currentTranscript);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      onTranscript(transcript);
      setTranscript('');
    }
  };

  if (!recognition) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-800">
          Speech recognition is not supported in your browser. Please try using Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <Button
            variant={isListening ? "danger" : "primary"}
            size="sm"
            onClick={toggleListening}
            className="flex items-center"
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-1" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-1" />
                Start Speaking
              </>
            )}
          </Button>
          
          <span className={`text-sm ${isListening ? 'text-green-600' : 'text-gray-500'}`}>
            {isListening ? 'Listening...' : 'Click to speak'}
          </span>
        </div>
        
        {transcript && (
          <div className="mt-2">
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="text-gray-800">{transcript}</p>
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                className="flex items-center"
              >
                <Send className="h-4 w-4 mr-1" />
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;