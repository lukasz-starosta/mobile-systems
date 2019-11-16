import React from 'react';
import { Text, Layout } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../layout/screen-container';

function DashboardScreen() {
  return (
    <ScreenContainer title="Tablica">
      <Text>wuja tablicka twoja</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default DashboardScreen;
