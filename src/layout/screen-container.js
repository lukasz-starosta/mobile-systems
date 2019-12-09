import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { ScreenTitle } from '../components/texts-containers';

function ScreenContainer(props) {
  const { title, children, scrollable, styleProps, noStyle } = props;
  const containerStyle = !noStyle && { ...styles.container, ...styleProps };
  const contentContainerStyle = !noStyle && styles.contentContainer;

  return (
    <Layout style={containerStyle} level="2">
      {title && <ScreenTitle>{title}</ScreenTitle>}
      {scrollable ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={contentContainerStyle}>{children}</Layout>
        </ScrollView>
      ) : (
        <Layout style={contentContainerStyle}>{children}</Layout>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: 'white',
    height: '100%',
  },
  contentContainer: {
    paddingTop: 8,
    height: '90%',
  },
});

export default ScreenContainer;
