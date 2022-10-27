import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useFetchTableQuery } from '../../services/leagueApi';

import { motion } from 'framer-motion';

import { map, sortBy, prop } from 'ramda';

import Spinner from '../Shared/Spinner/Spinner';
import Title from '../Shared/Title/Title';

import './Table.scss';
import ListContainer from '../Shared/ListContainer/ListContainer';
import SimpleButton from '../SimpleButton/SimpleButton';

const Table: React.FC = () => {
  // const table = useSelector((state: RootState) => state.table.table);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [filter, setFilter] = useState('0');
  const [table, setTable] = useState<any[]>([]);

  useEffect(() => {
    const overallTable = updatedTable(0);
    setTable(overallTable);
  }, []);

  const param = useParams();
  const league = param.leagueId;

  const args = {
    userAuth: user,
    league: league,
  };

  console.log(league);
  const { data, isLoading, error, isSuccess } = useFetchTableQuery(args);

  isSuccess && console.log(data.table);

  const updatedTable = (index: number) => {
    const rankItem = (x: any) => {
      return { ...x, rank: x.rank[index] };
    };

    const c = map(rankItem, data.table);

    const sortByRankItem = sortBy(prop('rank'));
    return sortByRankItem(c).reverse();
  };

  const filterHome = () => {
    setFilter('1');
    const homeTable = updatedTable(1);
    setTable(homeTable);
  };

  const filterAway = () => {
    setFilter('2');
    const awayTable = updatedTable(2);
    setTable(awayTable);
  };

  const filterAll = () => {
    setFilter('0');
    const overallTable = updatedTable(0);
    setTable(overallTable);
  };

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
          <div className="flex mb-4">
            <SimpleButton
              content="All"
              styling="w-24 bg-white text-dark-grey border border-stroke shadow hover:bg-medium-grey"
              onClick={filterAll}
            />
            <SimpleButton
              content="Home"
              styling="w-24 bg-white text-dark-grey border border-stroke shadow hover:bg-medium-grey"
              onClick={filterHome}
            />
            <SimpleButton
              content="Away"
              styling="w-24 bg-white text-dark-grey border border-stroke shadow hover:bg-medium-grey"
              onClick={filterAway}
            />
          </div>

          <ListContainer role="table" styling="w-full items-center">
            <>
              <Title content="Table" styling="mb-4" />
              <div role="rowgroup">
                <div
                  role="row"
                  className="grid grid-cols-12 gap-4 border border-stroke p-4 rounded mb-2 text-dark-grey text-sm bg-light-grey"
                >
                  <th>Rank</th>
                  <th className="team col-span-3 text-start">Team</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Drawn</th>
                  <th>Lost</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Points</th>
                </div>
              </div>

              <div
                role="rowgroup"
                className="border border-stroke p-4 rounded text-sm"
              >
                {table.map((team: any, index: number) => (
                  <motion.div
                    layout
                    transition={{ ease: 'easeInOut', duration: 0.5 }}
                    key={team.name}
                    role="row"
                    className={`grid grid-cols-12 gap-4 place-items-center text-dark-grey ${
                      table.length - 1 === index
                        ? ''
                        : 'border-b border-slate-200'
                    } `}
                  >
                    <td className="pl-0">{table.indexOf(team) + 1}</td>
                    <td className="team flex items-center col-span-3">
                      {team.logo_path && (
                        <img
                          className="pr-4 h-8"
                          src={team.logo_path}
                          alt="logo"
                        />
                      )}
                      <span>{team.name}</span>
                    </td>
                    <td>{team.w[filter] + team.d[filter] + team.l[filter]}</td>
                    <td>{team.d[filter]}</td>
                    <td>{team.w[filter]}</td>
                    <td>{team.l[filter]}</td>
                    <td>{team.goals[filter]}</td>
                    <td>{team.ga[filter]}</td>
                    <td>{team.goals[filter] - team.ga[filter]}</td>
                    <td className="font-bold text-black">
                      {team.points[filter]}
                    </td>
                  </motion.div>
                ))}
              </div>
            </>
          </ListContainer>
        </>
      )}
    </>
  );
};

export default Table;
