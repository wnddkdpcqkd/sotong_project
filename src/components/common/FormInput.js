import React from 'react';
import {View, TextInput, StyleSheet, Dimensions, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />      
      <View style={styles.iconStyle}>
        <Image style={{width: 25, height: 25}} source={require('../../assets/image/magnifier.png')}/>
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#f0aa98',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});