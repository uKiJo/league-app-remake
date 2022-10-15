import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { signOut, UserInfo } from 'firebase/auth';
import MenuDropDown from '../Shared/Menu/Menu-DropDown';
import { UserProps } from '../../redux/features/user/userSlice';

interface HeaderProps {
  currentUser: UserProps | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const list = ['Custom', 'Major'];

  console.log(navbarOpen);

  return (
    <div className="z-10 lg:flex bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-primary">
      <div className="flex ">
        <Link className="p-3 text-white text-lg font-bold flex-grow" to="/">
          Logo
        </Link>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          data-collapse-toggle="mobile-menu-2"
          type="button"
          className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          {/* <span className="sr-only">Open main menu</span> */}
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={
          'lg:flex lg:flex-row flex-grow items-center justify-end font-medium' +
          (navbarOpen ? ' flex flex-col' : ' hidden')
        }
      >
        {currentUser && (
          <>
            <Link
              className="text-white p-3 hover:bg-tertiary rounded"
              to="/myleagues"
            >
              My Leagues
            </Link>
            <MenuDropDown trigger="Create League" content={list} />
          </>
        )}

        {currentUser ? (
          <div
            className="p-3 text-white cursor-pointer hover:bg-tertiary rounded"
            onClick={() => {
              signOut(auth);
              navigate('/');
            }}
          >
            Sign out
          </div>
        ) : (
          <Link
            className="text-white p-3 hover:bg-btertiaryrounded"
            to="/signin"
          >
            Sign in
          </Link>
        )}

        {!currentUser && (
          <Link
            className="text-white p-3 hover:bg-tertiary rounded"
            to="signup"
          >
            Sign up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
