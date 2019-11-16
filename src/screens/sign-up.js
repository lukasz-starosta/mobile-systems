import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import firebase from 'firebase';
import colors from '../constants/colors';
import CustomButton from '../components/button';
import Form from '../components/form';

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword('itsdzefer@gmail.com', 'password')
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <View>
      <View style={styles.background}>
        <Image source={require('../images/background.png')} />
      </View>
      <View style={styles.logo}>
        <Image source={require('../images/logo.png')} />
      </View>
      <Form
        title="Rejestracja"
        button={{ title: 'Zarejestruj', onPress: handleSignUp }}
        link={{
          title: 'Logowanie',
          onPress: () => {
            navigation.navigate('SignIn');
          },
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>IMIE</Text>
            <TextInput style={{ ...styles.input, ...{ width: '95%' } }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>NAZWISKO</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View>
          <Text style={styles.label}>MAIL POLITECHNIKI</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>HASŁO</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>POTWIERDŹ HASŁO</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>WYDZIAŁ</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>KIERUNEK</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Zarejestruj" onPress={handleSignUp} />
        </View>
      </Form>
    </View>
  );
};

export default SignUpScreen;

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
  label: {
    color: colors.labelGrey,
    fontSize: 12,
  },
  input: {
    height: 30,
    fontSize: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.inputGrey,
    marginBottom: 15,
    paddingBottom: 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  logo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 45,
  },
});
