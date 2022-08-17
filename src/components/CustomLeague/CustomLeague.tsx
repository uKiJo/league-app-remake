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

import { useSelector } from 'react-redux';

import NumberInput from './children/NumberInput';
import Select from './children/Select';
import TextInput from './children/TextInput';
import CustomButtom from '../CustomButton/CustomButton';

import { RootState } from '../../redux/store';

import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddFixtureMutation } from '../../services/leagueApi';

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

  const [addFixture] = useAddFixtureMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generatesub = () => {
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

    setTimeout(() => {
      setLoading(false);
      navigate(`/myleagues/${leagueName}`);
    }, 2000);

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
    generatesub();
  };

  useEffect(() => {
    const num: string[] = Array.from({ length: teamNum });
    num.length < 10 && setInputs(num);
    num.length < 4 || num.length > 10
      ? setWarning('The team number has to be between 4 and 10')
      : setWarning('');

    warning
      ? gsap.fromTo(
          errorRef.current,
          { y: 10, opacity: 1 },
          { y: 0, opacity: 1 }
        )
      : gsap.to(errorRef.current, { x: 0, opacity: 0 });

    console.log(warning);
  }, [teamNum, teams, warning]);

  useEffect(() => {}, []);

  console.log(isOnceOnly);

  return (
    <div className="grid content-center h-screen w-full my-10 ">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="m-auto bg-gray-800 p-6 rounded shadow-gray-300 md:w-1/3 sm:w-10/12">
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

          {inputs.map((_, index) => (
            <TextInput
              label={`Team ${index + 1}`}
              placeholder="Team name"
              handleChange={(event) => handleTeamsChange(index, event)}
            />
          ))}
          <CustomButtom children="Generate" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default CustomLeague;
