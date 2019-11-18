import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';

function Club() {
  return (
    <Layout style={styles.container}>
      <Avatar
        style={styles.image}
        source={{
          uri: 'https://i.imgur.com/2y3Sm4x.jpg',
        }}
      />
      <Layout>
        <Text style={styles.clubName}>Długa nazwa koła</Text>
        <Text style={styles.facultyName}>Jeszcze dłuższa nazwa wydziału</Text>
      </Layout>
    </Layout>
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
  clubName: {
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

export default Club;
