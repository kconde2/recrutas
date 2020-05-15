import React, { useState, useContext } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import CustomDatePicker from './Offer/CustomDatePicker'
import CustomTextInput from './Offer/CustomTextInput'
import RecruiterContext from '../../context/Recruiter/RecruiterContext'
import AuthContext from '../../context/Auth/AuthContext';

function OfferScreen({ navigation }) {
  const { state, actions } = useContext(RecruiterContext)
  const authContext = useContext(AuthContext)

  const [field, setField] = useState({
    name: { text: 'Nom du poste', value: '', error: false },
    contratType: { text: 'Type de contrat', value: '', error: false },
    companyDetails: { text: "Description de l'entreprise", value: '', error: false },
    mission: { text: 'Description de la mission', value: '', error: false },
    startDate: { text: 'Date de début', value: /*new Date()*/"15/05/2020", error: false },
    workplace: { text: 'Lieu', value: '', error: false },
  });

  function handleSubmit() {
    var hasEmptyField = false;

    Object.keys(field).map(key => {
      if (field[key].value == '') {
        field[key].error = true;
        hasEmptyField = true
      } else field[key].error = false;
    })

    actions.createOffer({
      name: field.name.value,
      contratType: field.contratType.value,
      companyDetails: field.companyDetails.value,
      mission: field.mission.value,
      startDate: field.startDate.value,
      workplace: field.workplace.value,
      author: '/users/' + authContext.state.user.id
    })

    if (!hasEmptyField) {
      navigation.navigate('Offer', field)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <CustomTextInput field={field} setField={setField} attribute="name" />
          <CustomTextInput field={field} setField={setField} attribute="contratType" />
          <CustomTextInput field={field} setField={setField} attribute="companyDetails" area={true} />
          <CustomTextInput field={field} setField={setField} attribute="mission" area={true} />
          <CustomDatePicker field={field} setField={setField} attribute="startDate" />
          <CustomTextInput field={field} setField={setField} attribute="workplace" />

          <Button style={{ margin: 10, padding: 15 }} icon="camera" mode="contained" onPress={() => { handleSubmit(field) }}>Soumettre</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OfferScreen;
