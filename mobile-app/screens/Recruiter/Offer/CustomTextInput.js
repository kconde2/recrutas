import React,{useEffect} from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

function CustomTextInput(props) {
  var additionnalField = {}
  Object.assign(additionnalField,props.area ? {multiline:true, numberOfLines:10}: {})
  
  return (
    <View style={{margin:10}}>
      <TextInput
        style={{backgroundColor:'#fff'}}
        label={props.field[props.attribute].text}
        value={props.field[props.attribute].value}
        flat
        onChangeText={text => {
          props.setField({...props.field, [props.attribute]: {...props.field[props.attribute], value: text}})
        }}
        error={props.field[props.attribute].error}
        {...additionnalField}
      />
    </View>

  );
}

export default CustomTextInput;
