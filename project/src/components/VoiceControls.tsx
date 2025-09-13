import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceControlsProps {
  voiceEnabled: boolean;
  onVoiceToggle: () => void;
  fontSize: 'normal' | 'large' | 'extra-large';
}

export default function VoiceControls({ voiceEnabled, onVoiceToggle, fontSize }: VoiceControlsProps) {
  const [isListening, setIsListening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const fontSizes = {
    normal: 'text-sm',
    large: 'text-base',
    'extra-large': 'text-lg'
  };

  const handleVoiceCommand = () => {
    if (!voiceEnabled) return;
    
    setIsListening(!isListening);
    // Here you would integrate with Web Speech API
    if (!isListening) {
      // Start listening
      console.log('Started listening for voice commands...');
    } else {
      // Stop listening
      console.log('Stopped listening for voice commands.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-4 mb-6">
      <h3 className={`font-semibold mb-4 ${fontSize === 'extra-large' ? 'text-xl' : fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
        Voice & Audio Controls
      </h3>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleVoiceCommand}
          disabled={!voiceEnabled}
          className={`
            flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200
            ${fontSizes[fontSize]}
            ${isListening 
              ? 'bg-red-50 border-red-300 text-red-700' 
              : voiceEnabled 
                ? 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100' 
                : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5 mr-2" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              {voiceEnabled ? 'Voice Command' : 'Voice Disabled'}
            </>
          )}
        </button>

        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={`
            flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200
            ${fontSizes[fontSize]}
            ${audioEnabled 
              ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' 
              : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-5 h-5 mr-2" />
              Audio On
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 mr-2" />
              Audio Off
            </>
          )}
        </button>

        <button
          onClick={onVoiceToggle}
          className={`
            flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200
            ${fontSizes[fontSize]}
            bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100
          `}
        >
          Settings
        </button>
      </div>

      {voiceEnabled && (
        <div className={`mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200`}>
          <p className={`text-blue-800 mb-2 font-medium ${fontSizes[fontSize]}`}>
            Voice Commands Available:
          </p>
          <ul className={`text-blue-700 space-y-1 ${fontSize === 'extra-large' ? 'text-base' : 'text-sm'}`}>
            <li>• "Show my reminders"</li>
            <li>• "Mark [reminder name] complete"</li>
            <li>• "Call my family"</li>
            <li>• "What's next today?"</li>
          </ul>
        </div>
      )}
    </div>
  );
}