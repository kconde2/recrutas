import React, {useState} from 'react';
import { List,Divider,Button } from 'react-native-paper';
import { View } from 'react-native';
import AffectApplicant from './Offer/AffectApplicant'

function OfferScreen(props) {
  const field = props.route.params

  function openAffectModal(){

  }

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
        <AffectApplicant/>
        <Button style={{margin:10,padding:15}} icon="camera" mode="contained" onPress={() => {openAffectModal()}}>Affecter un candidat</Button>
    </View>
    )
}

export default OfferScreen;
