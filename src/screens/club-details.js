import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import { Text, Avatar, Icon } from 'react-native-ui-kitten';
import CountTracker from '../components/count-tracker';
import CustomButton from '../components/button';
import colors from '../constants/colors';
import Post from '../components/post';

const ClubDetailsScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Avatar
          style={styles.image}
          source={{
            uri: 'https://i.imgur.com/2y3Sm4x.jpg',
          }}
        />
        <View style={{ marginLeft: 5 }}>
          <View style={styles.counters}>
            <CountTracker title="członków" count="321" />
            <CountTracker title="ogłoszeń" count="167" />
          </View>
          <CustomButton title="Aplikuj" styleProps={styles.button} />
        </View>
      </View>
      <View style={{ marginTop: 3 }}>
        <Text category="h5" style={styles.clubName}>
          Długa nazwa koła
        </Text>
        <Text category="h6" style={styles.facultyName}>
          Jeszcze dłuższa nazwa wydziału.
        </Text>
        <Text style={{ marginTop: 5 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </View>
      <View style={styles.floatingContainer}>
        <View style={styles.infoContainer}>
          <Icon
            name="person-outline"
            width={16}
            height={16}
            fill={colors.politechnika}
          />
          <Text style={styles.infoText}>Krzysztof Komarski (Mosquitio)</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon
            name="email-outline"
            width={16}
            height={16}
            fill={colors.politechnika}
          />
          <Text style={styles.infoText}>example@edu.p.lodz.pl</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon
            name="globe-outline"
            width={16}
            height={16}
            fill={colors.politechnika}
          />
          <Text style={styles.infoText}>ww.komaryfujary.p.lodz.pl</Text>
        </View>
      </View>
      <View style={styles.floatingButton}>
        <CustomButton title="Dodaj ogłoszenie" />
      </View>
      <Text category="h3" style={styles.postsHeader}>
        Najnowsze ogłoszenia
      </Text>
      <Post />
      <Post />
    </ScreenContainer>
  );
};

export default ClubDetailsScreen;

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    color: colors.labelGrey,
  },
  floatingButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingContainer: {
    marginVertical: 10,
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
