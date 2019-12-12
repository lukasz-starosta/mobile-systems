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
  const user = navigation.state.params;
  const [data, setData] = useState({
    name: (user && user.name) || '',
    surname: (user && user.surname) || '',
    faculty: (user && user.faculty) || '',
    degree: (user && user.degree) || '',
  });
  const [image, setImage] = useState({
    uri: '',
    src: (user && user.avatar) || 'http://d310a9hpolx59w.cloudfront.net/product_photos/61275063/file_fe49049719_original.jpg',
  });
  return (
    <ScreenContainer noStyle>
      <ScrollView>
        <View style={{ marginTop: 5, marginBottom: 40 }}>
          <Form
            title="Edytuj profil"
            button={{ title: 'Edytuj' }}
            styleProps={styles.form}>
            <View>
              <Text style={styles.label}>IMIĘ</Text>
              <TextInput
                style={styles.input}
              // onChangeText={text => {
              //   updateUser(rest => {
              //     return { ...rest, name: text };
              //   });
              // }}
              >{data.name}</TextInput>
            </View>
            <View>
              <Text style={styles.label}>NAZWISKO</Text>
              <TextInput
                style={styles.input}
              // onChangeText={text => {
              //   updateUser(rest => {
              //     return { ...rest, surname: text };
              //   });
              // }}
              >{data.surname}</TextInput>
            </View>
            <View>
              <Text style={styles.label}>WYDZIAŁ</Text>
              <TextInput
                style={styles.input}
              // onChangeText={text => {
              //   updateUser(rest => {
              //     return { ...rest, faculty: text };
              //   });
              // }}
              >{data.faculty}</TextInput>
            </View>
            <View>
              <Text style={styles.label}>KIERUNEK</Text>
              <TextInput
                style={styles.input}
              // onChangeText={text => {
              //   updateUser(rest => {
              //     return { ...rest, degree: text };
              //   });
              // }}
              >{data.degree}</TextInput>
            </View>
            <View>
              <Text style={styles.label}>ZDJĘCIE PROFILOWE</Text>
              <View>
                <TouchableWithoutFeedback>
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
