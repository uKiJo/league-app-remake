import React, { useState, MouseEvent } from 'react';
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

      console.log(ind);

      deleteLeague(args);
    }
  };

  const handleClick = () => {
    handleDeleteLeague();
    if (deletionSuccess) {
      closeDialog();
    }
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
      {isLoading && (
        <div className="h-screen grid place-content-center bg-gray-200">
          <Spinner color="gray" size="8" />
        </div>
      )}

      {isSuccess && (
        <div className="py-8 flex flex-col items-center bg-gray-100 grow">
          <div
            className={`flex flex-col w-[520px] bg-white rounded border-stroke border ${
              data.length ? '' : 'h-[500px]'
            } `}
          >
            <Title content="My Leagues" styling="p-6" />

            <div className="p-6 grow flex items-center">
              <div className="flex justify-center items-center grow">
                {data.length === 0 ? (
                  <h1 className="text-2xl font-bold text-dark-grey w-96">
                    You don’t have any league yet! go ahead and create your own
                    right now.
                  </h1>
                ) : (
                  <div className="w-full bg-white rounded-sm border border-stroke">
                    {data.map((league, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-4  ${
                          index % 2 === 0 ? 'bg-slate-50' : ''
                        }`}
                      >
                        <div className="ml-4 grow">
                          <span className="text-sm text-gray-500">
                            league name
                          </span>
                          <h1 className="grow text-lg  ">{league}</h1>
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyLeagues;
