import React, { useState, useEffect } from 'react';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { Icon } from 'react-native-ui-kitten';
import database from '../api/database';
import LoadingStatus from '../components/loading';

function ProfileInfo({ navigation, user }) {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      setData(await database.getUser(user.uid));
    };
    fetchUserById();
  }, []);

  if (!data) return <LoadingStatus />;

  return (
    <Layout>
      <Layout style={styles.imageContainer}>
        <Avatar
          style={styles.image}
          source={{
            uri: data.avatar
          }}
        />
      </Layout>
      <Layout style={styles.textContainer}>
        <Text style={styles.name}>{data.name} {data.surname}</Text>
        <Text style={styles.everythingElse}>{data.email}</Text>
        <Text style={styles.everythingElse}>{data.faculty}</Text>
        <Text style={styles.lastOne}>{data.degree}</Text>
        <View style={styles.icon}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfile', {user: {...user, ...data}})}>
            <Icon
              name='edit-outline'
              width={30}
              height={30}
              fill={colors.politechnika}
            />
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
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    shadowColor: 'grey',
    shadowRadius: 10,
    elevation: 15,
    marginHorizontal: 5,
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
    marginRight: 4,
    marginBottom: 4,
  },
});

export default ProfileInfo;
