import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

function AccountScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Application Account</Text>
      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Button
          style={{ marginRight: '10%' }}
          title="All applications"
          onPress={() => navigation.navigate('ListApplications')}
        />

        <Button
          title="Accepted applications"
          onPress={() => navigation.navigate('ListApplicationsAccepted')}
        />
      </View>
    </View>
  );
}

export default AccountScreen;
