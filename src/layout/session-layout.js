import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SessionLayout = ({ children }) => {
  return (
    <View>
      <View style={styles.background}>
        <Image
          source={require('../images/background.png')}
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 1.5,
          }}
        />
      </View>
      <View style={styles.logo}>
        <Image source={require('../images/logo.png')} />
      </View>
      {children}
    </View>
  );
};

export default SessionLayout;

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  logo: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
