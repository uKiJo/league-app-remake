import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD7hHLN7B8V_3RqlMpnrrpYzuWTfH0VBP8',
  authDomain: 'ornate-crossbar-281715.firebaseapp.com',
  databaseURL: 'https://ornate-crossbar-281715.firebaseio.com',
  projectId: 'ornate-crossbar-281715',
  storageBucket: 'ornate-crossbar-281715.appspot.com',
  messagingSenderId: '899156833947',
  appId: '1:899156833947:web:f0d7c8e5fce4905326f83e',
  measurementId: 'G-MP1T71ETJM',
};

interface userAuth {
  id: number;
  uid: number;
  email: string;
  nickName: string;
}

export const createUserProfileDocument = async (userAuth: userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', `${userAuth.uid}`);

  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const { nickName, email } = userAuth;
    const createAt = new Date();
    console.log('no such document');

    try {
      await setDoc(userRef, {
        nickName,
        email,
        createAt,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return userRef;
};

// export const fetchPremierLeagueData = async () => {
//   const docRef = doc(db, 'data', 'premier league');

//   const docSnap = await getDoc(docRef);

//   return docSnap.data();
// };

// //add data to the database
// export const addData = async (data, docName) => {
//   try {
//     await setDoc(doc(db, 'data', docName), {
//       [docName]: data,
//       teams: [],
//     });
//     // await addDoc(collection(db, "data", docName), {
//     //   data: fetchedData
//     // })
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };
// //update database data
// export const updateData = async (data, docName) => {
//   try {
//     const leagueData = doc(db, 'data', 'premier league');

//     await updateDoc(leagueData, {
//       [docName]: data,
//     });
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };
// // add day in the database on saving after generation
// export const addFixture = async (
//   userAuth: userAuth,
//   data,
//   leagueName: string
// ) => {
//   try {
//     let existingName = false;

//     const querySnapshot = await getDocs(
//       collection(db, 'users', `${userAuth.uid}`, 'My Leagues')
//     );
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id);

//       if (doc.id === leagueName) {
//         existingName = true;
//       }
//     });

//     if (existingName) {
//       alert('league name already taken, please choose another name.');
//     } else {
//       await setDoc(
//         doc(db, 'users', `${userAuth.uid}`, 'My Leagues', `${leagueName}`),
//         { name: leagueName }
//       );

//       await data.map((el, index) => {
//         setDoc(
//           doc(
//             db,
//             'users',
//             `${userAuth.uid}`,
//             'My Leagues',
//             `${leagueName}`,
//             'fixture collection',
//             `day: ${index + 1}`
//           ),
//           {
//             id: index + 1,
//             data: el,
//           }
//         );
//       });
//     }
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };
// // update day in the database on input change
// export const updateFix = async (userAuth: userAuth, data, dayIdx, route) => {
//   try {
//     // const userData = doc(db, "users", `${userAuth.uid}`);
//     const myLeague = doc(
//       db,
//       'users',
//       `${userAuth.uid}`,
//       'My Leagues',
//       `${route}`,
//       'fixture collection',
//       `day: ${dayIdx + 1}`
//     );

//     console.log('dayidx', dayIdx);
//     console.log('route', route);

//     await updateDoc(myLeague, {
//       data: data,
//     });
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };

// export const addTable = async (userAuth: userAuth, tableData) => {
//   try {
//     await setDoc(
//       doc(
//         db,
//         'users',
//         `${userAuth.uid}`,
//         'My Leagues',
//         'League 1',
//         'table collection',
//         'table ranking'
//       ),
//       {
//         data: tableData,
//       }
//     );
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };

// export const updateTable = async (userAuth: userAuth, data, leagueName) => {
//   try {
//     await setDoc(
//       doc(db, 'users', `${userAuth.uid}`, 'My Leagues', `${leagueName}`),
//       {
//         table: data,
//       }
//     );
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };

// export const fetchLeagues = async (userAuth: userAuth) => {
//   try {
//     const myleagues = collection(db, 'users', `${userAuth.uid}`, 'My Leagues');
//     const querySnapshot = await getDocs(myleagues);

//     console.log(querySnapshot);

//     return querySnapshot.docs.map((doc) => doc.id);
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const fetchLeague = async (userAuth: userAuth, route) => {
//   const myLeague = collection(
//     db,
//     'users',
//     `${userAuth.uid}`,
//     'My Leagues',
//     `${route}`,
//     'fixture collection'
//   );

//   const querySnapshot = await getDocs(myLeague);

//   return querySnapshot.docs
//     .map((doc) => doc.data())
//     .sort((a, b) => a.id - b.id)
//     .map((doc) => doc.data); ///////////HERE!!!!!!!!!
// };

// export const fetchTable = async (userAuth: userAuth, league) => {
//   const table = doc(db, 'users', `${userAuth.uid}`, 'My Leagues', `${league}`);

//   const docSnap = await getDoc(table);

//   return (await docSnap).data();
// };

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();

export default app;
