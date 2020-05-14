import React, { memo, useState } from 'react';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import AuthContext from '../../context/Auth/AuthContext';

function ActivateAccountScreen({ route, navigation }) {

  const { actions } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      actions.activateAccount(route.params.token).then(() => {
        setLoading(false)
        navigation.navigate('LoginScreen');
      }).catch((error) => {
        setLoading(false)
      })
    }, 5000);
  }, []);

  return <Background>
    <Text>Action</Text>
    {loading && <View style={[styles.container, styles.horizontal]}>
      <Paragraph>
        Veuillez patientez SVP
      </Paragraph>
      <Text style={{ marginBottom: '5%' }}>Votre compte est en cours d'exécution</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>}

  </Background>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "column",
    padding: 10
  }
});

export default memo(ActivateAccountScreen);
