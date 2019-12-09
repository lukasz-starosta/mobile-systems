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
  const { club, members, fetchMembers } = navigation.state.params;

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
          onPress={() =>
            navigation.navigate('ClubJoinRequests', {
              club,
              fetchMembers,
            })
          }
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
