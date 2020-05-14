import * as React from 'react';
import {Button, View, Text} from 'react-native';

function AccountScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Account</Text>
      <Button
        title="All applications"
        onPress={() => navigation.navigate('RecruiterApplicationList')}
      />
    </View>
  );
}

export default AccountScreen;
