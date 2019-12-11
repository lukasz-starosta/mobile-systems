import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import Club from '../components/club';
import CustomButton from '../components/button';

function FavoritesScreen({ navigation }) {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <ScreenContainer title="Moje koła">
      <Club navigation={navigation} />
      <Club navigation={navigation} />
      <Club navigation={navigation} />
      <View
        style={{
          ...styles.button,
          bottom: statusBarHeight + 10,
        }}>
        <CustomButton
          title="Załóż koło"
          onPress={() => {
            navigation.navigate('CreateClub');
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default FavoritesScreen;
