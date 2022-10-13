import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from '../firebase/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { UserProps } from '../redux/features/user/userSlice';

// interface League

interface Team {
  name: string;
  logo_path?: string;
  points?: number;
}

interface Game {
  homeTeam: { name: string; logo_path?: string; goal?: string };
  awayTeam: { name: string; logo_path: string; goal: string };
  id: number;
}

interface FixtureShape {
  homeTeam: { name?: string; logo_path?: string; goal?: string };
  awayTeam: { name?: string; logo_path?: string; goal?: string };
  id: number;
}

interface TableArgs {
  userAuth: UserProps | null;
  league: string | undefined;
  table?: Team[];
}

interface FixtureArgs {
  userAuth: UserProps | null;
  league?: string | undefined;
  day?: number;
  leagueName?: string;
}

interface FixtureMutationArgs {
  userAuth: UserProps | null;
  league?: string | undefined;
  fixtureData: FixtureShape[][];
  day?: number;
  leagueName?: string;
}

interface League {
  userAuth: UserProps | null;
  leagueName: string | undefined;
  table?: Team[];
  fixtureData?: FixtureShape[][];
}

export const leagueApi = createApi({
  reducerPath: 'leagueApi',
  baseQuery: fakeBaseQuery(),
  refetchOnReconnect: true,
  tagTypes: ['Table', 'League'],
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
          console.log(querySnapshot.empty);
          console.log(querySnapshot.docs.map((doc) => doc.id));

          // if (querySnapshot.empty) {
          //   throw Error('please check your network!');
          // }

          return { data: querySnapshot.docs.map((doc) => doc.id) };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ['League'],
    }),
    fetchLeaguesData: build.query<any, any>({
      async queryFn(data) {
        try {
          const leaguesData = collection(db, data); //TODO

          const querySnapshot = await getDocs(leaguesData);
          const major = [
            'la liga',
            'ligue 1',
            'premier league',
            'serie a',
            'bundesliga',
          ];

          const leagueData = major.map((league) => {
            return querySnapshot.docs
              .map((doc) => (doc.id === league ? doc.data() : null))
              .filter((l) => l !== null);
          });

          return {
            data: leagueData.flat(),
          };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    deleteLeague: build.mutation<string, League>({
      async queryFn(data) {
        const { userAuth, leagueName } = data;
        try {
          if (userAuth) {
            const table = doc(
              db,
              'users',
              `${userAuth.uid}`,
              'My Leagues',
              `${leagueName}`
            );

            await deleteDoc(table);
          }
          return { data: 'mutated' };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: ['League'],
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
            console.log(docSnap.exists());
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

        try {
          if (userAuth) {
            const fixture = collection(
              db,
              'users',
              `${userAuth.uid}`,
              'My Leagues', //TODO
              `${league}`,
              'fixture collection'
            );

            const querySnapshot = await getDocs(fixture);
            console.log(querySnapshot);

            if (querySnapshot.empty) {
              throw Error('please check your network!');
            }

            return {
              data: querySnapshot.docs
                .map((doc) => doc.data())
                .sort((a, b) => a.id - b.id)
                .map((doc) => doc.data),
            };
          } else {
            return {};
          }
        } catch (e) {
          return { error: e };
        }
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
    updateFixture: build.mutation<string, FixtureMutationArgs>({
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
    addFixture: build.mutation<string, League>({
      async queryFn(data) {
        const { userAuth, fixtureData, leagueName, table } = data;
        try {
          if (userAuth) {
            let existingName = false;
            const querySnapshot = await getDocs(
              collection(db, 'users', `${userAuth.uid}`, 'My Leagues')
            );

            querySnapshot.forEach((doc) => {
              if (doc.id === leagueName) {
                existingName = true;
              }
            });

            if (existingName) {
              alert('league name already taken, please choose another name.');
            } else {
              await setDoc(
                doc(
                  db,
                  'users',
                  `${userAuth.uid}`,
                  'My Leagues',
                  `${leagueName}`
                ),
                { name: leagueName }
              );
              if (fixtureData)
                await fixtureData.map(async (el, index) => {
                  setDoc(
                    doc(
                      db,
                      'users',
                      `${userAuth.uid}`,
                      'My Leagues',
                      `${leagueName}`,
                      'fixture collection',
                      `day: ${index + 1}`
                    ),
                    {
                      id: index + 1,
                      data: el,
                    }
                  );
                });
              await setDoc(
                doc(
                  db,
                  'users',
                  `${userAuth.uid}`,
                  'My Leagues',
                  `${leagueName}`
                ),
                {
                  table: table,
                }
              );
            }
          }
          return { data: 'mutated!' };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: ['Table', 'League'],
      async onQueryStarted(
        { fixtureData, ...data },
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
    addData: build.mutation<string, any>({
      async queryFn(data) {
        const { docName, teams } = data;
        try {
          await setDoc(doc(db, 'data', docName), {
            // [docName]: data,
            teams: teams,
          });
          return { data: 'mutated' };
          // await addDoc(collection(db, "data", docName), {
          //   data: fetchedData
          // })
        } catch (e) {
          return { error: e };
        }
      },
    }),
    updateData: build.mutation<string, any>({
      async queryFn(data) {
        const { docName, league } = data;
        try {
          const leagueData = doc(db, 'data', docName);

          await updateDoc(leagueData, {
            data: league,
          });
          return { data: 'mutated' };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const {
  useFetchLeaguesQuery,
  useFetchLeaguesDataQuery,
  useFetchTableQuery,
  useFetchFixtureQuery,
  useUpdateTableMutation,
  useUpdateFixtureMutation,
  useAddFixtureMutation,
  useAddDataMutation,
  useUpdateDataMutation,
  useDeleteLeagueMutation,
} = leagueApi;
