import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserAvatar from '../components/user-avatar';
import ScreenContainer from '../layout/screen-container';
import { SectionTitle } from '../components/texts-containers';
import CustomButton from '../components/button';

function ClubMembersScreen({ navigation }) {
  const { clubName } = navigation.state.params;

  return (
    <>
      <ScreenContainer title="Członkowie">
        <SectionTitle>{clubName}</SectionTitle>
        <UserAvatar navigation={navigation} subtitle="Administrator" />
        <UserAvatar navigation={navigation} subtitle="członek" />
        <UserAvatar navigation={navigation} subtitle="członek" />
      </ScreenContainer>
      <View style={styles.floatingButton}>
        <CustomButton
          onPress={() => navigation.navigate('ClubJoinRequests', { clubName })}
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
