import React from 'react';
import { BALLS } from '../types';

interface BallSelectorProps {
  onBallPotted: (points: number) => void;
  remainingReds: number;
  setRemainingReds: (reds: number) => void;
}

const BallSelector: React.FC<BallSelectorProps> = ({
  onBallPotted,
  remainingReds,
  setRemainingReds,
}) => {
  const handleBallClick = (points: number, isRed: boolean) => {
    if (isRed && remainingReds > 0) {
      setRemainingReds(remainingReds - 1);
      onBallPotted(points);
    } else if (!isRed) {
      onBallPotted(points);
    }
  };

  return (
    <div className="bg-black/30 rounded-lg p-6">
      <div className="grid grid-cols-4 gap-4">
        {BALLS.map((ball) => (
          <button
            key={ball.color}
            onClick={() => handleBallClick(ball.points, ball.color === 'Red')}
            disabled={ball.color === 'Red' && remainingReds === 0}
            className={`
              ${ball.bgColor} ${ball.textColor}
              p-4 rounded-full
              flex items-center justify-center
              text-lg font-bold
              transform transition-transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {ball.points}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BallSelector;