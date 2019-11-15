import React from 'react';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignUpScreen from './src/screens/sign-up';
import SignInScreen from './src/screens/sign-in';
import Navigation from './src/layout/bottom-navigation';

const App = () => {
  const AppContainer = getAppContainer();

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
      SignUp: { screen: props => <SignUpScreen {...props} {...passedProps}/> },
      SignIn: { screen: props => <SignInScreen {...props} {...passedProps}/> },
      App: Navigation,
    },
    {
      initialRouteName: 'SignUp',
      headerMode: 'none',
    },
  );

  return createAppContainer(Navigator);
};

export default App;
