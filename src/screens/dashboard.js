import React from 'react';
import { Text } from 'react-native-ui-kitten';
import { Button } from 'react-native';
import firebase from 'firebase';

function DashboardScreen() {
  return (
    <>
      <Text category="h4">Dashboard</Text>
      <Button
        title="Log out!"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
    </>
  );
}

export default DashboardScreen;
