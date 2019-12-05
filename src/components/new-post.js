import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Layout, Text, Icon } from 'react-native-ui-kitten';
import colors from '../constants/colors';


function NewPost() {
  return (
    <Layout style={styles.textStyle}>
      <TextInput style={styles.titleStyle}>Tytuł ogłoszenia</TextInput>
      <Text style={styles.dateStyle}>Styczeń 23, 2019 10:00</Text>
      <TextInput multiline={true} scrollEnabled={true} style={styles.contentStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </TextInput>
      <TouchableWithoutFeedback>
        <View style={styles.imageIconStyle}>
          <Icon
            name='image-outline'
            width={30}
            height={30}
            fill={colors.politechnika} />
          <Text>Dodaj zdjęcia</Text>
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    shadowColor: 'grey',
    shadowRadius: 10,
    elevation: 15,
    paddingHorizontal: 10,
    height: 535
  },
  titleStyle: {
    marginTop: 5,
    fontWeight: 'bold',
    color: colors.politechnika,
    fontSize: 23,
  },
  dateStyle: {
    fontWeight: 'bold',
    marginLeft: 4,
    color: colors.labelGrey,
  },
  contentStyle: {
    height: 390,
    textAlignVertical: 'top'
  },
  imageIconStyle: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 40,
    position: 'absolute',
    paddingLeft: 15
  },
});

export default NewPost;
