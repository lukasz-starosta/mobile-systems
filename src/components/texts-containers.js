import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import colors from '../constants/colors';

export const ScreenTitle = ({ children }) => (
  <Text category="h2" style={styles.screenTitle}>
    {children}
  </Text>
);

export const SectionTitle = ({ children }) => (
  <Text category="h3" style={styles.sectionTitle}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3d3d3d',

    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.politechnika,

    paddingBottom: 8,
  },
});
