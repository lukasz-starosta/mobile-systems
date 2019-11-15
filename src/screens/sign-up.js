import React from 'react';
import { View, Text, Button } from 'react-native';

const SignUpScreen = ({handleSignUp, user}) => {
  return (
    <View>
      <Text>{user ? `Hello ${user.email}` : 'Hello potential user!'}</Text>
      <Button title="Sign up!" onPress={() => {
        handleSignUp("itsdzefer@gmail.com", "dzeferos")
      }} />
    </View>
  );
};

export default SignUpScreen;
