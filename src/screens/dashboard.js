import React from 'react';
import ScreenContainer from '../layout/screen-container';
import CustomButton from '../components/button';
import { SectionTitle } from '../components/texts-containers';
import Post from '../components/post';
import Club from '../components/club';

import database from '../api/database';

function DashboardScreen() {
  return (
    <ScreenContainer title="Tablica">
      <SectionTitle>Najnowsze ogłoszenia</SectionTitle>
      <Post />
      <Post />
      <SectionTitle>Proponowane koła</SectionTitle>
      <Club />
      <Club />
    </ScreenContainer>
  );
}

export default DashboardScreen;
