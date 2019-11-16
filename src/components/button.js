import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 240,
    height: 50,
    backgroundColor: colors.politechnika,
    borderRadius: 30,
    shadowColor: colors.politechnika,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.31,
    elevation: 2,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center'
  },
});
