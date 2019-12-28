import React, { useEffect, useState } from 'react';
import ScreenContainer from '../layout/screen-container';
import CustomButton from '../components/button';
import { SectionTitle } from '../components/texts-containers';
import Post from '../components/post';
import Club from '../components/club';
import database from '../api/database';
import LoadingStatus from '../components/loading';

function DashboardScreen({ navigation, user }) {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setClubs(await database.getClubsOfFaculty(user.faculty));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingStatus />;

  return (
    <ScreenContainer title="Tablica" scrollable>
      <SectionTitle>Najnowsze ogłoszenia</SectionTitle>
      <Post clubName navigation={navigation} />
      <Post clubName navigation={navigation} />
      <SectionTitle>Proponowane koła</SectionTitle>
      {clubs.map(club => (
        <Club club={club} key={club.uid} navigation={navigation} />
      ))}
    </ScreenContainer>
  );
}

export default DashboardScreen;
