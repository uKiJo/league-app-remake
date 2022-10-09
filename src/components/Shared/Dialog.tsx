import React, {
  Fragment,
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TextInput from './TextInput';
import CustomButton from '../CustomButton/CustomButton';
import { useAddFixtureMutation } from '../../services/leagueApi';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { Fixture } from '../../utils/Fixture';
import { Table } from '../../utils/Table';
import { useNavigate } from 'react-router-dom';

// interface LeagueDetails {
//   data;

interface DataDetails {
  data: {
    logo_path: string;
    name: string;
  };

  teams: any;
}

interface DialogProps {
  isOpen: boolean;
  closeModal: () => void;

  leagueDetails: DataDetails;
}

const DialogComponent: React.FC<DialogProps> = ({
  isOpen,
  closeModal,
  leagueDetails,
}) => {
  const { name, logo_path } = leagueDetails.data;
  const [loading, setLoading] = useState();
  const [leagueName, setLeagueName] = useState<string>('bun');
  console.log(leagueDetails);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const navigate = useNavigate();

  const [addFixture, { isSuccess, isLoading }] = useAddFixtureMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/myleagues/${leagueName}`);
    }
    console.log('effetc!');
  }, [isSuccess]);

  const handleLeagueNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLeagueName(value);
  };

  const generateLeague = () => {
    const fixture = new Fixture(leagueDetails.teams);
    const table = new Table(leagueDetails.teams);

    const fixtureData = fixture.generate();
    const tableData = table.generate();

    const args = {
      userAuth: user,
      fixtureData: fixtureData,
      leagueName: leagueName,
      table: tableData,
    };

    addFixture(args);

    console.log(fixture.overallFixture);
    console.log(table.table);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generateLeague();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex items-center mb-4">
                      <img className="h-14 mr-4" src={logo_path} alt="logo" />
                      {name}
                    </div>
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <TextInput
                      label="League name"
                      placeholder="League Name"
                      handleChange={handleLeagueNameChange}
                    />
                    <div className="mt-4">
                      <CustomButton
                        children="Create League"
                        loading={isLoading}
                        styling="w-full bg-secondary text-secondary_light"
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DialogComponent;
