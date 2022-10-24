import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useFetchTableQuery } from '../../services/leagueApi';

import gsap from 'gsap';

import Spinner from '../Shared/Spinner/Spinner';
import Title from '../Shared/Title/Title';

import './Table.scss';
import ListContainer from '../Shared/ListContainer/ListContainer';

interface TableProps {}

const Table: React.FC<TableProps> = (props) => {
  // const table = useSelector((state: RootState) => state.table.table);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const tableRef = useRef(null);

  const param = useParams();
  const league = param.leagueId;

  useEffect(() => {
    gsap.fromTo(tableRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0 });
  }, []);

  const args = {
    userAuth: user,
    league: league,
  };

  console.log(league);
  const { data, isLoading, error, isSuccess } = useFetchTableQuery(args);

  isSuccess && console.log(data.table);

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
          <ListContainer styling="w-full items-center">
            <>
              <Title content="Table" styling="mb-4" />
              <div className="grid grid-cols-12 gap-4 border border-stroke p-4 rounded mb-2 text-dark-grey text-sm bg-light-grey">
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
              <div className="border border-stroke p-4 rounded text-sm">
                {data.table.map((team: any, index: number) => (
                  <div className="grid grid-cols-12 gap-4 place-items-center text-dark-grey border-b border-slate-200">
                    <td className="pl-0">{data.table.indexOf(team) + 1}</td>
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
                    <td>{team.w + team.d + team.l}</td>
                    <td>{team.w}</td>
                    <td>{team.d}</td>
                    <td>{team.l}</td>
                    <td>{team.goals}</td>
                    <td>{team.ga}</td>
                    <td>{team.goals - team.ga}</td>
                    <td className="font-bold text-black">{team.points}</td>
                  </div>
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
