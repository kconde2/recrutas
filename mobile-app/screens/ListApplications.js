import React , { useState, useEffect} from "react";
import { StyleSheet } from 'react-native'
import { DataTable} from 'react-native-paper';

const ListApplications = ({ navigation }) => {
  const [list, setList] = useState([
    {
      id:1,
      title: "test1",
      status: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
      age:1,
      motivation:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
      wage:1,
      resume:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
    },
    {
      id:2,
      title: "test2",
      status: 'Susan2332',
      age:12,
      motivation:"motivated",
      wage:1,
      resume:"descritpion"
    },
    {
      id:3,
      title: "test3",
      status: 'Susan22',
      age:12,
      motivation:"motivated",
      wage:1,
      resume:"descritpion"
    },
    {
      id:4,
      title: "test4",
      status: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    },
    {
      id:5,
      title: "test4",
      status: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    },{
      id:6,
      title: "test4",
      status: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    },{
      id:7,
      title: "test4",
      status: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    },{
      id:8,
      title: "test4",
      status: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    },{
      id:9,
      title: "test4",
      status: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    },{
      id:10,
      title: "test4",
      status: 'Susan3',
      age:12,
      motivation:"motivated",
      wage:120000,
      resume:"descritpion"
    }
 ]);


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
               list.map((item, index) => (
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
