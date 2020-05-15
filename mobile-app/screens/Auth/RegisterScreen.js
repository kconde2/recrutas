import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { RadioButton } from 'react-native-paper';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
  addressValidator
} from '../../core/utils';
import AuthContext from '../../context/Auth/AuthContext';
import SplashScreen from '../SplashScreen';

function RegisterScreen({ navigation }) {
  const [firstname, setFirstname] = useState({ value: '', error: '' });
  const [lastname, setLastname] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });
  const [role, setRole] = useState({ value: '', error: '' });
  const [gender, setGender] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const { actions } = React.useContext(AuthContext);

  const _onSignUpPressed = () => {
    const firstnameError = nameValidator(firstname.value);
    const lastnameError = nameValidator(lastname.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const addressError = addressValidator(address.value);

    if (emailError || passwordError || firstnameError || lastnameError || addressError) {
      setFirstname({ ...firstname, error: firstnameError });
      setLastname({ ...lastname, error: lastnameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setAddress({ ...address, error: addressError });
      return;
    }

    setLoading(true)
    actions.signUp({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      roles: [role.value],
      gender: gender.value, address: address.value
    }).then(() => {
      setLoading(false)

      navigation.navigate('ConfirmAccountInfoScreen');
    }).catch(errors => {
      setLoading(false)

      for (let i in errors) {
        const error = errors[i];

        if (error.propertyPath === 'email') {
          setEmail({ ...email, error: error.message });
        }

        if (error.propertyPath === 'firstname') {
          setFirstname({ ...firstname, error: error.message });
        }

        if (error.propertyPath === 'lastname') {
          setLastname({ ...lastname, error: error.message });
        }

        if (error.propertyPath === 'password') {
          setPassword({ ...password, error: error.message });
        }

        if (error.propertyPath === 'address') {
          setAddress({ ...address, error: error.message });
        }
      }
    })
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Background>
          <BackButton goBack={() => navigation.navigate('AppScreen')} />

          {/* <Logo /> */}

          <Header>Inscription</Header>

          <TextInput
            label="Prénom"
            returnKeyType="next"
            value={firstname.value}
            onChangeText={text => setFirstname({ value: text, error: '' })}
            error={!!firstname.error}
            errorText={firstname.error}
          />

          <TextInput
            label="Nom de famille"
            returnKeyType="next"
            value={lastname.value}
            onChangeText={text => setLastname({ value: text, error: '' })}
            error={!!lastname.error}
            errorText={lastname.error}
          />

          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Mot de passe"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <TextInput
            label="Adresse"
            returnKeyType="done"
            value={address.value}
            onChangeText={text => setAddress({ value: text, error: '' })}
            error={!!address.error}
            errorText={address.error}
          />

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <RadioButton.Group
              onValueChange={role => setRole({ value: role, error: '' })}
              value={role.value}
            >
              <View style={{ flexDirection: 'row' }}>
                <RadioButton value="ROLE_APPLICANT" color="#600EE6" />
                <Text>Candidat</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <RadioButton value="ROLE_RECRUITER" color="#600EE6" />
                <Text>Recruteur</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <RadioButton.Group
              onValueChange={gender => setGender({ value: gender, error: '' })}
              value={gender.value}
            >
              <View style={{ flexDirection: 'row' }}>
                <RadioButton value="M" color="#600EE6" />
                <Text>Homme</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <RadioButton value="F" color="#600EE6" />
                <Text>Femme</Text>
              </View>
            </RadioButton.Group>
          </View>

          <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
            S'inscrire
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Avez-vous déjà un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.link}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
