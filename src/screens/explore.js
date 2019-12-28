import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import SearchBar from '../components/search-bar';
import Club from '../components/club';
import { SectionTitle } from '../components/texts-containers';
import Category from '../components/category';
import database from '../api/database';
import LoadingStatus from '../components/loading';
import { faculties } from '../constants/faculties';
import Faculty from '../components/faculty';

function ExploreScreen({ navigation, user }) {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setClubs(await database.getClubsOfFaculty(user.faculty));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingStatus />;

  return (
    <ScreenContainer title="Przeglądaj" scrollable>
      <View>
        <SearchBar placeholder="Szukaj..." navigation={navigation} />
      </View>
      <View style={styles.clubsSection}>
        <SectionTitle>Proponowane</SectionTitle>
        {clubs.slice(0, 3).map(club => (
          <Club club={club} key={club.uid} navigation={navigation} />
        ))}
      </View>
      <View style={styles.categoriesSection}>
        <SectionTitle>Wydziały</SectionTitle>
        <ScrollView style={styles.categoriesContainer}>
          {faculties.map(faculty => (
            <Faculty
              faculty={faculty}
              key={faculty.abbr}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.categoriesSection}>
        <SectionTitle>Kategorie</SectionTitle>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}>
          <Category categoryName={'Informatyka'} />
          <Category categoryName={'Nadrutach dzierganie'} />
          <Category categoryName={'Drogi panie marianie'} />
          <Category categoryName={'Jak przeskrolóje'} />
          <Category categoryName={'Toco siestanie'} />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  clubsSection: {
    marginVertical: 16,
  },
  categoriesSection: {},
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});

export default ExploreScreen;
