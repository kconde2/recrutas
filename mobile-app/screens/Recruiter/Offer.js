import React, {useState} from 'react';
import { List,Divider,Button } from 'react-native-paper';
import { View } from 'react-native';
import AffectApplicant from './Offer/AffectApplicant'

function OfferScreen(props) {
  const field = props.route.params

  return (
    <View>
        {Object.keys(field).map(key => {
          return (<>
            <List.Item
              key={key}
              title={field[key].text}
              description={field[key].value}
            />
            <Divider />
            </>)
        })}
                <View style={{flexDirection:"row"}}>
          <Button style={{backgroundColor:"#fff",margin:10}} icon="camera" mode="outlined" onPress={() => props.navigation.navigate('Offer',field)}>Modifier</Button>
          <Button style={{backgroundColor:"#fff",margin:10}} icon="camera" mode="outlined" onPress={() => console.log('Pressed')}>Supprimer</Button>
        </View>
        <AffectApplicant/>
    </View>
    )
}

export default OfferScreen;
