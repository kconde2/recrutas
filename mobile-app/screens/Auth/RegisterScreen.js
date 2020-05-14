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
} from '../../core/utils';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [role, setRole] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Background>
          <BackButton goBack={() => navigation.navigate('AppScreen')} />

          {/* <Logo /> */}

          <Header>Inscription</Header>

          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
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

          <View style={{ flexDirection: 'row' }}>
            <Text>Recruteur</Text>
            <RadioButton
              value="ROLE_RECRUITER"
              color="#600EE6"
              status={role.value === 'ROLE_RECRUITER' ? 'checked' : 'unchecked'}
              onPress={() => setRole({ value: 'ROLE_RECRUITER', error: '' })}
            />

            <Text>Candidat</Text>
            <RadioButton
              value="ROLE_APPLICANT"
              color="#600EE6"
              status={role.value === 'ROLE_APPLICANT' ? 'checked' : 'unchecked'}
              onPress={() => setRole({ value: 'ROLE_APPLICANT', error: '' })}
            />
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
