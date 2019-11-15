import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';

const SignUpScreen = () => {
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
      <Text>Hello potential user!</Text>
      <Button title="Sign up!" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
