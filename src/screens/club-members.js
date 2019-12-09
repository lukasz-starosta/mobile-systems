import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import UserAvatar from '../components/user-avatar';
import ScreenContainer from '../layout/screen-container';
import { SectionTitle } from '../components/texts-containers';
import CustomButton from '../components/button';
import database from '../api/database';
import { ClubStatus, ReadableClubStatus } from '../constants/types';
import LoadingStatus from '../components/loading';

function ClubMembersScreen({ navigation }) {
  const { club } = navigation.state.params;

  const [members, setMembers] = useState(null);
  useEffect(() => {
    async function fetchMembers() {
      setMembers(
        await database.getMembersOfClub(club.uid, [
          ClubStatus.ADMIN,
          ClubStatus.FOUNDER,
          ClubStatus.MEMBER,
        ]),
      );
    }

    fetchMembers();
  }, []);

  if (!members) return <LoadingStatus />;
  console.log(members[0]);
  return (
    <>
      <ScreenContainer title="Członkowie">
        <SectionTitle>{club.name}</SectionTitle>
        {members.map(member => (
          <UserAvatar
            navigation={navigation}
            user={member}
            subtitle={ReadableClubStatus[member.status]}
            key={member.uid}
          />
        ))}
      </ScreenContainer>
      <View style={styles.floatingButton}>
        <CustomButton
          onPress={() => navigation.navigate('ClubJoinRequests', { club })}
          title="Prośby o dołączenie"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClubMembersScreen;
