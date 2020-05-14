import React, { memo } from 'react';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

function ConfirmAccountInfoScreen({ navigation }) {

  return <Background>
    <Header>Valider votre compte.</Header>

    <Paragraph>
      Votre inscription est n'est pas finie. Il vous manque encore une étape.
    </Paragraph>

    <Paragraph>
      Cliquer sur le lien que nous vous avons envoyez pour activer votre compte
    </Paragraph>

    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Se connecter
    </Button>

  </Background>
};

export default memo(ConfirmAccountInfoScreen);
