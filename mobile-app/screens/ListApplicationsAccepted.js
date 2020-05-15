import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';
import ApplicationListContext from '../context/Applicant/ApplicationContext';
import AuthContext from '../context/Auth/AuthContext';

const ListApplicationsAccepted = ({ navigation }) => {

  const { state, actions } = React.useContext(ApplicationListContext);
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    actions.getAllAccepted(authContext.state.user.id, authContext.state.user.token)
  }, []);

  return (
    <SafeAreaView>
      <ScrollView >
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.color_weight}>
            <DataTable.Title style={styles.color_weight}>Offer</DataTable.Title>
            <DataTable.Title style={styles.color_weight}>Age</DataTable.Title>
            <DataTable.Title style={styles.color_weight}>Motivation</DataTable.Title>
            <DataTable.Title style={styles.color_weight} numeric>Wage</DataTable.Title>
          </DataTable.Header>
          {
            state.applications.map((item, index) => (
              <DataTable.Row key={index} style={styles.background_row} onPress={() => navigation.navigate('DetailApplicationsAccepted', {
                itemId: item.id, offer: item.offer.name, resume: item.resume, age: item.age, wage: item.wage, motivation: item.motivation,
              })}>
                <DataTable.Cell >{item.offer.name}</DataTable.Cell>
                <DataTable.Cell>{item.age}</DataTable.Cell>
                <DataTable.Cell>{item.motivation}</DataTable.Cell>
                <DataTable.Cell numeric>{item.wage}</DataTable.Cell>
              </DataTable.Row>
            ))
          }
          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={(page) => { console.log(page); }}
            label="1-2 of 6"
          />
        </DataTable>
      </ScrollView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'lightgray',
  },
  color_weight: {
    fontWeight: "bold",
    fontSize: 59,
  },
  background_row: {
    backgroundColor: 'white',
    fontSize: 90,
  }
})

export default ListApplicationsAccepted;
