import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useFetchLeaguesQuery } from '../../services/leagueApi';
import SimpleButton from '../SimpleButton/SimpleButton';
import Spinner from '../Spinner/Spinner';

import { Link } from 'react-router-dom';

interface MyLeaguesProps {}

const MyLeagues: React.FC<MyLeaguesProps> = (props) => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const { data, isLoading, error, isSuccess } = useFetchLeaguesQuery(user);

  console.log(user);
  console.log(data);

  return (
    <>
      {isLoading && (
        <div className="h-screen grid place-content-center bg-gray-200">
          <Spinner color="gray" size="12" />
        </div>
      )}
      {error && <div>somzthing went wrong</div>}
      {isSuccess && (
        <div className="h-screen grid content-center justify-items-center   bg-gray-100">
          <div>
            <h1 className="text-4xl mb-7 font-bold">My Leagues</h1>
          </div>
          <div className="w-1/3 bg-white rounded-sm drop-shadow-md">
            {data.map((league) => (
              <div className="flex items-center p-5 border-b border-gray-200">
                <h1 className="grow text-lg ml-4  text-gray-500">{league}</h1>
                <Link to={`/myleagues/${league}`}>
                  <SimpleButton content="Load" width="24" color="blue" />
                </Link>
                <SimpleButton content="Remove" width="24" color="red" />
                {/* <button
                  className={`bg-red-500 p-2 w-24 rounded font-bold text-white hover:bg-red-400 h-[42px] mr-2`}
                >
                  Remove
                </button> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyLeagues;
