import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Button from '../ui/Button';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 0.9; // Slightly slower for better comprehension
    newUtterance.pitch = 1;
    newUtterance.volume = isMuted ? 0 : 1;
    
    newUtterance.onend = () => {
      setIsPlaying(false);
    };
    
    setUtterance(newUtterance);
    setIsPlaying(true);
    window.speechSynthesis.speak(newUtterance);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (utterance) {
      utterance.volume = isMuted ? 1 : 0;
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
      <Button
        variant={isPlaying ? "secondary" : "primary"}
        size="sm"
        onClick={handlePlay}
        className="flex items-center"
      >
        {isPlaying ? (
          <>
            <Pause className="h-4 w-4 mr-1" />
            Pause
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-1" />
            Read Aloud
          </>
        )}
      </Button>
      
      <button
        onClick={handleToggleMute}
        className="p-2 rounded-full hover:bg-blue-100 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-gray-500" />
        ) : (
          <Volume2 className="h-5 w-5 text-blue-600" />
        )}
      </button>
      
      <span className="text-sm text-blue-700">Text-to-Speech enabled</span>
    </div>
  );
};

export default TextToSpeech;