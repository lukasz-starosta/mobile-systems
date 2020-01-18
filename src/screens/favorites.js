import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import Club from '../components/club';
import CustomButton from '../components/button';
import LoadingStatus from '../components/loading';
import database from '../api/database';

function FavoritesScreen({ navigation, user }) {
  const statusBarHeight = StatusBar.currentHeight;

  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  const fetchData = async () => {
    setClubs(await database.getClubsOfUser(user.uid));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingStatus />;

  return (
    <ScreenContainer title="Moje koła">
      {clubs.map(club => (
        <Club club={club} key={club.uid} navigation={navigation} />
      ))}
      <View
        style={{
          ...styles.button,
          bottom: statusBarHeight + 10,
        }}>
        <CustomButton
          title="Załóż koło"
          onPress={() => {
            navigation.navigate('CreateClub', fetchData);
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
