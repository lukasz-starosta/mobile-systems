import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingStatus = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color="#750104" />
    </View>
  );
};

export default LoadingStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
