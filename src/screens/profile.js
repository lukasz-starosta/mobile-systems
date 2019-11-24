import React from 'react';
import { View } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import Button from '../components/button';
import ProfileInfo from '../components/profile-info';
import { StyleSheet } from 'react-native';
import firebase from 'firebase';

function ProfileScreen() {
  return (
    <ScreenContainer title="Profil">
      <ProfileInfo />
      <View style={styles.bottom}>
        <Button title="Wyloguj" style={styles.bottom} onPress={() => firebase.auth().signOut()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
});


export default ProfileScreen;
