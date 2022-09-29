import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useFetchLeaguesQuery } from '../../services/leagueApi';
import SimpleButton from '../SimpleButton/SimpleButton';
import Spinner from '../Spinner/Spinner';

import { Link } from 'react-router-dom';
import Title from '../Title/Title';

interface MyLeaguesProps {}

const MyLeagues: React.FC<MyLeaguesProps> = (props) => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const { data, isLoading, isError, error, isSuccess } =
    useFetchLeaguesQuery(user);

  console.log(user);
  console.log(data);

  return (
    <>
      {isLoading && (
        <div className="h-screen grid place-content-center bg-gray-200">
          <Spinner color="gray" size="8" />
        </div>
      )}

      {error && <div>Something went wrong</div>}
      {isSuccess && (
        <div className="py-8 min-h-screen flex flex-col items-center bg-gray-100">
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
                    width="full"
                    bgColor="bg-primary"
                    hoverColor="hover:bg-secondary_light"
                    textColor="text-white"
                  />
                </Link>
                <SimpleButton
                  content="Delete"
                  width="28"
                  bgColor="bg-white"
                  hoverColor="hover:bg-slate-100"
                  textColor="text-primary"
                  borderColor="border-primary"
                  borderWidth="border-2"
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
