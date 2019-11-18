import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import firebase from 'firebase';
import Form from '../components/form';
import colors from '../constants/colors';
import Layout from '../layout/session-layout';

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({ mail: '', password: '' });
  const [error, setError] = useState('');

  const handleSignIn = () => {
    setError('');

    firebase
      .auth()
      .signInWithEmailAndPassword(data.mail, data.password)
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <View>
      <Layout>
        <Form
          title="Logowanie"
          button={{ title: 'Zaloguj', onPress: handleSignIn }}
          link={{
            title: 'Rejestracja',
            onPress: () => {
              navigation.navigate('SignUp');
            },
          }}>
          <View style={styles.error}>
            <Text style={{ color: 'red' }}>{error}</Text>
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
                setData(rest => {
                  return { ...rest, password: text };
                });
              }}
            />
          </View>
        </Form>
      </Layout>
    </View>
  );
};

export default SignInScreen;

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
  error: {
    marginTop: -15,
    marginBottom: 5,
  },
});
