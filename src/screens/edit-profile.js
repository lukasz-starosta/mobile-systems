import React, { useState } from 'react';
import ScreenContainer from '../layout/screen-container';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../constants/colors';
import Form from '../components/form';
import ImagePicker from 'react-native-image-picker';
import storage from '../api/storage';
import database from '../api/database';
import RNFetchBlob from 'rn-fetch-blob';
import LoadingStatus from '../components/loading';

function EditProfileScreen({ navigation }) {
  const { user, fetchUserById } = navigation.state.params;
  const [data, setData] = useState({
    name: user.name,
    surname: user.surname,
    faculty: user.faculty,
    degree: user.degree,
  });
  const [image, setImage] = useState({
    uri: '',
    src: user.avatar
  });
  const [changedData, setChangedData] = useState({});
  const [loading, setLoading] = useState(false);

  const options = {
    title: 'Wybierz zdjęcie profilowe',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openImagePicker = () => {
    ImagePicker.showImagePicker(options, response => {
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
            user.name + '_profile_picture',
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
  
  const checkIfChanged = async () => {
    if(image.uri != ''){
      const url = await uploadImage(image.uri);
      setChangedData(rest => {return {...rest, avatar: url}});
    }
    if (data.name != user.name) {setChangedData(rest => {return {...rest, name: data.name}})};
    if (data.surname != user.surname) {setChangedData(rest => {return {...rest, surname: data.surname}})};
    if (data.faculty != user.faculty) {setChangedData(rest => {return {...rest, faculty: data.faculty}})};
    if (data.degree != user.degree) {setChangedData(rest => {return {...rest, degree: data.degree}})};
  }

  const handleProfileEdition = () => {
    const editProfile = async () => {
      setLoading(true);
      await checkIfChanged(); 
      await database.updateUser(user.uid, changedData);
      fetchUserById();
      setLoading(false);  
      // navigation.goBack();
    };
    editProfile();
  };

  if (loading) return <LoadingStatus />;

  return (
    <ScreenContainer noStyle>
      <ScrollView>
        <View style={{ marginTop: 5, marginBottom: 40 }}>
          <Form
            title="Edytuj profil"
            button={{ title: 'Edytuj', onPress: handleProfileEdition }}
            styleProps={styles.form}>
            <View>
              <Text style={styles.label}>IMIĘ</Text>
              <TextInput
                style={styles.input}
                value={data.name}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, name: text };
                });
              }}
              />
            </View>
            <View>
              <Text style={styles.label}>NAZWISKO</Text>
              <TextInput
                style={styles.input}
                value={data.surname}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, surname: text };
                });
              }}
              />
            </View>
            <View>
              <Text style={styles.label}>WYDZIAŁ</Text>
              <TextInput
                style={styles.input}
                value={data.faculty}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, faculty: text };
                });
              }}
              />
            </View>
            <View>
              <Text style={styles.label}>KIERUNEK</Text>
              <TextInput
                style={styles.input}
                value={data.degree}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, degree: text };
                });
              }}
              />
            </View>
            <View>
              <Text style={styles.label}>ZDJĘCIE PROFILOWE</Text>
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
}

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

export default EditProfileScreen;
