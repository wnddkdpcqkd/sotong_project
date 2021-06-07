import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BriefInfoView = ({imageSource, instName, instInfo}) => {
  return (
    <View style={styles.selectedMarker}>
    <View style={{flex: 1}}>
      <Image
        style={{
          width: windowHeight / 8,
          height: windowHeight / 8,
        }}
        source={imageSource}
      />
    </View>
    <View style={{flex: 4}}>
      <Text style={{fontSize: 16, color: '#000'}}>{instName}</Text>
      <Text style={{fontSize: 16, color: '#000'}}>{instInfo}</Text>
    </View>
  </View>
  );
}

export default BriefInfoView;

const styles = StyleSheet.create({
    selectedMarker: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        right: 0,
        bottom: 0,
        height: windowHeight / 8,
        width: windowWidth,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
      },
});
