import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  useAddDataMutation,
  useFetchLeaguesDataQuery,
  useUpdateDataMutation,
  useAddFixtureMutation,
} from '../../services/leagueApi';
import SimpleButton from '../SimpleButton/SimpleButton';

import { Fixture } from '../../utils/Fixture';
import { Table } from '../../utils/Table';

import { entry } from './utils';
import Spinner from '../Spinner/Spinner';
import Title from '../Title/Title';

interface Team {
  name: string;
  points?: number;
}

interface MajorProps {}

const Major: React.FC<MajorProps> = (props) => {
  const [addData] = useAddDataMutation();
  const [updateData] = useUpdateDataMutation();
  const [state, setState] = useState<Team[]>([]);
  // const [teams, setTeams] = useState([]);
  const [leagueName, setLeagueName] = useState<string>('bun');

  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } =
    useFetchLeaguesDataQuery('data');

  isSuccess && console.log(data);

  useEffect(() => {
    if (isSuccess) {
      setState(data);
    }
  }, []);

  const [addFixture] = useAddFixtureMutation();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const generateSub = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.parentNode?.children[1].textContent;

    const a = ['La Liga', 'Ligue 1', 'Premier League', 'Serie A', 'Bundesliga'];

    const ind = a.findIndex((e) => e === target);

    const fixture = new Fixture(data[ind].teams);
    const table = new Table(data[ind].teams);
    const fixtureData = fixture.generate();

    const tableData = table.generate();

    const args = {
      userAuth: user,
      fixtureData: fixtureData,
      leagueName: leagueName,
      table: tableData,
    };

    addFixture(args);

    // setTimeout(() => {
    //   // setLoading(false);
    //   navigate(`/myleagues/${leagueName}`);
    // }, 2000);

    console.log(fixture.overallFixture);
    console.log(table.table);
  };

  // isSuccess && console.log(entry(data.id, data.data));

  // console.log(bundesliga, ligue1);

  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': '787332a01amsh8a19fa466bb37dap10d779jsn9f392e3ac9f0',
  //       'X-RapidAPI-Host': 'football-pro.p.rapidapi.com',
  //     },
  //   };

  //   fetch('https://football-pro.p.rapidapi.com/api/v2.0/leagues/564', options)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response.data);
  //       const arg = {
  //         docName: 'la liga',
  //         league: response.data,
  //       };
  //       updateData(arg);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="w-1/3">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Spinner color="gray" size="8" />
          </div>
        )}
        {isError && 'OOOPS'}
        {isSuccess && (
          // <>
          //   <h1 className="text-3xl font-bold ml-3">My leagues</h1>
          //   {data.map((league: any) => (
          //     <div className="flex bg-primary  m-3 items-center rounded drop-shadow-md pr-4">
          //       <div className="w-28 flex justify-center bg-white p-2">
          //         <img
          //           className="h-20"
          //           src={league.data.logo_path}
          //           alt="logo"
          //         />
          //       </div>

          //       <div className="text-3xl font-bold text-secondary_light pl-6 grow">
          //         {league.data.name}
          //       </div>

          //       <SimpleButton
          //         content="Create"
          //         width="28"
          //         bgColor="bg-primary"
          //         hoverColor="hover:bg-secondary_light"
          //         textColor="text-white"
          //         generate={generateSub}
          //       />
          //     </div>
          //   ))}
          // </>
          <div className="w-full text-white rounded-sm drop-shadow-md bg-white">
            {/* <div className="text-black text-3xl font-bold text-center p-4">
              Major Leagues
            </div> */}
            <Title content="Major Leagues" backgroundColor="primary" />
            {data.map((league: any, index: number) => (
              <div
                className={`flex items-center p-4 ${
                  index % 2 === 0 ? 'bg-slate-50' : ''
                }`}
              >
                <div className="w-20 flex justify-center  p-2">
                  <img
                    className="h-14"
                    src={league.data.logo_path}
                    alt="logo"
                  />
                </div>
                <div className="text-xl font-bold text-primary pl-6 grow">
                  {league.data.name}
                </div>
                <SimpleButton
                  content="Create"
                  width="28"
                  bgColor="bg-primary"
                  hoverColor="hover:bg-secondary_light"
                  textColor="text-white"
                  generate={generateSub}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Major;
