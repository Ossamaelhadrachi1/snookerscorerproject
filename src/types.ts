export type Player = 'A' | 'B';

export interface Ball {
  color: string;
  points: number;
  bgColor: string;
  textColor: string;
}

export interface GameState {
  scores: { [key in Player]: number };
  frames: { [key in Player]: number };
  currentPlayer: Player;
  break_: number;
  remainingReds: number;
  history: Ball[];
  time: number;
  isClockRunning: boolean;
  tableName: string;
  playerNames: { [key in Player]: string };
}

export const BALLS: Ball[] = [
  { color: 'Red', points: 1, bgColor: 'bg-red-600', textColor: 'text-white' },
  { color: 'Yellow', points: 2, bgColor: 'bg-yellow-400', textColor: 'text-black' },
  { color: 'Green', points: 3, bgColor: 'bg-green-600', textColor: 'text-white' },
  { color: 'Brown', points: 4, bgColor: 'bg-amber-800', textColor: 'text-white' },
  { color: 'Blue', points: 5, bgColor: 'bg-blue-600', textColor: 'text-white' },
  { color: 'Pink', points: 6, bgColor: 'bg-pink-500', textColor: 'text-white' },
  { color: 'Black', points: 7, bgColor: 'bg-black', textColor: 'text-white' },
];