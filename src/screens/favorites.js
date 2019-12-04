import React from 'react';
import ScreenContainer from '../layout/screen-container';
import Club from '../components/club';

function FavoritesScreen({navigation}) {
  return (
    <ScreenContainer title="Moje koła">
      <Club navigation={navigation}/>
      <Club navigation={navigation}/>
      <Club navigation={navigation}/>
    </ScreenContainer>
  );
}

export default FavoritesScreen;
