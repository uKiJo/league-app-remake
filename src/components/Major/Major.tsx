import React, { useEffect, useState, ChangeEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  useAddDataMutation,
  useFetchLeaguesDataQuery,
  useUpdateDataMutation,
  useAddFixtureMutation,
} from '../../services/leagueApi';
import SimpleButton from '../SimpleButton/SimpleButton';

import { Fixture } from '../../utils/Fixture';
import { Table } from '../../utils/Table';
import DialogComponent from '../Shared/Dialog';

import { entry } from './utils';
import Spinner from '../Spinner/Spinner';
import Title from '../Title/Title';

interface Team {
  name: string;
  points?: number;
}

interface MajorProps {}

const Major: React.FC<MajorProps> = (props) => {
  // const [addData] = useAddDataMutation();
  // const [updateData] = useUpdateDataMutation();

  // const [teams, setTeams] = useState([]);

  let [isDialogOpen, setIsDialogOpen] = useState(false);
  const [leagueIndex, setLeagueIndex] = useState(0);

  const user = useSelector((state: RootState) => state.user.currentUser);

  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } =
    useFetchLeaguesDataQuery('data');

  isSuccess && console.log(data);

  const closeModal = () => {
    setIsDialogOpen(false);
  };

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.parentNode?.children[1].textContent;

    const a = ['La Liga', 'Ligue 1', 'Premier League', 'Serie A', 'Bundesliga'];

    const ind = a.findIndex((e) => e === target);
    setLeagueIndex(ind);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-center p-6 grow">
      <div className="w-1/3">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Spinner color="gray" size="8" />
          </div>
        )}
        {isError && 'OOOPS'}
        {isSuccess && (
          <>
            <div className="w-full text-white rounded-sm drop-shadow-md bg-white">
              <Title content="Major Leagues" backgroundColor="primary" />
              {data.map((league: any, index: number) => (
                <div
                  className={`flex items-center p-4 ${
                    index % 2 === 0 ? 'bg-slate-50' : ''
                  }`}
                >
                  <div className="w-20 flex justify-center  p-2">
                    <img
                      className="h-14"
                      src={league.data.logo_path}
                      alt="logo"
                    />
                  </div>
                  <div className="text-xl font-bold text-primary pl-6 grow">
                    {league.data.name}
                  </div>
                  <SimpleButton
                    content="Create"
                    styling="w-48 bg-secondary text-secondary_light hover:bg-secondary_light hover:text-secondary"
                    onClick={openModal}
                  />
                </div>
              ))}
            </div>

            <DialogComponent
              isOpen={isDialogOpen}
              closeModal={closeModal}
              leagueDetails={data[leagueIndex]}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Major;
