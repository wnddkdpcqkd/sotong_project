import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import FormInput from '../common/FormInput';
const windowWidth = Dimensions.get('window').width;

const TextSearchView = ({onGoBackButtonPress, labelValue, onChangeText}) => {
  return (
    <View style={styles.textSearchContainer}>
      <TouchableOpacity
        style={styles.textSearch}
        onPress={
          onGoBackButtonPress
        }>
        <Image
          style={styles.goBackIcon}
          source={require('../../assets/image/arrow_left.png')}
        />
      </TouchableOpacity>
      <View style={{flex: 9}}>
        <FormInput
          labelValue={labelValue}
          onChangeText={onChangeText}
          placeholderText="병원 또는 센터를 검색하세요"
          iconType={require('../../assets/image/magnifier.png')}
          autoCapitalize="none"
          autoCorrect={false}
          editable={true}
        />
      </View>
    </View>
  );
}

export default TextSearchView;

const styles = StyleSheet.create({
  textSearchContainer: {
    flex: 2,
    marginTop: 3,
    flexDirection: 'row',
  },
  textSearch: {
    flex: 1,
    paddingLeft: windowWidth / 20,
    paddingTop: 15,
  },
  goBackIcon: {
    width: 17,
    height: 17,
  },
});
