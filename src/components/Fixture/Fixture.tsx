import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import gsap from 'gsap';

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

import './Fixture.scss';
import Title from '../Title/Title';

interface FixtureShape {
  homeTeam: {
    name?: string;
    logo_path?: string;
    goal?: string;
  };
  awayTeam: {
    name: string;
    logo_path?: string;
    goal: string;
  };
  id: number;
}

const FixtureComponent = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const FixRef = useRef(null);

  const [homeScore, setHomeScore] = useState<string[]>([]);
  const [awayScore, setAwayScore] = useState<string[]>([]);

  const param = useParams();
  const league = param.leagueId;

  const args = {
    userAuth: user,
    league: league,
  };

  const { data, isLoading, isError, isSuccess } = useFetchFixtureQuery(args);
  const { data: table, isSuccess: tableFetched } = useFetchTableQuery(args);

  const [updateTable] = useUpdateTableMutation();
  const [updateFixture] = useUpdateFixtureMutation();

  useEffect(() => {
    gsap.fromTo(FixRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0 });
  }, []);

  isSuccess && console.log(data);
  tableFetched && console.log(table);

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
      const awayGoal = game.awayTeam.goal || awayScore[game.id];

      if (awayGoal && tableFetched && isSuccess) {
        debugger;
        const scoreStr = `${home}-${awayGoal}`;
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
      arr[game.id] = value;
      setAwayScore(arr);

      const away = value;
      console.log(homeScore);

      const homeGoal = game.homeTeam.goal || homeScore[game.id];
      console.log(homeGoal);

      if (homeGoal && tableFetched && isSuccess) {
        console.log(table);
        const scoreStr = `${homeGoal}-${away}`;
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

  return (
    <>
      {isLoading && (
        <div className="h-screen grid place-content-center bg-gray-200">
          <Spinner color="gray" size="12" />
        </div>
      )}

      {isError && <div>something went wrong</div>}

      {isSuccess && (
        <>
          <div className="w-full">
            <Title content="Fixture" backgroundColor="secondary" icon="icon" />
            <div ref={FixRef}>
              {data.map((day) => (
                <div className="rounded-b-sm bg-white drop-shadow-md mb-4 overflow-hidden">
                  <h2 className="font-bold text-center bg-primary text-white p-2">
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
          </div>
        </>
      )}
    </>
  );
};

export default FixtureComponent;
