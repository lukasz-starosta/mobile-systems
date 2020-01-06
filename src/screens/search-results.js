import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import SearchBar from '../components/search-bar';
import Club from '../components/club';
import database from '../api/database';
import LoadingStatus from '../components/loading';
import colors from '../constants/colors';
import { SEARCH_BY } from '../constants/types';

function SearchResultsScreen({ navigation }) {
  const { searchBy, value } = navigation.state.params;

  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      switch (searchBy) {
        case SEARCH_BY.NAME:
          setClubs(await database.getClubsByName(value));
          break;
        case SEARCH_BY.FACULTY:
          setClubs(await database.getClubsOfFaculty(value));
          break;
        case SEARCH_BY.CATEGORY:
          setClubs(await database.getClubsOfCategory(value));
          break;

        default:
          break;
      }
    };

    fetchClubs();
  }, []);

  if (!clubs) return <LoadingStatus />;

  const clubElements = clubs.map(club => (
    <Club club={club} key={club.uid} navigation={navigation} />
  ));

  const noResults = (
    <Text style={styles.noResults}>
      {`Nie znaleziono kół dla zapytania: ${value}`}
    </Text>
  );

  return (
    <ScreenContainer title="Wyniki wyszukiwania">
      <View>
        <SearchBar
          placeholder="Szukaj..."
          navigation={navigation}
          initialValue={searchBy === SEARCH_BY.NAME ? value : ''}
        />
      </View>
      <View style={styles.clubsSection}>
        {clubs.length > 0 ? clubElements : noResults}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  clubsSection: {
    marginVertical: 16,
  },
  noResults: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.politechnika,
  },
});

export default SearchResultsScreen;
