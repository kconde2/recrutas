import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Card, Text, Paragraph } from 'react-native-paper';
import ApplicationListContext from '../../../context/Recruiter/ApplicationListContext';
import AuthContext from '../../../context/Auth/AuthContext';

function ApplicationScreen({ route }) {
  const { state, actions } = React.useContext(ApplicationListContext);
  const { id } = route.params;
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    actions.getSpecific(id, authContext.state.user.token).then(response => { });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Card.Content>
            {/* <Paragraph style={styles.color_weight}>Applicant:</Paragraph>
            <Text style={styles.padding_bottom_left}>{state.application.applicant.firstname}</Text> */}
            {/* <Paragraph style={styles.color_weight}>Offer:</Paragraph>
            <Text style={styles.padding_bottom_left}>{state.application.offer.name}</Text> */}
            <Paragraph style={styles.color_weight}>Resume :</Paragraph>
            <Text style={styles.padding_bottom_left}>FILE{state.application.resume}</Text>
            <Paragraph style={styles.color_weight}>Motivation :</Paragraph>
            <Text style={styles.padding_bottom_left}>{state.application.motivation}</Text>
            <Text style={styles.color_weight}>Âge</Text>
            <Text style={styles.padding_bottom_left}>{state.application.age}</Text>
            <Paragraph style={styles.padding_bottom}>Salaire : </Paragraph>
            <Text style={styles.color_weight}>{state.application.wage} €</Text>

          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,

    backgroundColor: 'white',
  },
  padding_bottom_left: {
    marginBottom: 15,
    marginLeft: 6,
    fontSize: 16,
    textAlign: "justify"
  },
  padding_bottom: {
    marginBottom: 15,
    fontSize: 16,
  },
  color_weight: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 17,
  },
  font_size_title: {
    fontSize: 21,
    marginBottom: 25,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: 'center'
  },
  button_color: {
    backgroundColor: "lightgray",
    marginTop: 10,
    color: "black",
  }
})
export default ApplicationScreen;
