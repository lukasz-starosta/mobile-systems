import React, { useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, Layout, Icon } from 'react-native-ui-kitten';
import colors from '../constants/colors';

function SearchBar(props) {
  const { placeholder, onSubmitEditing } = props;

  return (
    <Layout style={styles.searchBar}>
      <Icon
        style={styles.icon}
        width="24"
        height="24"
        name="search-outline"
        fill="white"
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="white"
        onSubmitEditing={onSubmitEditing}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.politechnika,
    height: 40,
    borderRadius: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
  input: {
    position: 'absolute',
    left: 0,
    color: '#ffffff',
    height: '100%',
    width: '100%',
    padding: 0,
    paddingLeft: 40,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
});

export default SearchBar;
