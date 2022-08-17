import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useFetchTableQuery } from '../../services/leagueApi';

import gsap from 'gsap';

import Spinner from '../Spinner/Spinner';

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
          <h2>Table</h2>
          <table
            ref={tableRef}
            className=" bg-white w-full rounded-sm drop-shadow-md p-2"
          >
            <tr>
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
            {data.table.map((team: any) => (
              <tr>
                <th>{data.table.indexOf(team) + 1}</th>
                <th className="team flex ">
                  {team.logo_path && <img src={team.logo_path} alt="logo" />}
                  <span>{team.name}</span>
                </th>
                <th>{team.w + team.d + team.l}</th>
                <th>{team.w}</th>
                <th>{team.d}</th>
                <th>{team.l}</th>
                <th>{team.goals}</th>
                <th>{team.ga}</th>
                <th>{team.goals - team.ga}</th>
                <th className="font-bold">{team.points}</th>
              </tr>
            ))}
          </table>
        </>
      )}
    </>
  );
};

export default Table;
