import React from 'react';
import { Text, Button } from 'react-native';
import firebase from 'firebase';
import ScreenContainer from '../layout/screen-container';

const SignInScreen = ({ navigation }) => {
  const handleSignIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword('itsdzefer@gmail.com', 'password')
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <ScreenContainer>
      <Text>Welcome back!</Text>
      <Button title="Sign in!" onPress={handleSignIn} />
      <Button
        title="Go sign up!"
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />
    </ScreenContainer>
  );
};

export default SignInScreen;
