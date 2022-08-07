import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import {
  useFetchTableQuery,
  useUpdateTableMutation,
} from '../../services/leagueApi';

import gsap from 'gsap';

import Spinner from '../Spinner/Spinner';

import './Table.scss';

interface TableProps {}

const Table: React.FC<TableProps> = (props) => {
  const table = useSelector((state: RootState) => state.table.table);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const param = useParams();
  const league = param.leagueId;

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
          <table className=" bg-white w-full rounded-sm drop-shadow-md p-2">
            <tr>
              <th>Rank</th>
              <th className="team">Team</th>
              <th>Points</th>
            </tr>
            {data.table.map((team: any) => (
              <tr>
                <th>{data.table.indexOf(team) + 1}</th>
                <th className="team flex ">
                  <img className="mr-2" src={team.logo_path} alt="logo" />
                  <span className="font-medium">{team.name}</span>
                </th>
                <th>{team.points}</th>
              </tr>
            ))}
          </table>
        </>
      )}
    </>
  );
};

export default Table;
