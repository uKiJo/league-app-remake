import React, { ChangeEvent } from 'react';

import { pipe } from 'ramda';
import { splitString, filter, stringify } from './utils';

interface GameProps {
  game: FixtureShape;
  handleHome: (
    event: ChangeEvent<HTMLInputElement>,
    game: FixtureShape
  ) => void;
  handleAway: (
    event: ChangeEvent<HTMLInputElement>,
    game: FixtureShape
  ) => void;
}

interface FixtureShape {
  homeTeam: {
    name: string;
    logo_path?: string;
    goal?: string;
  };
  awayTeam: {
    name: string;
    logo_path: string;
    goal: string;
  };
  id: number;
}

let Game: React.FC<GameProps> = ({ game, handleHome, handleAway }) => {
  console.log('game component rendered');

  const { homeTeam, awayTeam } = game;

  const converted = pipe(splitString, filter, stringify);

  return (
    <>
      <div className="w-full flex justify-center text-gray-800 flex border-b-2 border-gray-100 last:border-0">
        <div className="p-2 flex items-center justify-end flex-1">
          <span className="p-2 w-30 text-sm text-dark-grey font-bold">
            {converted(homeTeam.name)}
          </span>
          {homeTeam.logo_path && (
            <img className="h-6" src={homeTeam.logo_path} alt="home-logo" />
          )}
        </div>
        <div className="flex items-center">
          <div className="flex">
            <input
              className="w-6 h-6 text-white text-center bg-primary rounded-l-lg font-bold"
              type="text"
              onChange={(e) => handleHome(e, game)}
              defaultValue={homeTeam.goal}
            />
            <div className="h-6 bg-primary text-white flex items-center font-bold">
              -
            </div>
            <input
              className="w-6 h-6 text-white text-center bg-primary rounded-r-lg font-bold"
              type="text"
              onChange={(e) => handleAway(e, game)}
              defaultValue={awayTeam.goal}
            />
          </div>
        </div>
        <div className="p-2 flex items-center flex-1">
          {homeTeam.logo_path && (
            <img className="h-6" src={awayTeam.logo_path} alt="away-logo" />
          )}
          <span className="p-2 w-30 text-sm text-dark-grey font-bold">
            {converted(awayTeam.name)}
          </span>
        </div>
      </div>
    </>
  );
};

Game = React.memo(Game);

export default Game;
