import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const FormButton = ({buttonTitle, onPress, selected, ...rest}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: selected? '#FA8072' : '#ffffff',
        borderColor: '#FA8072',
        borderWidth:1,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        alignSelf: 'flex-start',
      }}
      onPress={onPress}
      {...rest}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: selected? '#ffffff' : '#FA8072',
          fontFamily: 'Lato-Regular',
        }}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;
