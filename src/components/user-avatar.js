import React from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';

function UserAvatar({ navigation, user, subtitle, onAccept, onDecline }) {
  const name = (user && user.name) || 'Imię nazwisko';
  const faculty = (user && user.faculty) || 'Nazwa wydziału';
  const avatar = user && user.avatar;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ProfileScreen');
      }}>
      <Layout style={styles.container}>
        <Avatar
          style={styles.image}
          source={{
            uri: avatar,
          }}
        />
        <Layout>
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.facultyName}>{subtitle || faculty}</Text>
        </Layout>
        {onAccept && onDecline && (
          <Layout style={styles.iconContainer}>
            <TouchableWithoutFeedback onPress={onDecline}>
              <Image
                style={styles.acceptDeclineIcon}
                source={require('../icons/decline.png')}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onAccept}>
              <Image
                style={styles.acceptDeclineIcon}
                source={require('../icons/accept.png')}
              />
            </TouchableWithoutFeedback>
          </Layout>
        )}
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 8,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  acceptDeclineIcon: {
    width: 36,
    height: 36,
    marginHorizontal: 2,
    paddingHorizontal: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#363636',
  },
  facultyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5a5a5a',
  },
});

export default UserAvatar;
