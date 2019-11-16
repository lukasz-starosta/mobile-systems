import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from 'react-native-ui-kitten';

function ScreenContainer(props) {
  return <Layout style={styles.container}>{props.children}</Layout>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ScreenContainer;
