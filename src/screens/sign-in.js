import React from 'react';
import { View, Text, Button } from 'react-native';

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
    <View>
      <Text>Welcome back!</Text>
      <Button title="Sign in!" onPress={handleSignIn} />
      <Button
        title="Go sign up!"
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />
    </View>
  );
};

export default SignInScreen;
