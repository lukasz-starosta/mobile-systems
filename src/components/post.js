import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';

function Post({ clubName }) {
  return (
    <Layout style={styles.container}>
      {clubName && <Text style={styles.clubName}>Nazwa koła</Text>}
      <Text style={styles.postTitle}>Tytuł</Text>
      <Layout>
        <Text style={styles.postContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          in posuere nunc. Proin laoreet placerat quam...{' '}
          <Text style={styles.seeMore}>Zobacz więcej...</Text>
        </Text>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  clubName: {
    fontSize: 18,
    color: '#575757',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#363636',
    marginVertical: 4,
  },
  postContent: {
    fontSize: 14,
    color: '#5a5a5a',
  },
  seeMore: {
    fontSize: 14,
    color: '#a39e9e',
  },
});

export default Post;
