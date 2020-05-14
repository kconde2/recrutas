import React  from "react";
import { StyleSheet , Text} from 'react-native'
import { DataTable} from 'react-native-paper';
import ApplicationListContext from '../context/Applicant/ApplicationContext';


const ListApplications = ({ navigation }) => {

  const {state, actions} = React.useContext(ApplicationListContext);
   
  React.useEffect(() => {
    actions.getAll().then(() => {
      console.log(state.applications);
    });
  }, []);


  return (
    <DataTable style={styles.container}>
    <DataTable.Header style = {styles.color_weight}>
      <DataTable.Title  style = {styles.color_weight}>Resume</DataTable.Title>
      <DataTable.Title  style = {styles.color_weight}>Age</DataTable.Title>
      <DataTable.Title  style = {styles.color_weight}>Motivation</DataTable.Title>
      <DataTable.Title  style = {styles.color_weight} >Wage</DataTable.Title>
      <DataTable.Title  style = {styles.color_weight} numeric>Status</DataTable.Title>
    </DataTable.Header>
    {
           state.applications.map((item, index) => (
    <DataTable.Row key = {index} style={styles.background_row}  onPress={() => navigation.navigate('DetailApplications', {
      itemId: item.id,resume: item.resume,age: item.age,wage: item.wage,motivation: item.motivation,
    })}>
      <DataTable.Cell >{item.resume}</DataTable.Cell>
      <DataTable.Cell>{item.age}</DataTable.Cell>
      <DataTable.Cell>{item.motivation}</DataTable.Cell>
      <DataTable.Cell >{item.wage}</DataTable.Cell>
      <DataTable.Cell numeric>{item.status}</DataTable.Cell>
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

)
  }
  const styles = StyleSheet.create ({
    container: {
       marginTop:10,
       backgroundColor: 'lightgray',
    },
    color_weight: {
      fontWeight: "bold",
      fontSize:59,
    },
    background_row: { 
      backgroundColor: 'white',
      fontSize:90,
    }
  })
  
export default ListApplications;
