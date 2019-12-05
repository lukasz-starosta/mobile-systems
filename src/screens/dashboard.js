import React from 'react';
import ScreenContainer from '../layout/screen-container';
import CustomButton from '../components/button';
import { SectionTitle } from '../components/texts-containers';
import Post from '../components/post';
import Club from '../components/club';

function DashboardScreen({navigation}) {
  return (
    <ScreenContainer title="Tablica">
      <SectionTitle>Najnowsze ogłoszenia</SectionTitle>
      <Post clubName navigation={navigation}/>
      <Post clubName navigation={navigation}/>
      <SectionTitle>Proponowane koła</SectionTitle>
      <Club navigation={navigation}/>
      <Club navigation={navigation}/>
    </ScreenContainer>
  );
}

export default DashboardScreen;
