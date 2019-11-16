import React from 'react';
import { Text, Layout } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../layout/screen-container';

function DashboardScreen() {
  return (
    <ScreenContainer>
      <Text category="h2">Tablica</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default DashboardScreen;
