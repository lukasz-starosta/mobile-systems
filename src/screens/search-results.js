import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import SearchBar from '../components/search-bar';
import Club from '../components/club';
import database from '../api/database';
import LoadingStatus from '../components/loading';
import colors from '../constants/colors';

function SearchResultsScreen({ navigation }) {
  const { value } = navigation.state.params;

  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    const fetchClubsByName = async () => {
      setClubs(await database.getClubsByName(value));
    };
    fetchClubsByName();
  }, []);

  if (!clubs) return <LoadingStatus />;

  const clubElements = clubs.map(club => (
    <Club club={club} key={club.uid} navigation={navigation} />
  ));

  const noResults = (
    <Text style={styles.noResults}>
      {`Brak kół o nazwie zaczynającej się na "${value}"`}
    </Text>
  );

  return (
    <ScreenContainer title="Wyniki wyszukiwania">
      <View>
        <SearchBar
          placeholder="Szukaj..."
          navigation={navigation}
          initialValue={value}
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
