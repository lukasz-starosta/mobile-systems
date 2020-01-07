import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';
import { SEARCH_BY } from '../constants/types';

function Category(props) {
  const { category, navigation } = props;

  const handlePress = () => {
    navigation.navigate('SearchResults', {
      searchBy: SEARCH_BY.CATEGORY,
      value: category.name,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Layout style={styles.container}>
        <Avatar
          style={styles.image}
          source={{
            uri: category.icon,
          }}
        />
        <Text numberOfLines={1} style={styles.categoryName}>
          {category.name}
        </Text>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  image: {
    width: 108,
    height: 108,
    borderRadius: 10,
    marginRight: 8,
  },
  categoryName: {
    marginTop: 2,
    fontSize: 14,
    maxWidth: 120,
    fontWeight: 'bold',
    color: '#5a5a5a',
  },
});

export default Category;
