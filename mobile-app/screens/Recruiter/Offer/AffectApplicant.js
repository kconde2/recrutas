import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';

function AffectApplicant(){
  const [visible,setVisible] = React.useState(false)

  function affectApplicant(){
    /*TO DO: checkIfUserEmailExist
      If exist -> send mail and affect him in databse
      If not exist -> send mail to register on app and add offer on his list
    */
    setVisible(false)
  }

    return (
      <View>
        <Button onPress={() => setVisible(true)} style={{margin:10,padding:15}} mode="contained">Affecter</Button>
        <Portal>
          <Dialog
             visible={visible}
             onDismiss={() => setVisible(false)}>
            <Dialog.Title style={{textAlign:'center'}}>Inviter un candidat</Dialog.Title>
            <Dialog.Actions>
                <TextInput outlined style={{flex:1,backgroundColor:"#fff"}} label="Email" mode="outlined"></TextInput>
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={() => affectApplicant()} style={{flex:1,margin:10,padding:15}} mode="outlined">Envoyer</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
}

export default AffectApplicant