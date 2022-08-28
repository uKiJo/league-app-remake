import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useFetchTableQuery } from '../../services/leagueApi';

import gsap from 'gsap';

import Spinner from '../Spinner/Spinner';
import Title from '../Title/Title';

import './Table.scss';

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
          <Title content="Table" backgroundColor="secondary" icon="tab-icon" />
          <table
            ref={tableRef}
            className=" overflow-hidden bg-white w-full rounded-b-sm drop-shadow-md p-2"
          >
            <thead className="overflow-hidden font-bold">
              <tr className="bg-primary text-white text-sm">
                <th>Rank</th>
                <th className="team">Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Drawn</th>
                <th>Lost</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {data.table.map((team: any, index: number) => (
                <tr
                  className={`${
                    index === 0 || index === 3 || index === 4 || index === 16
                      ? 'border-b border-slate-300'
                      : 'border-b border-slate-[#e8e8e8]'
                  }
                   text-sm`}
                >
                  <td>{data.table.indexOf(team) + 1}</td>
                  <td className="team flex items-center">
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
                  <td className="font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Table;
