import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import SearchBox from '../../components/common/searchBox';
import {globalStyle} from '../../assets/style/globalStyle';
import LogoIMG from '../../components/common/logoIMG';
import FormInput from '../../components/common/FormInput';
import FormButton from '../../components/common/FormButton';
import {GlobalVar} from '../../GlobalVariables';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const filter = ({navigation}) => {
  const [centerName, setCenterName] = useState('');
  const [rerender, setRerender] = useState(true);
  const {
    centerType,
    setCenterType,
    location,
    setLocation,
    treatment,
    setTreatment,
    centerTypeList,
    treatmentList,
    searchCenterType,
    setSearchCenterType,
    searchTreatmentType,
    setSearchTreatmentType,
    rere,
    setRere,
  } = useContext(GlobalVar);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 2,
          // marginLeft: windowWidth / 16,
          // marginRight: windowWidth / 16,
          marginTop: 3,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flex: 1, paddingLeft: windowWidth / 20, paddingTop: 15}}
          onPress={() => {
            navigation.navigate('home');
          }}>
          <Image
            style={{width: 17, height: 17}}
            source={require('../../assets/image/arrow_left.png')}
          />
        </TouchableOpacity>
        <View style={{flex: 9}}>
          <FormInput
            labelValue={centerName}
            onChangeText={str => {
              setCenterName(str);
            }}
            placeholderText="병원 또는 센터를 검색하세요"
            iconType={require('../../assets/image/magnifier.png')}
            autoCapitalize="none"
            autoCorrect={false}
            editable={true}
          />
        </View>
      </View>
      <View style={{flex: 2, paddingLeft: 5}}>
        <FormButton buttonTitle={location} />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18, paddingLeft: 5}}>병원 유형</Text>
      </View>
      <View
        style={{flex: 2, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {centerTypeList.map((item, key) => {
          if (key === 0) {
            return (
              <FormButton
                buttonTitle={item}
                key={key}
                selected={searchCenterType[key]}
                onPress={() => {
                  setSearchCenterType([1, 0, 0, 0]);
                }}
              />
            );
          } else
            return (
              <FormButton
                buttonTitle={item}
                key={key}
                selected={searchCenterType[key]}
                onPress={() => {
                  if (!searchCenterType[key]) {
                    searchCenterType[key] = 1;
                    searchCenterType[0] = 0;
                    console.log(searchCenterType[key]);
                  } else {
                    searchCenterType[key] = 0;
                  }
                  setRerender(!rerender);
                }}
              />
            );
        })}
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18, paddingLeft: 5}}>치료 과목</Text>
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignContent: 'space-around',
        }}>
        {treatmentList.map((item, key) => {
          return (
            <FormButton
              buttonTitle={item}
              key={key}
              selected={searchTreatmentType[key]}
              onPress={() => {
                searchTreatmentType[key] = !searchTreatmentType[key];
                setRerender(!rerender);
              }}
            />
          );
        })}
      </View>
      <View style={{flex: 6}}></View>
      <TouchableOpacity
        style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
        <FormButton
          buttonTitle="검색하기"
          selected={true}
          onPress={() => {
            navigation.navigate('home');
            setRere(!rere);
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default filter;

const styles = StyleSheet.create({
  logoContainer: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  searchBoxContainer: {
    flex: 2,
    width: 0.8 * windowWidth,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 5,
    backgroundColor: 'white',
  },
  sliderContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
});
