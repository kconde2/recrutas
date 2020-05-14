import React from 'react';
import DatePicker from 'react-native-datepicker'
import { View } from 'react-native';
import { Text } from 'react-native-paper';

function CustomDatePicker(props) {
  return (
    <View style={{margin:10, backgroundColor:"#fff"}}>
      <Text style={{marginLeft:5}}>{props.field[props.attribute].text}</Text>
      <DatePicker
            date={props.field[props.attribute].value}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate={props.field[props.attribute].value}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {props.setField({...props.field, [props.attribute]: {...props.field[props.attribute], value: date}})}}
            showIcon={false}
            customStyles={{
              dateInput: {
                flex:1,
                borderColor:"#fff",
                borderBottomColor:"#ffe"
      }}}
    />
    </View>
  );
}

export default CustomDatePicker;
