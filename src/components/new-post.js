import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Layout, Text, Icon } from 'react-native-ui-kitten';
import colors from '../constants/colors';

function NewPost() {
  return (
    <Layout style={styles.textStyle}>
      <View>
        <TextInput style={styles.titleStyle}>Tytuł ogłoszenia</TextInput>

        <Text style={styles.dateStyle}>Styczeń 23, 2019 10:00</Text>
        <KeyboardAvoidingView behaviour="padding" enabled>
          <TextInput
            multiline={true}
            scrollEnabled={true}
            style={styles.contentStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{' '}
          </TextInput>
        </KeyboardAvoidingView>
      </View>
      <TouchableWithoutFeedback>
        <View style={styles.imageIconStyle}>
          <Icon
            name="image-outline"
            width={30}
            height={30}
            fill={colors.politechnika}
          />
          <Text>Dodaj zdjęcia</Text>
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    justifyContent: 'space-between',
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowRadius: 10,
    elevation: 15,
    paddingHorizontal: 10,
    height: '92%',
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
    textAlignVertical: 'top',
    maxHeight: 220
  },
  imageIconStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    marginBottom: 30,
  },
});

export default NewPost;
