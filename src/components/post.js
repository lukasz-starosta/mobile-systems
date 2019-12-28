import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { TouchableWithoutFeedback } from 'react-native';

function Post({ post, navigation }) {
  const clubName = (post && post.clubName) || '';

  return (
    <Layout style={styles.container}>
      {clubName && <Text style={styles.clubName}>{clubName}</Text>}
      <Text style={styles.postTitle}>{(post && post.title) || 'Tytuł'}</Text>
      <Layout>
        <Text style={styles.postContent}>
          {(post && post.content.slice(0, post.content.length / 1.5) + '...') ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in posuere nunc. Proin laoreet placerat quam...'}
          <TouchableWithoutFeedback>
            <Text
              style={styles.seeMore}
              onPress={() => navigation.navigate('WholePost', post)}>
              Zobacz więcej...
            </Text>
          </TouchableWithoutFeedback>
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
