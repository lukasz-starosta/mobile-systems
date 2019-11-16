import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { ScreenTitle } from '../components/texts-containers';

function ScreenContainer(props) {
  const { title, children } = props;

  return (
    <Layout style={styles.container} level="2">
      <ScreenTitle>{title}</ScreenTitle>
      <Layout style={styles.contentContainer}>{children}</Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingVertical: 8,
  },
});

export default ScreenContainer;
