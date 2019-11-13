import React from 'react';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Navigation } from './src/layout/bottom-navigation';

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Navigation />
    </ApplicationProvider>
  </React.Fragment>
);

export default App;
