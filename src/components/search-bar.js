import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Layout, Icon } from 'react-native-ui-kitten';
import colors from '../constants/colors';
import { SEARCH_BY } from '../constants/types';

function SearchBar(props) {
  const { placeholder, navigation, initialValue } = props;

  const [value, setValue] = useState(initialValue || '');

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
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="white"
        onSubmitEditing={() => {
          // Don't push other scren on stack to enable backing to explore with 1 click
          if (navigation.state.routeName === 'SearchResults') {
            navigation.replace('SearchResults', {
              searchBy: SEARCH_BY.NAME,
              value,
            });
          } else {
            navigation.push('SearchResults', {
              searchBy: SEARCH_BY.NAME,
              value,
            });
          }
        }}
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
