import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import NewPost from '../components/new-post';
import Button from '../components/button';

function AddingPostsScreen() {
  return (
    <ScreenContainer title="Nowe ogłoszenie">
       <NewPost />
      <View style={styles.bottom}>
      <Button title="Opublikuj"/>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    elevation: 16
  },
});

export default AddingPostsScreen;
