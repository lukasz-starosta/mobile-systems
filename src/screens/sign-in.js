import React from 'react';
import { View, Text, Button } from 'react-native';

const SignInScreen = ({handleSignIn}) => {
  return (
    <View>
      <Text>Welcome back!</Text>
      <Button title="Sign in!" onPress={() => {
        handleSignIn("itsdzefer@gmail.com", "dzeferos")
      }} />
    </View>
  );
};

export default SignInScreen;
