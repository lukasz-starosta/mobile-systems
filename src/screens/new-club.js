import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import ScreenContainer from '../layout/screen-container';
import Form from '../components/form';
import colors from '../constants/colors';
import ImagePicker from 'react-native-image-picker';
import storage from '../api/storage';
import database from '../api/database';
import RNFetchBlob from 'rn-fetch-blob';
import LoadingStatus from '../components/loading';
import { FacultiesSelect } from '../components/faculties-select';
import { CategoriesSelect } from '../components/categories-select';

const CreateClubScreen = ({ navigation, user }) => {
  const reloadClubs = navigation.state.params;

  const [club, setClub] = useState({
    name: '',
    contact_email: '',
    description: '',
    faculty: '',
    icon: '',
    web_page: '',
  });
  const [image, setImage] = useState({
    uri: '',
    src:
      'https://d310a9hpolx59w.cloudfront.net/product_photos/61275063/file_fe49049719_original.jpg',
  });
  const [loading, setLoading] = useState(false);

  const options = {
    title: 'Wybierz ikonę koła',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openImagePicker = () => {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {
          uri: response.uri,
          src: 'data:image/jpeg;base64,' + response.data,
        };

        setImage(source);
      }
    });
  };

  const uploadImage = (uri, mime = 'application/octet-stream') => {
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
          return await storage.upload(
            blob,
            { contentType: mime },
            club.name + '_icon',
          );
        })
        .then(url => {
          uploadBlob.close();
          resolve(url);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          window.XMLHttpRequest = xhr;
          window.Blob = blob;
        });
    });
  };

  const handleClubCreation = () => {
    const createClub = async () => {
      setLoading(true);

      const url = image.uri ? await uploadImage(image.uri) : image.src;

      const clubId = await database.addClub({ ...club, icon: url });

      await database.addMember({
        club_id: clubId,
        user_id: user.uid,
        status: 'founder',
      });

      reloadClubs();
      setLoading(false);
      navigation.goBack();
    };
    createClub();
  };

  if (loading) return <LoadingStatus />;

  return (
    <ScreenContainer noStyle>
      <ScrollView>
        <View style={{ marginTop: 5, marginBottom: 40 }}>
          <Form
            title="Stwórz koło"
            button={{ title: 'Stwórz', onPress: handleClubCreation }}
            styleProps={styles.form}>
            <View>
              <Text style={styles.label}>NAZWA</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setClub(rest => {
                    return { ...rest, name: text };
                  });
                }}
              />
            </View>
            <View>
              <Text style={styles.label}>MAIL KONTAKTOWY</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setClub(rest => {
                    return { ...rest, contact_email: text };
                  });
                }}
              />
            </View>
            <View>
              <Text style={styles.label}>OPIS</Text>
              <TextInput
                multiline
                scrollEnabled
                style={{
                  ...styles.input,
                  height: 60,
                  textAlignVertical: 'bottom',
                }}
                onChangeText={text => {
                  setClub(rest => {
                    return { ...rest, description: text };
                  });
                }}
              />
            </View>
            <View>
              <Text style={styles.label}>WYDZIAŁ</Text>
              <FacultiesSelect
                style={styles.input}
                selectedOption={club.faculty}
                onSelect={opt => setClub(rest => ({ ...rest, faculty: opt }))}
              />
            </View>
            <View>
              <Text style={styles.label}>Kategoria</Text>
              <CategoriesSelect
                style={styles.input}
                selectedOption={club.category}
                onSelect={opt => setClub(rest => ({ ...rest, category: opt }))}
              />
            </View>
            <View>
              <Text style={styles.label}>STRONA INTERNETOWA</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setClub(rest => {
                    return { ...rest, web_page: text };
                  });
                }}
              />
            </View>
            <View>
              <Text style={styles.label}>IKONA KOŁA</Text>
              <View>
                <TouchableWithoutFeedback onPress={openImagePicker}>
                  <Image source={{ uri: image.src }} style={styles.icon} />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </Form>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '95%',
    alignSelf: 'center',
  },
  label: {
    color: colors.labelGrey,
    fontSize: 12,
  },
  input: {
    height: 30,
    fontSize: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.inputGrey,
    marginBottom: 15,
    paddingBottom: 2,
  },
  icon: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default CreateClubScreen;
