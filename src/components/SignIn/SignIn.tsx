import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import {
  fetchUserStart,
  setUser,
  fetchUserFail,
} from '../../redux/features/user/userSlice';

import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import { Link } from 'react-router-dom';

interface SignInProps {
  email: string;
  password: string;
  errorMessage?: string;
}

const SignIn: React.FC = () => {
  const [state, setState] = useState<SignInProps>({
    email: '',
    password: '',
    errorMessage: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchUserStart());
  //   const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const { email, uid } = user;
  //       const data = { email, uid };
  //       dispatch(setUser(data));
  //       navigate('/');
  //     } else {
  //       dispatch(fetchUserFail());
  //       console.log('no user logged in');
  //     }
  //   });

  //   return () => unsubscribeFromAuth();
  // }, [dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });

    console.log(state);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, errorMessage } = state;
    setLoading(!loading);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(!loading);
      setState({
        email: '',
        password: '',
      });
      navigate('/');
      console.log(`user signed in`);
    } catch {
      setError('Something went wrong, please try again!');
    }
    setLoading(false);
  };

  return (
    <div className="grid content-start h-screen mt-40">
      <div className="w-1/4 h-min p-14 m-auto bg-white drop-shadow-md rounded ">
        <h1 className="pb-5 text-3xl font-bold text-primary">
          Sign in to your account
        </h1>

        <div>
          <form onSubmit={handleSubmit}>
            <FormInput
              handleChange={handleChange}
              label="Email"
              name="email"
              type="email"
              value={state.email}
            />
            <FormInput
              handleChange={handleChange}
              label="Password"
              name="password"
              type="password"
              value={state.password}
            />
            {error && <p className="text-red-500 pb-3">{error}</p>}
            <CustomButton loading={loading} children="Sign in" />
          </form>
          <div className="mt-4">
            <span className="pr-2">Don't have an account?</span>
            <Link className="text-primary" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
