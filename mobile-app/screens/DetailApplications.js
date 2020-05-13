import React from "react";
import {Button, Card, Text, Paragraph} from 'react-native-paper';
import { StyleSheet } from 'react-native'


const DetailApplications = ({route, navigation }) => {
    const { resume,age,motivation,wage } = route.params;
    return (
        <Card style = {styles.container}>
            <Paragraph style = {styles.font_size_title}>DetailApplications</Paragraph>
            <Card.Content>
                <Paragraph style = {styles.color_weight}>Resume:</Paragraph>
                    <Text style = {styles.padding_bottom}>{resume}</Text>
                <Paragraph style = {styles.color_weight}>Motivation:</Paragraph>
                    <Text style = {styles.padding_bottom}>{motivation}</Text>
                <Paragraph><Text style = {styles.color_weight}>Age:</Text> {JSON.stringify(age)}</Paragraph>
                <Paragraph><Text style = {styles.color_weight}>Salaire:</Text> {JSON.stringify(wage)} €</Paragraph>
            </Card.Content>
            <Button title="Go back" onPress={() => navigation.goBack()}>Retour</Button>
       </Card>
    )
}

const styles = StyleSheet.create ({
    container: {
       padding: 15,
       marginTop: 80,
       backgroundColor: 'white',
    },
    padding_bottom: {
        marginBottom:15,
        marginLeft:6,
        fontSize:15,
    },
    color_weight: {
        fontWeight: "bold",
        fontSize:17,
    },
    font_size_title:{
        fontSize:21,
        marginBottom:25,
        marginTop:10,
        fontWeight: "bold",
        alignItems:"center"
    }
 })

export default DetailApplications;