import React from "react";
import {Button, Card, Text, Paragraph} from 'react-native-paper';
import { StyleSheet ,SafeAreaView, ScrollView} from 'react-native'



const DetailApplicationsAccepted = ({route, navigation }) => {
    const { resume,age,motivation,wage,offer} = route.params;
    const Age = age == 1 ?(<Paragraph style = {styles.padding_bottom}><Text style = {styles.color_weight}>Age:</Text> {age+" an"} </Paragraph>) : (<Paragraph style = {styles.padding_bottom}><Text style = {styles.color_weight}>Age:</Text> {age+" ans"} </Paragraph>) ;
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style = {styles.container}>
            <Card.Content>  
                <Paragraph style = {styles.font_size_title}>Detail Applications Accepted</Paragraph>
                <Paragraph style = {styles.color_weight}>Offer:</Paragraph>
                    <Text style = {styles.padding_bottom_left}>{offer}</Text>
                <Paragraph style = {styles.color_weight}>Resume:</Paragraph>
                    <Text style = {styles.padding_bottom_left}>{resume}</Text>
                <Paragraph style = {styles.color_weight}>Motivation:</Paragraph>
                    <Text style = {styles.padding_bottom_left}>{motivation}</Text>
                {Age}
                <Paragraph style = {styles.padding_bottom}><Text style = {styles.color_weight}>Wage:</Text> {wage} €</Paragraph>
            </Card.Content>
            <Button style = {styles.button_color} mode="contained" title="Go back" onPress={() => navigation.goBack()}>Retour</Button>
       </Card>
       </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
       padding: 10,
      
       backgroundColor: 'white',
    },
    padding_bottom_left: {
        marginBottom:15,
        marginLeft:6,
        fontSize:16,
        textAlign: "justify"
    },
    padding_bottom: {
        marginBottom:15,
        fontSize:16,
    },
    color_weight: {
        fontWeight: "bold",
        marginBottom:5,
        fontSize:17,
    },
    font_size_title:{
        fontSize:21,
        marginBottom:25,
        marginTop:10,
        fontWeight: "bold",
        textAlign: 'center'
    },
    button_color:{
        backgroundColor:"lightgray",
        marginTop:10,
        color:"black",
    }
 })

export default DetailApplicationsAccepted;