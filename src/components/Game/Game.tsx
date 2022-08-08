import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FixtureUpdater } from '../../utils/FixtureUpdater';
import { TableUpdater } from '../../utils/TableUpdater';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTable } from '../../redux/features/table/tableSlice';
import { createSelector } from '@reduxjs/toolkit';

import { pipe } from 'ramda';
import { match, filterName, trim, stringify } from './hooks';

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

interface Team {
  name: string;
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
  // const [homeScore, setHomeScore] = useState('');
  // const [awayScore, setAwayScore] = useState('');
  // const [result, setResult] = useState('');
  // const [newTable, setNewTable] = useState<Team[]>([]);

  // const dispatch = useDispatch();

  // const fixture = useSelector((state: RootState) => state.fixture.fixture);

  // const tableData = useSelector((state: RootState) => state.table.table);

  // const fixupdater = new FixtureUpdater(fixture);
  // const tableUpdater = new TableUpdater(game);

  // const handleHomeChange = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     const { value } = event.target;
  //     setHomeScore(value);
  //     const home = value;

  //     if (awayScore) {
  //       setResult(`${home}-${awayScore}`);
  //       const scoreStr = `${home}-${awayScore}`;
  //       const dayIdx = fixupdater.getDayIdx(game);
  //       const updatedValeus = tableUpdater.updatePropArray(
  //         tableData,
  //         dayIdx,
  //         scoreStr
  //       );

  //       console.log('updatedValues', updatedValeus);
  //       setNewTable(updatedValeus);
  //       console.log('HOMEHANDLER');
  //       // dispatch(setTable(updatedValeus));
  //     }
  //   },
  //   []
  // );

  // const handleAwayChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setAwayScore(value);
  //   console.log('AWAY!');
  // };

  // console.log(
  //   'game: ',
  //   fixupdater.getGameIdx(game),
  //   'day: ',
  //   fixupdater.getDayIdx(game)
  // );
  console.log('game component rendered');

  // useEffect(() => {
  //   console.log(homeScore, awayScore, result);
  //   console.log(newTable);
  //   if (newTable.length) {
  //     dispatch(setTable(newTable));
  //   }
  // }, [homeScore, awayScore, result, newTable, dispatch]);

  const { homeTeam, awayTeam } = game;

  const converted = pipe(match, filterName, trim, stringify);
  // console.log(converted(homeTeam.name));
  return (
    <>
      <div className="w-full flex justify-center text-gray-800 flex p-2 border-b-2 border-gray-100 last:border-0">
        <div className="p-2 flex items-center justify-end flex-1">
          <span className="p-2 w-30 text-sm">{converted(homeTeam.name)}</span>
          {homeTeam.logo_path && (
            <img src={homeTeam.logo_path} alt="home-logo" />
          )}
        </div>
        <div className="flex items-center">
          <input
            className="w-6 h-6 p-2 text-slate-50 text-center bg-blue-900 rounded-l-lg"
            type="text"
            onChange={(e) => handleHome(e, game)}
            defaultValue={homeTeam.goal}
          />
          <div className="h-6 bg-blue-900 text-white flex items-center font-bold">
            -
          </div>
          <input
            className="w-6 h-6 text-slate-50 text-center bg-blue-900 rounded-r-lg"
            type="text"
            onChange={(e) => handleAway(e, game)}
            defaultValue={awayTeam.goal}
          />
        </div>
        <div className="p-2 flex items-center flex-1">
          {homeTeam.logo_path && (
            <img src={awayTeam.logo_path} alt="away-logo" />
          )}
          <span className="p-2 w-30 text-sm">{converted(awayTeam.name)}</span>
        </div>
      </div>
    </>
  );
};

Game = React.memo(Game);

export default Game;
