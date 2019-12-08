import React, { useEffect, useState } from 'react';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';

import SignUpScreen from './src/screens/sign-up';
import SignInScreen from './src/screens/sign-in';
import Navigation from './src/layout/bottom-navigation';
import LoadingStatus from './src/components/loading';
import fixTimeout from './src/timerFix';
import SearchResultsScreen from './src/screens/search-results';
import database from './src/api/database';
import storage from './src/api/storage';
import ClubDetailsScreen from './src/screens/club-details';
import CreateClubScreen from './src/screens/new-club';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fixTimeout();

    var firebaseConfig = {
      apiKey: 'AIzaSyA-07RYx1Xzvbvyf0OSEILlli3z1QbSQWY',
      authDomain: 'mobile-systems.firebaseapp.com',
      databaseURL: 'https://mobile-systems.firebaseio.com',
      projectId: 'mobile-systems',
      storageBucket: 'mobile-systems.appspot.com',
      messagingSenderId: '220061413588',
      appId: '1:220061413588:web:59c966e92a5f82781a4b41',
      measurementId: 'G-97EMD3MPEQ',
    };

    firebase.initializeApp(firebaseConfig);
    database.initialize(firebase.firestore());
    storage.initialize(firebase.storage());

    firebase.auth().onAuthStateChanged(authUser => {
      setUser(authUser ? authUser : null);
      setloading(false);
    });
  }, []);

  const AppContainer = getAppContainer({
    user: user,
  });

  if (loading) return <LoadingStatus />;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AppContainer />
      </ApplicationProvider>
    </>
  );
};

const getAppContainer = passedProps => {
  const Navigator = createStackNavigator(
    {
      SignUp: {
        screen: SignUpScreen,
      },
      SignIn: {
        screen: SignInScreen,
      },
      SearchResults: {
        screen: SearchResultsScreen,
      },
      CreateClub: {
        screen: CreateClubScreen,
      },
      ClubDetails: {
        screen: ClubDetailsScreen,
      },
      App: Navigation,
    },
    {
      initialRouteName: passedProps.user ? 'App' : 'SignIn',
      headerMode: 'none',
    },
  );

  return createAppContainer(Navigator);
};

export default App;
