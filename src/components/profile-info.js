import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';
import { TouchableWithoutFeedback } from 'react-native';
import colors from '../constants/colors';
import { Icon } from 'react-native-ui-kitten';
import { View } from 'react-native';

function ProfileInfo() {
  return (
    <Layout>
      <Layout style={styles.imageContainer}>
        <Avatar
          style={styles.image}
          source={{
            uri: 'https://i.imgur.com/2y3Sm4x.jpg',
          }}
        />
      </Layout>
      <Layout style={styles.textContainer}>
        <Text style={styles.name}>Imię Nazwisko</Text>
        <Text style={styles.everythingElse}>example@edu.p.lodz.pl</Text>
        <Text style={styles.everythingElse}>Wydział</Text>
        <Text style={styles.lastOne}>Kierunek</Text>
        <View style={styles.icon}>
          <TouchableWithoutFeedback>
            <Icon
              name='edit-outline'
              width={30}
              height={30}
              fill={colors.politechnika} />
          </TouchableWithoutFeedback>
        </View>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 8,
  },
  textContainer: {
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: 'white',
    shadowColor: 'grey',
    shadowRadius: 10,
    elevation: 15,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,

  },
  name: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 7,
    marginLeft: 10,
    fontWeight: 'bold',
    color: colors.politechnika,
  },
  everythingElse: {
    marginTop: 7,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  lastOne: {
    marginTop: 7,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  icon: {
    alignItems: 'flex-end',
  },
});

export default ProfileInfo;
