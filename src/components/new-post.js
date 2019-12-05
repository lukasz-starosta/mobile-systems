import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Avatar } from 'react-native-ui-kitten';
import { TouchableWithoutFeedback } from 'react-native';
import colors from '../constants/colors';
import { Icon } from 'react-native-ui-kitten';
import { View } from 'react-native';

function NewPost() {
  return (
       <Layout style={styles.textStyle}>
        <Text style={styles.titleStyle}>Tytuł ogłoszenia</Text>
        <Text style={styles.dateStyle}>Styczeń 23, 2019 10:00</Text>
        <Text style={styles.contentStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        <View style={styles.imageIconStyle}>
          <TouchableWithoutFeedback>
            <Icon
              name='image-outline'
              width={30}
              height={30}
              fill={colors.politechnika} />
          </TouchableWithoutFeedback>
            <Text>Dodaj zdjęcia</Text>
        </View>
      </Layout>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: 'white',
    shadowColor: 'grey',
    shadowRadius: 10,
    elevation: 15,
    padding: 15
  },
  titleStyle: {
    marginTop: 10,
    fontWeight: 'bold',
    color: colors.politechnika,
    fontSize: 21,
  },
  dateStyle: {
    fontWeight: 'bold',
    marginVertical: 7,
    color: colors.labelGrey,

  },
  contentStyle: {
    marginBottom: 285,
  },
  imageIconStyle:{
    marginBottom: 25,
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center' 
  },
});

export default NewPost;
