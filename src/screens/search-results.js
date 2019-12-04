import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import SearchBar from '../components/search-bar';
import Club from '../components/club';

function SearchResultsScreen({ navigation }) {
  return (
    <ScreenContainer title="Wyniki wyszukiwania">
      <View>
        <SearchBar
          placeholder="Szukaj..."
          onSubmitEditing={() => navigation.navigate('SearchResults')}
        />
      </View>
      <View style={styles.clubsSection}>
        <Club />
        <Club />
        <Club />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  clubsSection: {
    marginVertical: 16,
  },
});

export default SearchResultsScreen;
