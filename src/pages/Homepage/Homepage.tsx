import React from 'react';

import './Homepage.scss';

import illustration from './illustration.svg';
import SimpleButton from '../../components/SimpleButton/SimpleButton';

function Homepage() {
  return (
    <div className="overflow-hidden bg min-h-screen flex justify-center ">
      <div className="flex w-1/2 h-96 mt-40">
        <div className="p-4 w-1/2">
          <h1 className="text-secondary grow  text-6xl font-bold mb-8">
            Create your own football league.
          </h1>
          <p className="grow text-xl w-96  my-8">
            Create your own custom league easily only within few clicks.
          </p>
          <SimpleButton
            content="Get Started"
            width="96"
            bgColor="bg-secondary"
            hoverColor="hover:bg-[#8FE3CF]"
            textColor="text-secondary_light"
          />
        </div>

        <img
          className="h-96 grow rounded-md drop-shadow-md "
          src={illustration}
          alt="stadium"
        />
      </div>
    </div>
  );
}

export default Homepage;
