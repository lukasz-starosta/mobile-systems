import React from 'react';
import { View, Text, Layout } from 'react-native-ui-kitten';
import ScreenContainer from '../layout/screen-container';
import Button from '../components/button';
import ProfileInfo from '../components/profile-info';
import { StyleSheet } from 'react-native';



function ProfileScreen() {
  return (
    <ScreenContainer title="Profil">
      <ProfileInfo />
      <Button title="Wyloguj" styles={styles.bottom}></Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0
  },
});

export default ProfileScreen;
