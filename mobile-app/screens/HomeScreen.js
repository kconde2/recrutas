import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Add offer"
        onPress={() => navigation.navigate('OfferForm')}
      />
    </View>
  );
}

export default HomeScreen;
