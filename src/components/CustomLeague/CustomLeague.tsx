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

import NumberInput from './children/NumberInput';
import Select from './children/Select';
import TextInput from './children/TextInput';

import { gsap } from 'gsap';
import { setFixture } from '../../redux/features/fixture/fixtureSlice';
import { setTable } from '../../redux/features/table/tableSlice';
import { storeTeams } from '../../redux/features/teams/teamsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  const [warning, setWarning] = useState<string>('');
  const errorRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generatesub = () => {
    const fixture = new Fixture(teams);
    const table = new Table(teams);
    isOnceOnly ? fixture.generateHomeFixture() : fixture.generate();
    table.generate();

    dispatch(setFixture(fixture.overallFixture));
    dispatch(setTable(table.table));
    dispatch(storeTeams(teams));
    navigate('/fix');

    console.log(fixture.overallFixture);
    console.log(table.table);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeamNum(+value);
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
    <div className="grid content-center h-full w-full my-10 ">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="m-auto bg-gray-800 p-6 rounded shadow-gray-300 md:w-1/3 sm:w-10/12">
          <TextInput label="League Name" placeholder="League name" />
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

          <button
            type="submit"
            className="bg-blue-500 p-2 mt-5 w-full rounded font-bold text-white hover:bg-blue-400 h-[42px]"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomLeague;
