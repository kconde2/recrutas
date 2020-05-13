import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

function AppScreen({ navigation }) {
  return <Background>
    {/* <Logo /> */}
    <Header>Recrutas.</Header>

    <Paragraph>
      Recruter n'a jamais été aussi simple 🙂
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Se connecter
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      S'inscrire
    </Button>
  </Background>
};

export default memo(AppScreen);
