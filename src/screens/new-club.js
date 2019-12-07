import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import ScreenContainer from '../layout/screen-container';
import Form from '../components/form';
import colors from '../constants/colors';

const CreateClubScreen = () => {
  const [data, setData] = useState({
    name: '',
    contact_email: '',
    description: '',
    faculty: '',
    icon: '',
    web_page: '',
  });

  return (
    <ScreenContainer>
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <Form
          title="Stwórz klub"
          button={{ title: 'Stwórz', onPress: null }}
          styleProps={styles.form}>
          <View>
            <Text style={styles.label}>NAZWA</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setData(rest => {
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
                setData(rest => {
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
              style={{ ...styles.input, height: 60 }}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, description: text };
                });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>WYDZIAŁ</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, faculty: text };
                });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>STRONA INTERNETOWA</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, web_page: text };
                });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>IKONA KOŁA</Text>
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log('test');
                }}>
                <Image
                  source={{
                    uri:
                      'http://d310a9hpolx59w.cloudfront.net/product_photos/61275063/file_fe49049719_original.jpg',
                  }}
                  style={{ width: 150, height: 150, marginVertical: 10 }}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Form>
      </View>
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
});

export default CreateClubScreen;
