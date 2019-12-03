import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout } from 'react-native-ui-kitten';
import ScreenContainer from '../layout/screen-container';
import SearchBar from '../components/search-bar';

function ExploreScreen() {
  return (
    <ScreenContainer title="Przeglądaj">
      <Layout>
        <SearchBar placeholder="Szukaj..." />
      </Layout>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});

export default ExploreScreen;
