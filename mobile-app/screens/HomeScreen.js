import * as React from 'react';
import {Button, View, Text} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Recruiter space"
        onPress={() => navigation.navigate('RecruiterAccount')}
      />
    </View>
  );
}

export default HomeScreen;
