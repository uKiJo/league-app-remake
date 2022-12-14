import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
// import FormInput from '../FormInput/FormInput';
import { Fixture } from '../../utils/Fixture';
import { Table } from '../../utils/Table';

import { LayoutGroup, motion } from 'framer-motion';

import { useSelector } from 'react-redux';

import NumberInput from './children/NumberInput';
import Select from './children/Select';
import TextInput from '../Shared/TextInput';
import CustomButtom from '../CustomButton/CustomButton';
import Title from '../Shared/Title/Title';

import { RootState } from '../../redux/store';

import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useAddFixtureMutation } from '../../services/leagueApi';
import ListContainer from '../Shared/ListContainer/ListContainer';
import { AnimatePresence } from 'framer-motion';

interface CustomLeagueProps {}

interface Team {
  name: string;
  points?: number;
}

const CustomLeague: React.FC<CustomLeagueProps> = (props) => {
  const [teamNum, setTeamNum] = useState<number>(4);
  const [inputs, setInputs] = useState<string[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isOnceOnly, setIsOnceOnly] = useState<boolean>(false);
  const [leagueName, setLeagueName] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const errorRef = useRef(null);

  const user = useSelector((state: RootState) => state.user.currentUser);

  const [addFixture, { isSuccess, isLoading, isError }] =
    useAddFixtureMutation();
  const navigate = useNavigate();

  const generateLeague = () => {
    setLoading(true);
    const fixture = new Fixture(teams);
    const table = new Table(teams);
    const fixtureData = isOnceOnly
      ? fixture.generateHomeFixture()
      : fixture.generate();

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeamNum(+value);
  };

  const handleLeagueNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLeagueName(value);
  };

  const handleTeamsChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...teams];
    const { value } = event.target;
    values[index] = { name: value };
    setTeams(values);
  };

  const handleOptionChange = () => {
    setIsOnceOnly(!isOnceOnly);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generateLeague();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/myleagues/${leagueName}`);
    }
    console.log('effetc!');
  }, [isSuccess]);

  useEffect(() => {
    const num: string[] = Array.from({ length: teamNum });
    num.length <= 10 && setInputs(num);
    num.length < 4 || num.length > 10
      ? setWarning('The team number has to be between 4 and 10')
      : setWarning('');
    console.log(num.length);
    warning
      ? gsap.fromTo(
          errorRef.current,
          { y: 10, opacity: 1 },
          { y: 0, opacity: 1 }
        )
      : gsap.to(errorRef.current, { x: 0, opacity: 0 });

    console.log(warning);
  }, [teamNum, teams, warning]);

  return (
    <div className="bg-slate-100 flex justify-center p-8 grow">
      <form onSubmit={handleSubmit}>
        {/* <div className="m-auto bg-white p-6 rounded border border-stroke "> */}
        <ListContainer styling="w-[520px]">
          <>
            <Title content="Create Custom League" styling="mb-6" />
            <TextInput
              label="League Name"
              placeholder="League name"
              handleChange={handleLeagueNameChange}
            />
            <div className="grid gap-6 grid-cols-2 mt-2 mb-6">
              <div>
                <NumberInput
                  handleChange={handleChange}
                  label="Number of teams"
                  value={`${teamNum}`}
                />
                <div ref={errorRef} className="mt-2">
                  {warning ? (
                    <span className="text-red-500 pt-2">{warning}</span>
                  ) : null}
                </div>
              </div>

              <Select label="Meetings" handleChange={handleOptionChange} />
            </div>

            <AnimatePresence>
              {inputs.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{ opacity: 1, height: 'auto' }}
                  initial={{ opacity: 0, height: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TextInput
                    key={index}
                    label={`Team ${index + 1}`}
                    placeholder="Team name"
                    handleChange={(event) => handleTeamsChange(index, event)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            <CustomButtom
              children="Generate"
              loading={isLoading}
              styling="w-full bg-primary text-white z-10"
            />
            {isError && <div>Oops! something went wrong, please retry!</div>}
            {isLoading && <div>mutating...</div>}
          </>
        </ListContainer>
        {/* </div> */}
      </form>
    </div>
  );
};

export default CustomLeague;
