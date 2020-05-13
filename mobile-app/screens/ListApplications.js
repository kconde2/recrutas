import React , { useState, useEffect} from "react";
import { StyleSheet } from 'react-native'
import { DataTable} from 'react-native-paper';

const ListApplications = ({ navigation }) => {
  const [list, setList] = useState([
    {
      id:1,
      title: "test1",
      description: 'Susan2332',
      age:12,
      motivation:"motivated232",
      wage:1,
      resume:"descritpiondvsdqvqds"
    },
    {
      id:2,
      title: "test2",
      description: 'Susan2332',
      age:12,
      motivation:"motivated",
      wage:1,
      resume:"descritpion"
    },
    {
      id:3,
      title: "test3",
      description: 'Susan22',
      age:12,
      motivation:"motivated",
      wage:1,
      resume:"descritpion"
    },
    {
      id:4,
      title: "test4",
      description: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    }
 ]);

  return (
        <DataTable style={styles.container}>
        <DataTable.Header>
          <DataTable.Title  style = {styles.color_weight}>Resume</DataTable.Title>
          <DataTable.Title  style = {styles.color_weight}>Age</DataTable.Title>
          <DataTable.Title  style = {styles.color_weight}>Motivation</DataTable.Title>
          <DataTable.Title  style = {styles.color_weight} numeric>Wage</DataTable.Title>
        </DataTable.Header>
        {
               list.map((item, index) => (
        <DataTable.Row key = {index} onPress={() => navigation.navigate('DetailApplications', {
          itemId: item.id,resume: item.resume,age: item.age,wage: item.wage,motivation: item.motivation,
        })}>
          <DataTable.Cell>{item.resume}</DataTable.Cell>
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
)
}

const styles = StyleSheet.create ({
  container: {
     padding: 5,
     marginTop: 20,
     backgroundColor: 'white',
  },
  color_weight: {
    fontWeight: "bold",
    fontSize:17,
  },
})

export default ListApplications;
