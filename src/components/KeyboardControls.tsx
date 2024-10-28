import React, { useEffect } from 'react';
import { BALLS, Ball } from '../types';

interface KeyboardControlsProps {
  onBallPotted: (points: number) => void;
  onSwitchPlayer: () => void;
  onEndFrame: () => void;
  remainingReds: number;
  setRemainingReds: (reds: number) => void;
  history: Ball[];
  onToggleClock: () => void;
  onResetClock: () => void;
  isClockRunning: boolean;
  onReset: () => void;
}

const KeyboardControls: React.FC<KeyboardControlsProps> = ({
  onBallPotted,
  onSwitchPlayer,
  onEndFrame,
  remainingReds,
  setRemainingReds,
  history,
  onToggleClock,
  onResetClock,
  isClockRunning,
  onReset,
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      if (/^[1-7]$/.test(key)) {
        const ballIndex = parseInt(key) - 1;
        const ball = BALLS[ballIndex];
        
        if (ball.color === 'Red' && remainingReds > 0) {
          setRemainingReds(remainingReds - 1);
          onBallPotted(ball.points);
        } else if (ball.color !== 'Red') {
          onBallPotted(ball.points);
        }
      }
      
      if (key === 'enter') {
        event.preventDefault();
        onSwitchPlayer();
      }
      
      if (key === '+') {
        event.preventDefault();
        onEndFrame();
      }

      if (key === '8') {
        event.preventDefault();
        if (!isClockRunning) onToggleClock();
      }

      if (key === '9') {
        event.preventDefault();
        if (isClockRunning) onToggleClock();
      }

      if (key === '-') {
        event.preventDefault();
        onResetClock();
      }

      if (key === '/') {
        event.preventDefault();
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onBallPotted, onSwitchPlayer, onEndFrame, remainingReds, setRemainingReds, onToggleClock, onResetClock, isClockRunning, onReset]);

  const groupedBalls = history.reduce((acc, ball) => {
    const existing = acc.find(b => b.color === ball.color);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ ...ball, count: 1 });
    }
    return acc;
  }, [] as (Ball & { count: number })[]);

  return (
    <div className="bg-black/30 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-wrap gap-6 mb-8">
        {groupedBalls.length > 0 ? (
          groupedBalls.map((ball, index) => (
            <div
              key={index}
              className="flex items-center"
            >
              <div
                className={`
                  ${ball.bgColor} ${ball.textColor}
                  w-14 h-14 lg:w-20 lg:h-20 rounded-full
                  flex items-center justify-center
                  text-2xl lg:text-4xl font-bold
                  shadow-lg
                `}
              >
                {ball.count}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-lg lg:text-xl">No balls potted in current break</div>
        )}
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-center text-lg lg:text-xl text-gray-400">
        <div className="flex items-center justify-center gap-3">
          <kbd className="bg-black/30 px-4 py-2 rounded-lg text-xl lg:text-2xl">1-7</kbd>
          <span>Pot Balls</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <kbd className="bg-black/30 px-4 py-2 rounded-lg text-xl lg:text-2xl">Enter</kbd>
          <span>Switch Player</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <kbd className="bg-black/30 px-4 py-2 rounded-lg text-xl lg:text-2xl">+</kbd>
          <span>End Frame</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <kbd className="bg-black/30 px-4 py-2 rounded-lg text-xl lg:text-2xl">8</kbd>
          <span>Start Clock</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <kbd className="bg-black/30 px-4 py-2 rounded-lg text-xl lg:text-2xl">9</kbd>
          <span>Stop Clock</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <kbd className="bg-black/30 px-4 py-2 rounded-lg text-xl lg:text-2xl">-</kbd>
          <span>Reset Clock</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <kbd className="bg-black/30 px-4 py-2 rounded-lg text-xl lg:text-2xl">/</kbd>
          <span>Reset Game</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardControls;