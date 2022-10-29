import { FC } from "react";

interface GamesStatsProps {
  games: number;
  text: string;
}

const GameStats: FC<GamesStatsProps> = ({ games, text }) => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <p className="text-4xl font-extrabold">{games}</p>
      <p>{text}</p>
    </div>
  );
};

export default GameStats;
