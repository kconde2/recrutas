import React, {useState} from 'react';
import {View, ScrollView,SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import CustomTextInput from './Offer/CustomTextInput'

function OfferScreen({ navigation }) {
  const [field, setField] = useState({
    name: {text: 'Nom du poste', value: '', error:false},
    author: {text: 'Auteur', value: '',error:false},
    contratType: {text: 'Type de contrat', value: '',error:false},
    companyDetails: {text: "Description de l'entreprise", value: '',error:false},
    mission: {text: 'Description de la mission', value: '',error:false},
    startDate: {text: 'Date de début', value: '',error:false},
    workplace: {text: 'Lieu', value: '',error:false},
  });

  function handleSubmit(){
    var hasEmptyField = false;

    /*Object.keys(field).map(key => {
      if(field[key].value == ''){
        field[key].error = true;
        hasEmptyField = true
      }else field[key].error = false;
    })*/

    if (!hasEmptyField){
      navigation.navigate('Offer',field)
    }
  }

  return (
    <SafeAreaView>
        <ScrollView> 
          <View>
            <CustomTextInput field={field} setField={setField} attribute="name"/>
            <CustomTextInput field={field} setField={setField} attribute="author"/>
            <CustomTextInput field={field} setField={setField} attribute="contratType"/>
            <CustomTextInput field={field} setField={setField} attribute="companyDetails" area={true}/>
            <CustomTextInput field={field} setField={setField} attribute="mission" area={true}/>
            <CustomTextInput field={field} setField={setField} attribute="startDate"/>
            <CustomTextInput field={field} setField={setField} attribute="workplace"/>

            <Button style={{margin:10,padding:15}} icon="camera" mode="contained" onPress={() => {handleSubmit(field)}}>Soumettre</Button>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default OfferScreen;
