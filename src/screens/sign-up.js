import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import colors from '../constants/colors';
import Form from '../components/form';
import Layout from '../layout/session-layout';
import fixTimeout from '../timerFix'

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    surname: '',
    mail: '',
    password: '',
    passworConfirm: '',
    faculty: '',
    degree: '',
  });
  const [errors, setErrors] = useState([]);

  const updateErrors = message => {
    setErrors(rest => {
      return [...rest, message];
    });
  };

  const handleSignUp = () => {
    setErrors([]);
    fixTimeout();

    const db = firebase.firestore();

    if (data.mail.includes('@edu.p.lodz.pl')) {
      if (data.password === data.passwordConfirm) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.mail, data.password)
          .catch(error => {
            updateErrors(error.message);
          });

        db.collection('users')
          .doc(data.mail)
          .set({
            name: data.name,
            surname: data.surname,
            faculty: data.faculty,
            degree: data.degree,
          });
      } else {
        updateErrors('Passwords do not match.');
      }
    } else {
      updateErrors('Mail is incorrect');
    }
  };

  return (
    <View>
      <Layout>
        <Form
          title="Rejestracja"
          button={{ title: 'Zarejestruj', onPress: handleSignUp }}
          link={{
            title: 'Logowanie',
            onPress: () => {
              navigation.navigate('SignIn');
            },
          }}>
          <View style={styles.errors}>
            {errors.map(error => (
              <Text
                key={Math.floor(Math.random() * 100)}
                style={{ color: 'red' }}>
                {error}
              </Text>
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>IMIE</Text>
              <TextInput
                style={{ ...styles.input, ...{ width: '95%' } }}
                onChangeText={text => {
                  setData(rest => {
                    return { ...rest, name: text };
                  });
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>NAZWISKO</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setData(rest => {
                    return { ...rest, surname: text };
                  });
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>MAIL POLITECHNIKI</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, mail: text };
                });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>HASŁO</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={text => {
                console.log(text);
                setData(rest => {
                  return { ...rest, password: text };
                });
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>POTWIERDŹ HASŁO</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, passwordConfirm: text };
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
            <Text style={styles.label}>KIERUNEK</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setData(rest => {
                  return { ...rest, degree: text };
                });
              }}
            />
          </View>
        </Form>
      </Layout>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
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
  errors: {
    marginTop: -15,
    marginBottom: 5,
  },
});
