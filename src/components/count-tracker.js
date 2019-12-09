import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import colors from '../constants/colors';

const CountTracker = ({ title, count, handlePress }) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 18,
    color: colors.labelGrey,
  },
  count: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.politechnika,
  },
});

export default CountTracker;
