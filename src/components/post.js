import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import colors from '../constants/colors';

function Post({ post, navigation }) {
  const clubName = (post && post.clubName) || false;

  const contentPreview = () => {
    if (post.content.length > 200) {
      return post.content.slice(0, 200) + '...';
    } else if (post.content.length < 100) {
      return post.content;
    } else {
      return post.content.slice(0, post.content.length / 1.5) + '...';
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('WholePost', post)}>
      <Layout style={styles.container}>
        {clubName && <Text style={styles.clubName}>{clubName}</Text>}
        <Text style={styles.postTitle}>{(post && post.title) || 'Tytuł'}</Text>
        <Layout>
          <Layout>
            <Text style={styles.postContent}>
              {(post && contentPreview()) ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in posuere nunc. Proin laoreet placerat quam...'}
            </Text>
          </Layout>
          <Text style={styles.seeMore}>Zobacz więcej...</Text>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  clubName: {
    fontSize: 14,
    color: colors.politechnika,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363636',
    marginVertical: 4,
  },
  postContent: {
    fontSize: 15,
    color: '#5a5a5a',
    display: 'flex',
    flexDirection: 'column',
  },
  seeMore: {
    fontSize: 12,
    color: '#a39e9e',
  },
});

export default Post;
