import React from 'react';
import { View, StatusBar } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import Button from '../components/button';
import ProfileInfo from '../components/profile-info';
import { StyleSheet } from 'react-native';
import firebase from 'firebase';

function ProfileScreen({ navigation, user }) {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <ScreenContainer title="Profil">
      <ProfileInfo navigation={navigation} user={user} />
      <View style={{ ...styles.bottom, bottom: statusBarHeight + 10 }}>
        <Button title="Wyloguj" onPress={() => firebase.auth().signOut()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default ProfileScreen;
