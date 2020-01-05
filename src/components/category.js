import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';

function Category(props) {
  const { category } = props;
  return (
    <Layout style={styles.container}>
      <Avatar
        style={styles.image}
        source={{
          uri: 'https://i.imgur.com/2y3Sm4x.jpg',
        }}
      />
      <Text style={styles.categoryName}>{category.name}</Text>
    </Layout>
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
