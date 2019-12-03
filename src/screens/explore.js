import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import SearchBar from '../components/search-bar';
import Club from '../components/club';
import { SectionTitle } from '../components/texts-containers';
import Category from '../components/category';

function ExploreScreen() {
  return (
    <ScreenContainer title="Przeglądaj">
      <View>
        <SearchBar placeholder="Szukaj..." />
      </View>
      <View style={styles.clubsSection}>
        <SectionTitle>Proponowane</SectionTitle>
        <Club />
        <Club />
        <Club />
      </View>
      <View style={styles.categoriesSection}>
        <SectionTitle>Wydziały</SectionTitle>
        <ScrollView horizontal style={styles.categoriesContainer}>
          <Category categoryName={'Wydział'} />
          <Category categoryName={'Długi Wydział'} />
          <Category categoryName={'Bardzo długi Wydział'} />
          <Category categoryName={'Bardzo długi Wydział'} />
        </ScrollView>
      </View>
      <View style={styles.categoriesSection}>
        <SectionTitle>Kategorie</SectionTitle>
        <ScrollView horizontal style={styles.categoriesContainer}>
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
