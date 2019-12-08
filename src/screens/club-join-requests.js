import React from 'react';
import UserAvatar from '../components/user-avatar';
import ScreenContainer from '../layout/screen-container';
import { SectionTitle } from '../components/texts-containers';

function ClubJoinRequestsScreen({ navigation }) {
  const { clubName } = navigation.state.params;

  return (
    <ScreenContainer title="Prośby o dołączenie">
      <SectionTitle>{clubName}</SectionTitle>
      <UserAvatar navigation={navigation} showIcons />
      <UserAvatar navigation={navigation} showIcons />
      <UserAvatar navigation={navigation} showIcons />
    </ScreenContainer>
  );
}

export default ClubJoinRequestsScreen;
