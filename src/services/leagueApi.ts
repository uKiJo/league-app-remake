import {
  createApi,
  fakeBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import { db } from '../firebase/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { UserProps } from '../redux/features/user/userSlice';
import { table } from 'console';

interface Team {
  name: string;
  points?: number;
}

interface Game {
  homeTeam: { name: string; logo_path: string; goal: string };
  awayTeam: { name: string; logo_path: string; goal: string };
  id: number;
}

interface TableArgs {
  userAuth: UserProps | null;
  league: string | undefined;
  table?: Team[];
}

interface FixtureArgs {
  userAuth: UserProps | null;
  league: string | undefined;
  fixtureData?: Game[][];
  day?: number;
}

export const leagueApi = createApi({
  reducerPath: 'leagueApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Table'],
  endpoints: (build) => ({
    fetchLeagues: build.query({
      async queryFn(userAuth) {
        try {
          const myleagues = collection(
            db,
            'users',
            `${userAuth.uid}`,
            'My Leagues'
          );
          const querySnapshot = await getDocs(myleagues);
          console.log(querySnapshot);
          console.log(querySnapshot.docs.map((doc) => doc.id));
          return { data: querySnapshot.docs.map((doc) => doc.id) };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    fetchTable: build.query<any, TableArgs>({
      async queryFn(data) {
        const { userAuth, league } = data;
        try {
          if (userAuth) {
            const table = doc(
              db,
              'users',
              `${userAuth.uid}`,
              'My Leagues',
              `${league}`
            );
            console.log(table);
            const docSnap = await getDoc(table);

            console.log(docSnap);
            if (docSnap.exists()) {
              console.log('Document data:', docSnap.data());
            } else {
              console.log('No such document!');
            }

            return { data: docSnap.data() };
          } else {
            return {};
          }
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ['Table'],
    }),
    fetchFixture: build.query<Game[][], FixtureArgs>({
      async queryFn(data) {
        const { userAuth, league } = data;

        if (userAuth) {
          const fixture = collection(
            db,
            'users',
            `${userAuth.uid}`,
            'My Leagues',
            `${league}`,
            'fixture collection'
          );

          const querySnapshot = await getDocs(fixture);
          console.log(querySnapshot);

          return {
            data: querySnapshot.docs
              .map((doc) => doc.data())
              .sort((a, b) => a.id - b.id)
              .map((doc) => doc.data), ///////////HERE!!!!!!!!!
          };
        }
        return { error: 'no user Found:' };
      },
    }),
    updateTable: build.mutation<string, TableArgs>({
      async queryFn(data) {
        const { userAuth, league, table } = data;
        try {
          if (userAuth) {
            await setDoc(
              doc(db, 'users', `${userAuth.uid}`, 'My Leagues', `${league}`),
              {
                table: table,
              }
            );
          }

          return { data: 'ok' };
        } catch (e) {
          return { error: e };
        }
      },
      async onQueryStarted({ table, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          leagueApi.util.updateQueryData('fetchTable', data, (draft) => {
            console.log(draft, { ...data });
            Object.assign(draft, { table });
            // return { table };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateFixture: build.mutation<string, FixtureArgs>({
      async queryFn(data) {
        // debugger;
        const { userAuth, league, fixtureData, day } = data;
        console.log(userAuth, league, day);
        try {
          if (userAuth && typeof day === 'number' && fixtureData) {
            const fixture = doc(
              db,
              'users',
              `${userAuth.uid}`,
              'My Leagues',
              `${league}`,
              'fixture collection',
              `day: ${day + 1}`
            );
            console.log(fixture);
            await updateDoc(fixture, {
              data: fixtureData[day],
            });
          }
          return { data: 'mutated!' };
        } catch (e) {
          return { error: e };
        }
      },
      async onQueryStarted(
        { fixtureData, day, ...data },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          leagueApi.util.updateQueryData('fetchFixture', data, (draft) => {
            console.log(draft, { ...data });
            Object.assign(draft, fixtureData);
            // return { table };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchLeaguesQuery,
  useFetchTableQuery,
  useFetchFixtureQuery,
  useUpdateTableMutation,
  useUpdateFixtureMutation,
} = leagueApi;
