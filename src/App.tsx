import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Fixture from './components/Fixture/Fixture';
import Game from './components/Game/Game';
import SignIn from './components/SignIn/SignIn';
import Header from './components/Header/Header';
import FixtureComponent from './components/Fixture/Fixture';
import Overview from './pages/Overview';
// import { ReactComponent as Spinner } from './components/CustomButton/Spinner.svg';
import Spinner from './components/Spinner/Spinner';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { useNavigate, Route, Routes } from 'react-router-dom';

import type { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserStart,
  setUser,
  fetchUserFail,
} from './redux/features/user/userSlice';

import CustomLeague from './components/CustomLeague/CustomLeague';
import MyLeagues from './components/MyLeagues/MyLeagues';
import { divide } from 'ramda';

const App = React.memo(() => {
  let navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const loading = useSelector((state: RootState) => state.user.loading);

  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    dispatch(fetchUserStart());
    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        const data = { email, uid };
        dispatch(setUser(data));
        navigate('/');
      } else {
        dispatch(fetchUserFail());
        console.log('no user logged in');
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen grid place-content-center bg-gray-200">
          {/* <Spinner /> */}
          <Spinner color="gray" size="12" />
        </div>
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<Header currentUser={user} />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="create/custom" element={<CustomLeague />} />
            <Route path="myleagues" element={<MyLeagues />} />
            <Route path="myleagues/:leagueId" element={<Overview />} />

            <Route path="fix" element={<Overview />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />

            {/* <Route path="signup" element={<SignUp />} /> */}
          </Routes>
        </div>
      )}
    </>
  );
});
export default App;
