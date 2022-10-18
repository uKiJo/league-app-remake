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
import Spinner from '../Shared/Spinner/Spinner';
import Title from '../Shared/Title/Title';
import ListContainer from '../Shared/ListContainer/ListContainer';
import List from '../Shared/List/List';
import ListItem from '../Shared/ListItem/ListItem';

interface Team {
  name: string;
  points?: number;
}

interface MajorProps {}

const Major: React.FC<MajorProps> = (props) => {
  // const [addData] = useAddDataMutation();
  // const [updateData] = useUpdateDataMutation();

  // const [teams, setTeams] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    <>
      {isError && 'OOOPS'}

      <div className="py-8 flex flex-col items-center bg-light-grey grow">
        <ListContainer listLength={1}>
          <>
            <Title content="Major Leagues" styling="pb-6" />

            {isLoading && (
              <div className="flex grow items-center justify-center h-[500px]">
                <Spinner color="blue" size="8" />
              </div>
            )}

            {isSuccess && (
              <List>
                {data.map((league: any, index: number) => (
                  <ListItem key={index} index={index}>
                    <>
                      <div className="w-20 flex justify-center p-2">
                        <img
                          className="h-14"
                          src={league.data.logo_path}
                          alt="logo"
                        />
                      </div>
                      <div className="text-lg font-bold text-dark-grey pl-4 grow">
                        {league.data.name}
                      </div>
                      <SimpleButton
                        content="Create"
                        styling="w-24 bg-primary text-white hover:bg-indigo-700"
                        onClick={openModal}
                      />
                      <DialogComponent
                        isOpen={isDialogOpen}
                        closeModal={closeModal}
                        leagueDetails={data[leagueIndex]}
                      />
                    </>
                  </ListItem>
                ))}
              </List>
            )}
          </>
        </ListContainer>
      </div>
    </>
  );
};

export default Major;
