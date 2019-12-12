import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Layout, Text, Icon } from 'react-native-ui-kitten';
import colors from '../constants/colors';
import Button from '../components/button';
import database from '../api/database';

function NewPost({ navigation, club, loading }) {
  const [post, setPost] = useState({
    club_id: club.uid,
    content: '',
    title: '',
  });

  function handlePostCreation() {
    loading.setTrue();
    async function createPost() {
      await database.addPost(post);
      loading.setFalse();
      navigation.navigate('ClubDetails', club);
    }
    createPost();
  }

  return (
    <>
      <Layout style={styles.textStyle}>
        <View>
          <TextInput
            style={styles.titleStyle}
            placeholder="Tytuł"
            onChangeText={text => {
              setPost(previous => {
                return { ...previous, title: text };
              });
            }}
          />
          <KeyboardAvoidingView behaviour="padding" enabled>
            <TextInput
              multiline
              scrollEnabled
              style={styles.contentStyle}
              onChangeText={text => {
                setPost(previous => {
                  return { ...previous, content: text };
                });
              }}
            />
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
      <View style={styles.bottom}>
        <Button title="Opublikuj" onPress={handlePostCreation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottom: {
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
    elevation: 16,
  },
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
  contentStyle: {
    textAlignVertical: 'top',
    maxHeight: 220,
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
