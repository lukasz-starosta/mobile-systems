import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';
import { SEARCH_BY } from '../constants/types';

function Faculty(props) {
  const { faculty, navigation } = props;

  const handlePress = () => {
    navigation.navigate('SearchResults', {
      searchBy: SEARCH_BY.FACULTY,
      value: faculty.abbr,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Layout style={styles.container}>
        <Avatar
          style={styles.image}
          source={{
            uri: faculty.logo,
          }}
        />
        <Text numberOfLines={1} style={styles.facultyName}>
          {faculty.name}
        </Text>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 10,
    marginRight: 8,
  },
  facultyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5a5a5a',
  },
});

export default Faculty;
