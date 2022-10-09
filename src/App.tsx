import React, { useEffect, useState } from 'react';
import './App.css';

import SignIn from './components/SignIn/SignIn';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import FixtureComponent from './components/Fixture/Fixture';
import Overview from './pages/Overview';

import Spinner from './components/Shared/Spinner/Spinner';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';

import type { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserStart,
  setUser,
  fetchUserFail,
} from './redux/features/user/userSlice';

import CustomLeague from './components/CustomLeague/CustomLeague';
import MyLeagues from './components/MyLeagues/MyLeagues';
import Major from './components/Major/Major';

import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/Shared/ErrorFallback';

const App = React.memo(() => {
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
        <div className="App h-screen grid place-content-center bg-gray-200">
          <Spinner color="gray" size="10" />
        </div>
      ) : (
        <div className="App bg-gray-200">
          <Header currentUser={user} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="create/custom" element={<CustomLeague />} />
            <Route
              path="create/major"
              element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Major />
                </ErrorBoundary>
              }
            />
            <Route
              path="myleagues"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  resetKeys={[user]}
                >
                  <MyLeagues />
                </ErrorBoundary>
              }
            />
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
