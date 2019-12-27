import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import { Text, Avatar, Icon } from 'react-native-ui-kitten';
import CountTracker from '../components/count-tracker';
import CustomButton from '../components/button';
import colors from '../constants/colors';
import Post from '../components/post';
import LoadingStatus from '../components/loading';
import database from '../api/database';
import { ClubStatus } from '../constants/types';
import { withRoles } from '../api/roles-hoc';

async function fetchMemberStatus(club, user, setApplyButtonDisabled) {
  const members = await database.getMembersOfClub(club.uid, [
    ClubStatus.PENDING,
    ClubStatus.ADMIN,
    ClubStatus.FOUNDER,
    ClubStatus.MEMBER,
  ]);
  const findById = member => member.uid === user.uid;
  const isMemberAlready = typeof members.find(findById) !== 'undefined';

  if (isMemberAlready) setApplyButtonDisabled(true);
  else setApplyButtonDisabled(false);
}

const fetchMembersFun = (club, setMembers) => async () => {
  setMembers(
    await database.getMembersOfClub(club.uid, [
      ClubStatus.ADMIN,
      ClubStatus.FOUNDER,
      ClubStatus.MEMBER,
    ]),
  );
};

const ClubDetailsScreen = ({ navigation, user, founder, isAdmin }) => {
  const club = navigation.state.params;
  const name = (club && club.name) || 'Długa nazwa koła';
  const icon = (club && club.icon) || 'https://i.imgur.com/2y3Sm4x.jpg';
  const faculty = (club && club.faculty) || 'Jeszcze dłuższa nazwa wydziału';
  const description = (club && club.description) || '';
  const contact_email =
    (club && club.contact_email) || 'Brak maila kontaktowego.';
  const web_page = (club && club.web_page) || 'Brak strony internetowej.';
  const founder_info = founder.name + ' ' + founder.surname;

  const [applyButtonDisabled, setApplyButtonDisabled] = useState(true);
  const [applyInProgress, setApplyInProgress] = useState(false);
  const [members, setMembers] = useState(null);

  const fetchMembers = fetchMembersFun(club, setMembers);

  useEffect(() => {
    fetchMemberStatus(club, user, setApplyButtonDisabled);
    fetchMembers();
  }, []);

  const handleApply = async () => {
    setApplyInProgress(true);
    await database.addMember({
      club_id: club.uid,
      user_id: user.uid,
      status: 'pending',
    });
    await fetchMemberStatus(club, user, setApplyButtonDisabled);
    setApplyInProgress(false);
  };

  if (applyInProgress || !members) return <LoadingStatus />;

  return (
    <>
      <ScreenContainer scrollable styleProps={styles.screenContainer}>
        <View style={styles.header}>
          <Avatar
            style={styles.image}
            source={{
              uri: icon,
            }}
          />
          <View style={{ marginLeft: 5 }}>
            <View style={styles.counters}>
              <CountTracker
                title="członków"
                count={members.length}
                handlePress={() =>
                  navigation.navigate('ClubMembers', {
                    club,
                    members,
                    fetchMembers,
                    isAdmin,
                  })
                }
              />
              <CountTracker title="ogłoszeń" count="167" />
            </View>
            <CustomButton
              title="Aplikuj"
              disabled={applyButtonDisabled || applyInProgress}
              onPress={handleApply}
              styleProps={styles.button}
            />
          </View>
        </View>
        <View style={{ marginTop: 3 }}>
          <Text category="h5" style={styles.clubName}>
            {name}
          </Text>
          <Text category="h6" style={styles.facultyName}>
            {faculty}
          </Text>
          <Text style={{ marginTop: 5 }}>{description}</Text>
        </View>
        <View style={styles.floatingContainer}>
          <View style={styles.infoContainer}>
            <Icon
              name="person-outline"
              width={16}
              height={16}
              fill={colors.politechnika}
            />
            <Text style={styles.infoText}>{founder_info}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon
              name="email-outline"
              width={16}
              height={16}
              fill={colors.politechnika}
            />
            <Text style={styles.infoText}>{contact_email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon
              name="globe-outline"
              width={16}
              height={16}
              fill={colors.politechnika}
            />
            <Text style={styles.infoText}>{web_page}</Text>
          </View>
        </View>
        <Text category="h3" style={styles.postsHeader}>
          Najnowsze ogłoszenia
        </Text>
        <View style={{ marginBottom: 55 }}>
          <Post navigation={navigation} />
          <Post navigation={navigation} />
          <Post navigation={navigation} />
          <Post navigation={navigation} />
        </View>
      </ScreenContainer>
      {isAdmin && (
        <View style={styles.floatingButton}>
          <CustomButton
            title="Dodaj ogłoszenie"
            onPress={() => navigation.navigate('AddingPost', club)}
          />
        </View>
      )}
    </>
  );
};

export default withRoles(ClubDetailsScreen);

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
  },
  counters: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  image: {
    width: 108,
    height: 108,
    borderRadius: 10,
    marginRight: 8,
  },
  button: {
    width: 180,
    height: 35,
  },
  clubName: {
    fontWeight: 'bold',
  },
  facultyName: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
    color: colors.labelGrey,
  },
  floatingButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingContainer: {
    marginVertical: 10,
    marginHorizontal: 3,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowOpacity: 0.3,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 3,
    marginBottom: 2,
    fontWeight: 'bold',
    color: colors.labelGrey,
  },
  postsHeader: {
    color: colors.politechnika,
    fontWeight: '700',
  },
});
