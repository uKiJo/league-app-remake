import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { auth } from '../../firebase/firebase';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';

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

      console.log(`user signed in`);
    } catch {
      setError('Something went wrong, please try again!');
    }
    setLoading(false);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-1/4 h-min p-8 m-auto bg-gray-800 rounded ">
        <h1 className="pb-5 text-white">Sign in</h1>

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
        </div>
      </div>
    </div>
  );
};

export default SignIn;
