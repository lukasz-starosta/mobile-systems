import React, { useState, useEffect } from 'react';
import UserAvatar from '../components/user-avatar';
import ScreenContainer from '../layout/screen-container';
import { SectionTitle } from '../components/texts-containers';
import LoadingStatus from '../components/loading';
import database from '../api/database';
import { ClubStatus } from '../constants/types';

async function fetchJoinRequests(club, setJoinRequests) {
  setJoinRequests(
    await database.getMembersOfClub(club.uid, [ClubStatus.PENDING]),
  );
}

function ClubJoinRequestsScreen({ navigation }) {
  const { club, fetchMembers } = navigation.state.params;

  const [joinRequests, setJoinRequests] = useState(null);
  const [statusChangeInProgress, setStatusChangeInProgress] = useState(false);

  useEffect(() => {
    fetchJoinRequests(club, setJoinRequests);
  }, []);

  const updateMemberStatus = async (user, status) => {
    setStatusChangeInProgress(true);

    await database.updateMember(user.memberId, { status });
    await fetchJoinRequests(club, setJoinRequests);
    await fetchMembers();

    setStatusChangeInProgress(false);
  };

  const deleteMember = async user => {
    setStatusChangeInProgress(true);

    await database.deleteMember(user.memberId);
    await fetchJoinRequests(club, setJoinRequests);
    await fetchMembers();

    setStatusChangeInProgress(false);
  };

  const onAccept = user => {
    updateMemberStatus(user, ClubStatus.MEMBER);
  };

  const onDecline = user => {
    deleteMember(user);
  };

  if (!joinRequests || statusChangeInProgress) return <LoadingStatus />;

  return (
    <ScreenContainer title="Prośby o dołączenie">
      <SectionTitle>{club.name}</SectionTitle>
      {joinRequests.map(user => (
        <UserAvatar
          navigation={navigation}
          user={user}
          onAccept={() => onAccept(user)}
          onDecline={() => onDecline(user)}
          key={user.uid}
        />
      ))}
    </ScreenContainer>
  );
}

export default ClubJoinRequestsScreen;
