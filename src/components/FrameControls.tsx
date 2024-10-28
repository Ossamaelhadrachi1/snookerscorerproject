import React from 'react';
import { UserMinus, Flag } from 'lucide-react';

interface FrameControlsProps {
  onSwitchPlayer: () => void;
  onEndFrame: () => void;
}

const FrameControls: React.FC<FrameControlsProps> = ({ onSwitchPlayer, onEndFrame }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onSwitchPlayer}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg
          flex items-center justify-center gap-2 transition-colors"
      >
        <UserMinus className="w-5 h-5" />
        Switch Player
      </button>
      <button
        onClick={onEndFrame}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg
          flex items-center justify-center gap-2 transition-colors"
      >
        <Flag className="w-5 h-5" />
        End Frame
      </button>
    </div>
  );
};

export default FrameControls;