import React, { useState, MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import {
  useFetchLeaguesQuery,
  useDeleteLeagueMutation,
} from '../../services/leagueApi';
import SimpleButton from '../SimpleButton/SimpleButton';
import Spinner from '../Shared/Spinner/Spinner';

import { Link } from 'react-router-dom';
import Title from '../Shared/Title/Title';
import CustomButton from '../CustomButton/CustomButton';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import ListContainer from '../Shared/ListContainer/ListContainer';
import List from '../Shared/List/List';
import ListItem from '../Shared/ListItem/ListItem';

const MyLeagues: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [ind, setInd] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useFetchLeaguesQuery(user);

  const [
    deleteLeague,
    { isSuccess: deletionSuccess, isLoading: deletionLoading },
  ] = useDeleteLeagueMutation();

  const openDialog = (index: number) => {
    setIsDialogOpen(true);
    setInd(index);
    console.log(index);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteLeague = () => {
    if (data) {
      const args = {
        userAuth: user,
        leagueName: data[ind],
      };

      deleteLeague(args);
    }
  };

  useEffect(() => {
    if (deletionSuccess) {
      closeDialog();
    }
  }, [deletionSuccess]);

  const handleClick = () => {
    handleDeleteLeague();
  };

  const deleteDialogProps = {
    action: handleClick,
    isOpen: isDialogOpen,
    closeDialog: closeDialog,
    loading: deletionLoading,
  };

  if (isError) {
    throw error;
  }

  return (
    <>
      <div className="py-8 flex flex-col items-center bg-light-grey grow">
        <ListContainer listLength={data.length}>
          <>
            <Title content="My Leagues" styling="pb-6" />

            {isLoading && (
              <div className="flex grow items-center justify-center">
                <Spinner color="blue" size="8" />
              </div>
            )}

            {isSuccess && (
              <>
                {data.length === 0 ? (
                  <div className="flex grow items-center justify-center">
                    <h1 className="text-2xl font-bold text-dark-grey w-96">
                      You don’t have any league yet! go ahead and create your
                      own right now.
                    </h1>
                  </div>
                ) : (
                  <List>
                    <>
                      {data.map((league, index) => (
                        <ListItem key={index} index={index}>
                          <>
                            <div className="ml-4 grow">
                              <span className="text-sm text-gray-500">
                                league name
                              </span>
                              <h1 className="grow text-lg text-dark-grey">
                                {league}
                              </h1>
                            </div>

                            <Link className="w-28" to={`/myleagues/${league}`}>
                              <SimpleButton
                                content="Load"
                                styling="w-24 bg-primary text-white"
                              />
                            </Link>

                            <CustomButton
                              children="Delete"
                              type="button"
                              styling="w-24 bg-red-500 text-white hover:contrast-75 transition-all"
                              action={() => openDialog(index)}
                            />
                            <DeleteDialog {...deleteDialogProps} />
                          </>
                        </ListItem>
                      ))}
                    </>
                  </List>
                )}
              </>
            )}
          </>
        </ListContainer>
      </div>
    </>
  );
};

export default MyLeagues;
