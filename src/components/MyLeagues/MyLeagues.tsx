import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useFetchLeaguesQuery } from '../../services/leagueApi';
import SimpleButton from '../SimpleButton/SimpleButton';
import Spinner from '../Spinner/Spinner';

import { Link } from 'react-router-dom';
import Title from '../Title/Title';

const MyLeagues: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const { data, isLoading, isError, error, isSuccess } =
    useFetchLeaguesQuery(user);

  console.log(user);
  console.log(data);

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
          <div className="w-1/3">
            <Title content="My Leagues" backgroundColor="primary" />
          </div>
          <div className="w-1/3 bg-white rounded-sm drop-shadow-md">
            {data.map((league, index) => (
              <div
                className={`flex items-center p-4 ${
                  index % 2 === 0 ? 'bg-slate-50' : ''
                }`}
              >
                <div className="ml-4 grow">
                  <span className="text-sm text-gray-500">league name</span>
                  <h1 className="grow text-lg  ">{league}</h1>
                </div>

                <Link className="w-28 mr-4" to={`/myleagues/${league}`}>
                  <SimpleButton
                    content="Load"
                    styling="w-28 bg-secondary text-secondary_light hover:bg-secondary_light hover:text-secondary"
                  />
                </Link>
                <SimpleButton
                  content="Delete"
                  styling="w-28 text-secondary border-secondary border-2 hover:bg-slate-200"

                  // icon={<ArrowDownLeftIcon className="w-6" />}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyLeagues;
