import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import { SectionTitle } from '../components/texts-containers';
import Post from '../components/post';
import Club from '../components/club';
import database from '../api/database';
import LoadingStatus from '../components/loading';
import { ClubStatus } from '../constants/types';

function DashboardScreen({ navigation, user }) {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const [posts, setPosts] = useState([]);

  const orderPosts = array => {
    return array
      .slice()
      .sort((a, b) =>
        a.created_at < b.created_at ? 1 : b.created_at < a.created_at ? -1 : 0,
      );
  };

  const fetchPosts = async () => {
    const userClubs = await database.getClubsOfUser(user.uid, [
      ClubStatus.ADMIN,
      ClubStatus.FOUNDER,
      ClubStatus.MEMBER,
    ]);

    const _posts = [];

    for (let i = 0; i < userClubs.length; i++) {
      const result = await database.getPostsWhere(
        'club_id',
        '==',
        userClubs[i].uid,
      );

      const expandedPosts = result.map(post => {
        return { ...post, clubName: userClubs[i].name };
      });

      _posts.push(...expandedPosts);
    }

    setPosts(await orderPosts(_posts));
  };

  useEffect(() => {
    const fetchData = async () => {
      setClubs(await database.getClubsOfFaculty(user.faculty));
      fetchPosts();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingStatus />;

  return (
    <ScreenContainer title="Tablica" scrollable>
      <SectionTitle>Najnowsze ogłoszenia</SectionTitle>
      {posts.length > 0 ? (
        posts.slice(0,3).map(post => (
          <Post key={post.uid} navigation={navigation} post={post} />
        ))
      ) : (
        <Text>Nie jesteś członkiem żadnych kół</Text>
      )}
      <SectionTitle>Proponowane koła</SectionTitle>
      {clubs.slice(0, 3).map(club => (
        <Club club={club} key={club.uid} navigation={navigation} />
      ))}
    </ScreenContainer>
  );
}

export default DashboardScreen;
