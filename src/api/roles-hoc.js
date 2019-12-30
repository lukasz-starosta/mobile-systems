import React, { useEffect, useState } from 'react';
import { ClubStatus } from '../constants/types';
import LoadingStatus from '../components/loading';
import database from './database';

export const withRoles = WrappedComponent => props => {
  const { navigation, user } = props;
  const club = navigation.state.params;
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [founder, setFounder] = useState(null);

  const isFounder = member => {
    return member.status === ClubStatus.FOUNDER;
  };

  const fetchAdmins = () => {
    const getAdmins = async () => {
      const admins = await database.getMembersOfClub(club.uid, [
        ClubStatus.ADMIN,
        ClubStatus.FOUNDER,
      ]);

      const founderUid = admins.find(isFounder).uid;

      setFounder(await database.getUser(founderUid));
      setIsAdmin(admins.some(member => member.uid === user.uid));
      setLoading(false);
    };
    getAdmins();
  };

  useEffect(fetchAdmins, []);

  if (loading) return <LoadingStatus />;

  return <WrappedComponent {...props} founder={founder} isAdmin={isAdmin} />;
};
