import React from 'react';
import { Text, Layout } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../layout/screen-container';

import { SectionTitle } from '../components/texts-containers';
import Post from '../components/post';
import Club from '../components/club';

function DashboardScreen() {
  return (
    <ScreenContainer title="Tablica">
      <SectionTitle>Najnowsze ogłoszenia</SectionTitle>
      <Post />
      <Post />
      <SectionTitle>Proponowane koła</SectionTitle>
      <Club />
      <Club />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default DashboardScreen;
