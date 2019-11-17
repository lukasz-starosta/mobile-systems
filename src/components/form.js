import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import colors from '../constants/colors';
import CustomButton from '../components/button';

const Form = ({ children, title, button, link }) => {
  return (
    <>
      <View>
        <View style={styles.formContainer}>
          <Text style={styles.header}>{title}</Text>
          {children}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title={button.title} onPress={button.onPress} />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={link.onPress}>
        <View style={styles.link}>
          <Text>{link.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 40,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 35,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
    color: colors.politechnika,
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 1
  },
  link: {
    alignItems: 'center',
    marginTop: 45,
  },
});
