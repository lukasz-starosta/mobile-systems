import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import NewPost from '../components/new-post';
import Button from '../components/button';

function AddingPostsScreen() {
  return (
    <ScreenContainer title="Nowe ogłoszenie">
      <View style={{ paddingBottom: 35 }}>
        <NewPost />
        <View style={styles.bottom}>
          <Button title="Opublikuj" />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  bottom: {
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
    elevation: 16,
  },
});

export default AddingPostsScreen;
