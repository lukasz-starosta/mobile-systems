import React from 'react';
import ScreenContainer from '../layout/screen-container';
import Club from '../components/club';

function FavoritesScreen() {
  return (
    <ScreenContainer title="Moje koła">
      <Club />
      <Club />
      <Club />
    </ScreenContainer>
  );
}

export default FavoritesScreen;
