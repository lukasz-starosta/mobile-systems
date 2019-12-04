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
      <CustomButton
        title="test"
        onPress={() => {
          const test = async () => {
            const users = await database.getClubsOfUser(
              '217846@edu.p.lodz.pl',
              ['founder'],
            );

            console.log(users);
            // users.forEach(element => {
            //   console.log(element);
            // });

            // const user = await database.getUser('217846@edu.p.lodz.pl');

            // console.log(user);

            // await database.setUser({
            //   email: '256414@edu.p.lodz.pl',
            //   degree: 'test',
            //   faculty: 'test',
            //   name: 'testaczek',
            //   surname: 'wujaczek',
            // });
          };

          test();
        }}
      />
    </ScreenContainer>
  );
}

export default DashboardScreen;
