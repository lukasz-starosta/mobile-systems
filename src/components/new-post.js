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
import storage from '../api/storage';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

function NewPost({ navigation, club, loading, fetchPosts }) {
  const [post, setPost] = useState({
    club_id: club.uid,
    content: '',
    title: '',
  });
  const [images, setImages] = useState([]);

  const options = {
    multiple: true,
  };

  const openImagePicker = () => {
    ImagePicker.openPicker(options).then(response => {
      let images = [];
      response.forEach(image => {
        let imageData = {
          uri: image.path,
        };
        images.push(imageData);
      });

      setImages(images);
    });
  };

  const uploadImage = (uri, title, mime = 'application/octet-stream') => {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    const blob = window.Blob;
    const xhr = window.XMLHttpRequest;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    return new Promise((resolve, reject) => {
      let uploadBlob = null;

      fs.readFile(uri, 'base64')
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(async blob => {
          uploadBlob = blob;
          return await storage.upload(blob, { contentType: mime }, title);
        })
        .then(url => {
          uploadBlob.close();
          window.XMLHttpRequest = xhr;
          window.Blob = blob;
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  function handlePostCreation() {
    loading.setTrue();
    async function createPost() {
      let imageUrls = [];

      for (let i = 0; i < images.length; i++) {
        const title = post.title.replace(' ', '_') + '_image_' + i;
        const url = await uploadImage(images[i].uri, title);
        imageUrls.push(url);
      }

      await database.addPost({ ...post, images: imageUrls });

      await fetchPosts();

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
              placeholder="Tekst..."
              onChangeText={text => {
                setPost(previous => {
                  return { ...previous, content: text };
                });
              }}
            />
          </KeyboardAvoidingView>
        </View>
        <TouchableWithoutFeedback onPress={openImagePicker}>
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
    marginBottom: 40,
  },
});

export default NewPost;
