import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';

function ScreenContainer(props) {
  const { title, children } = props;

  return (
    <Layout style={styles.container} level="2">
      <Text category="h2" style={styles.title}>
        {title}
      </Text>
      <Layout style={styles.contentContainer}>{children}</Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default ScreenContainer;
