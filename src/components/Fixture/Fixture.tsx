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
import { motion, AnimatePresence } from 'framer-motion';

import { RootState } from '../../redux/store';
import {
  useFetchFixtureQuery,
  useFetchTableQuery,
  useUpdateTableMutation,
  useUpdateFixtureMutation,
} from '../../services/leagueApi';
import { FixtureUpdater } from '../../utils/FixtureUpdater';
import { TableUpdater } from '../../utils/TableUpdater';

import Spinner from '../Shared/Spinner/Spinner';
import Game from '../Game/Game';

import './Fixture.scss';
import Title from '../Shared/Title/Title';

import Select from '../Shared/Select';
import ListContainer from '../Shared/ListContainer/ListContainer';
import List from '../Shared/List/List';
import ListItem from '../Shared/ListItem/ListItem';

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

  const [selectDay, setSelectDay] = useState('Day 1');
  const [homeScore, setHomeScore] = useState<string[]>([]);
  const [awayScore, setAwayScore] = useState<string[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(!show);
    }, 2000);
  }, []);

  const param = useParams();
  const league = param.leagueId;

  const args = {
    userAuth: user,
    league: league,
  };

  const { data, isLoading, isError, error, isSuccess } =
    useFetchFixtureQuery(args);
  const { data: table, isSuccess: tableFetched } = useFetchTableQuery(args);

  const [updateTable] = useUpdateTableMutation();
  const [updateFixture] = useUpdateFixtureMutation();

  useEffect(() => {
    gsap.fromTo(FixRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0 });
  }, [selectDay]);

  isSuccess && console.log(data);
  tableFetched && console.log(table);

  if (isSuccess) {
    var fixtureUpdater = new FixtureUpdater(data);
  }

  console.log('home', homeScore);
  console.log('away', awayScore);

  const handleHome = (
    event: ChangeEvent<HTMLInputElement>,
    game: FixtureShape
  ) => {
    const tableUpdater = new TableUpdater(game);

    const { value } = event.target;
    const arr = homeScore;

    arr[game.id] = value;
    setHomeScore(arr);

    const home = value;
    console.log(awayScore);
    const awayGoal = game.awayTeam.goal || awayScore[game.id];
    console.log(awayGoal, data, table);

    if (awayGoal && data && table) {
      // var fixtureUpdater = new FixtureUpdater(data);
      // debugger;
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
  };

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

      console.log(homeGoal, table, data);

      if (homeGoal && data && table) {
        // var fixtureUpdater = new FixtureUpdater(data);
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
        console.log('statement ran');
      }
    },
    []
  );

  if (isError) {
    throw error;
  }

  console.log(isSuccess, tableFetched);
  return (
    <div>
      {isLoading && (
        <div className="h-screen w-full grid place-content-center bg-gray-200">
          <Spinner color="gray" size="8" />
        </div>
      )}

      {isSuccess && tableFetched && (
        <div>
          <div className="pb-4 w-full">
            <Select
              items={data.map((day) => `Day ${data.indexOf(day) + 1}`)}
              selectDay={selectDay}
              setSelectDay={setSelectDay}
            />
          </div>

          <ListContainer styling="w-[520px]">
            <>
              <Title content="Fixture" styling="pb-6" icon="icon" />

              <List>
                <>
                  {data
                    .filter(
                      (day) => `Day ${data.indexOf(day) + 1}` === `${selectDay}`
                    )
                    .map((day, ind) => (
                      <div
                        key={ind}
                        className="rounded-b-sm bg-white drop-shadow-md overflow-hidden"
                      >
                        {day.map((game, id) => (
                          <ListItem
                            styling="p-2"
                            index={day.length - 1 === id}
                            key={id}
                          >
                            <>
                              <Game
                                key={game.id}
                                game={game}
                                handleHome={handleHome}
                                handleAway={handleAway}
                              />
                            </>
                          </ListItem>
                        ))}
                      </div>
                    ))}
                </>
              </List>
            </>
          </ListContainer>
        </div>
      )}
    </div>
  );
};

export default FixtureComponent;
