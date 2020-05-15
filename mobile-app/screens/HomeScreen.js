import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Background from '../components/Background';

function HomeScreen({ navigation }) {
  return <Background>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Recruiter space"
        onPress={() => navigation.navigate('RecruiterAccount')}
      />
      <Button
        title="Applicant space"
        onPress={() => navigation.navigate('ApplicantAccount')}
      />
      <Button
        title="Logout"
        onPress={() => navigation.navigate('LogoutScreen')}
      />
    </View>
  </Background>
}

export default HomeScreen;
