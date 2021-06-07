import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import FormButton from '../common/FormButton';

const ConditionalSearchView = ({locationButtonTitle, locationButtonOnPress, centerTypeButtonTitle, centerTypeButtonOnPress, careTypeButtonTitle, careTypeButtonOnPress, filterButtonOnPress, selectedCenterType})=> {
  return (
    <View style={styles.conditionalSearchContainer}>
      <View style={styles.conditionalSearchButtonContainer}>
        <View style={styles.conditionalSearchButton}>
          <FormButton
            buttonTitle={locationButtonTitle}
            selected={true}
            onPress={() => {
              locationButtonOnPress;
            }}
          />
        </View>
        <View style={styles.conditionalSearchButton}>
          <FormButton
            buttonTitle={centerTypeButtonTitle}
            selected={selectedCenterType}
            onPress={
              centerTypeButtonOnPress
            }
          />
        </View>
        <View style={styles.conditionalSearchButton}>
          <FormButton
            buttonTitle={careTypeButtonTitle}
            selected={true}
            onPress={
              careTypeButtonOnPress
            }
          />
        </View>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingTop: 5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
          onPress={
            filterButtonOnPress
          }>
          <Image
            style={styles.filterIcon}
            source={require('../../assets/image/filter.png')}
          />
          <Text style={{fontSize: 17, padding: 5}}>필터</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ConditionalSearchView;

const styles = StyleSheet.create({
  conditionalSearchContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  conditionalSearchButtonContainer: {
    flex: 8,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  conditionalSearchButton: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
  },
});
