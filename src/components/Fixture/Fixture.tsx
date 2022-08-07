import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../redux/store';
import {
  useFetchFixtureQuery,
  useFetchTableQuery,
  useUpdateTableMutation,
  useUpdateFixtureMutation,
} from '../../services/leagueApi';
import { FixtureUpdater } from '../../utils/FixtureUpdater';
import { TableUpdater } from '../../utils/TableUpdater';

import Spinner from '../Spinner/Spinner';

import Game from '../Game/Game';

interface FixtureShape {
  homeTeam: {
    name: string;
    logo_path?: string;
    goal: string;
  };
  awayTeam: {
    name: string;
    logo_path?: string;
    goal: string;
  };
  id: number;
}

const FixtureComponent = () => {
  // console.log('fixture updated');
  // const fixture = useSelector((state: RootState) => state.fixture.fixture);
  const user = useSelector((state: RootState) => state.user.currentUser);
  // let table = useSelector((state: RootState) => state.table.table);
  const [homeScore, setHomeScore] = useState<string[]>([]);
  const [awayScore, setAwayScore] = useState<string[]>([]);

  const [updateTable] = useUpdateTableMutation();
  const [updateFixture] = useUpdateFixtureMutation();

  const param = useParams();
  const league = param.leagueId;

  const args = {
    userAuth: user,
    league: league,
  };

  const { data, isLoading, error, isSuccess } = useFetchFixtureQuery(args);
  const { data: table, isSuccess: tableFetched } = useFetchTableQuery(args);

  isLoading && console.log('loading...');

  isSuccess && console.log(data);
  tableFetched && console.log(table);

  const dispatch = useDispatch();
  // const fixture = isSuccess && data;

  if (isSuccess) {
    var fixtureUpdater = new FixtureUpdater(data);
  }

  const handleHome = useCallback(
    (event: ChangeEvent<HTMLInputElement>, game: FixtureShape) => {
      const tableUpdater = new TableUpdater(game);
      const { value } = event.target;
      const arr = homeScore;

      arr[game.id] = value;
      setHomeScore(arr);

      const home = value;
      console.log(awayScore);

      if (game.awayTeam.goal && tableFetched) {
        const scoreStr = `${home}-${game.awayTeam.goal}`;
        const dayIdx = fixtureUpdater.getDayIdx(game);
        const updatedTable = tableUpdater.updatePropArray(
          table.table,
          dayIdx,
          scoreStr
        );
        const updatedFixture = fixtureUpdater.update(game, scoreStr);

        const args = {
          userAuth: user,
          league: league,
          table: updatedTable,
        };

        const FixArgs = {
          userAuth: user,
          league: league,
          fixtureData: updatedFixture,
          day: dayIdx,
        };

        updateTable(args);
        updateFixture(FixArgs);

        console.log('UPDATED fixture', updatedFixture);
        console.log('UPDATED TABLE', updatedTable);
      }
    },
    []
  );

  const handleAway = useCallback(
    (event: ChangeEvent<HTMLInputElement>, game: FixtureShape) => {
      const tableUpdater = new TableUpdater(game);
      const { value } = event.target;

      const arr = awayScore;
      // arr[game.id] = value;
      arr[game.id] = value;
      setAwayScore(arr);

      const away = value;

      if (game.homeTeam.goal && tableFetched) {
        console.log(table);
        const scoreStr = `${game.homeTeam.goal}-${away}`;
        const dayIdx = fixtureUpdater.getDayIdx(game);
        const updatedTable = tableUpdater.updatePropArray(
          table.table,
          dayIdx,
          scoreStr
        );

        const updatedFixture = fixtureUpdater.update(game, scoreStr);

        const args = {
          userAuth: user,
          league: league,
          table: updatedTable,
        };

        const FixArgs = {
          userAuth: user,
          league: league,
          fixtureData: updatedFixture,
          day: dayIdx,
        };

        updateTable(args);
        updateFixture(FixArgs);
        console.log('UPDATED TABLE', updatedTable);
      }
    },
    []
  );

  // console.log(table);

  return (
    <>
      {isLoading && (
        <div className="h-screen grid place-content-center bg-gray-200">
          <Spinner color="gray" size="12" />
        </div>
      )}

      {error && <div>something went wrong</div>}

      {isSuccess && (
        <>
          <div className="w-full">
            <h1>Fixture</h1>
            {data.map((day) => (
              <div className="border rounded-sm bg-white drop-shadow-md mb-2 p-2">
                <h2 className="font-bold text-center">
                  Day {data.indexOf(day) + 1}
                </h2>
                {day.map((game, id) => (
                  <Game
                    key={game.id}
                    game={game}
                    handleHome={handleHome}
                    handleAway={handleAway}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FixtureComponent;
