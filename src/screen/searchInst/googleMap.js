import 'react-native-gesture-handler';
import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
  Button,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import FormInput from '../../components/common/FormInput';
import FormButton from '../../components/common/FormButton';
import RBSheet from 'react-native-raw-bottom-sheet';
// import SwitchSelector from 'react-native-switch-selector';
import {GlobalVar} from '../../GlobalVariables';
// import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service'; //iOS 참조링크: https://dev-yakuza.posstree.com/ko/react-native/react-native-geolocation-service/

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const markerIMG = '../../assets/image/marker_round.png';
const arrayMultiplication = (arr1, arr2) => {
  let sum = 0;
  arr1.map((mem, key) => {
    sum += mem * arr2[key];
  });
  return sum;
};
const latList = [];
const longList = [];
const contactList = [];
const idList = []; //기관명 리스트
const addressList = [];
// const markerImage = require('../assets/marker_round.png');
// const selectedMarkerImage = require('../assets/marker_selected.png');

const treatmentTypes = [
  '운동재활치료',
  '감각재활치료',
  '놀이치료',
  '행동치료',
  '언어치료',
  '심리치료',
  '심리운동치료',
  '청능치료',
  '음악치료',
  '미술치료',
];
const treatmentStates = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];

const dataset = [
  {
    name: '센터1',
    latitude: 37.564362,
    longitude: 126.977011,
    type: 3,
    care_type: [1, 1, 0, 0, 0, 0, 0, 0],
  },
  {
    name: '센터2',
    latitude: 37.565051,
    longitude: 126.978567,
    type: 3,
    care_type: [1, 0, 1, 1, 1, 0, 0, 0],
  },
  {
    name: '센터3',
    latitude: 37.565383,
    longitude: 126.976292,
    type: 3,
    care_type: [1, 0, 1, 0, 0, 1, 1, 1],
  },
];

const googleMap = ({navigation}) => {
  const {centerType, setCenterType} = useContext(GlobalVar);
  const {location, setLocation} = useContext(GlobalVar);
  const {
    treatment,
    setTreatment,
    searchCenterType,
    searchTreatmentType,
    rere,
    setRere,
  } = useContext(GlobalVar);
  const [centerName, setCenterName] = useState(''); //검색창에 입력된 문자열
  const [currentLocLat, setCurrentLocLat] = useState(0);
  const [currentLocLong, setCurrentLocLong] = useState(0);
  const [centerIndex, setCenterIndex] = useState(-1); //마커와 기관명을 매칭
  const [careType, setCareType] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const treatmentBottomSheet = useRef();

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};
  const P3 = {latitude: 37.5017, longitude: 127.0046}; //서울성모
  const P4 = {latitude: 0, longitude: 0};

  const refRBSheet = useRef();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    console.log('Ask location permission');
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocLat(position.coords.latitude);
        setCurrentLocLong(position.coords.longitude);
        console.log('currentLat: ', currentLocLat);
        console.log('currentLong: ', currentLocLong);
      },
      error => {
        console.log(error.code, error.message);
      },
      {timeout: 1500, enableHighAccuracy: true, showLocationDialog: true},
    );
    {
      if (centerName.length > 0) {
        setSearchResult(dataset.filter(mem => mem.name.includes(centerName)));
      } else {
        setSearchResult(dataset);
      }
    }
  }, [centerName, rere]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 2,
          marginTop: 3,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flex: 1, paddingLeft: windowWidth / 20, paddingTop: 15}}
          onPress={() => {
            refRBSheet.current.open();
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
      <View style={{flex: 2, flexDirection: 'row'}}>
        <View style={{flex: 8, flexWrap: 'wrap', justifyContent: 'flex-start'}}>
          <View style={{paddingLeft: 10, paddingTop: 5}}>
            <FormButton
              buttonTitle={location}
              selected={true}
              onPress={() => {
                navigation.navigate('filter');
              }}
            />
          </View>
          <View style={{paddingLeft: 10, paddingTop: 5}}>
            <FormButton
              buttonTitle={centerType}
              selected={searchCenterType[0]}
              onPress={() => {
                navigation.navigate('filter');
              }}
            />
          </View>
          <View style={{paddingLeft: 10, paddingTop: 5}} onPress={() => {}}>
            <FormButton
              buttonTitle="치료과목"
              selected={true}
              onPress={() => {
                navigation.navigate('filter');
              }}
            />
          </View>
        </View>
        <View style={{flex: 2}}>
          <TouchableOpacity
            style={{
              paddingLeft: 10,
              paddingTop: 5,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              navigation.navigate('filter');
            }}>
            <Image
              style={{width: 20, height: 20, marginTop: 7}}
              source={require('../../assets/image/filter.png')}
            />
            <Text style={{fontSize: 17, padding: 5}}>필터</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 20}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          showsUserLocation={true}
          showsMyLocationButton={true} //iOS에서 NSLocationWhenInUseUsageDescription key in Info.plist필요, 참조: https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
          zoomControlEnabled={true}
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
            setCenterIndex(-1);
          }}
          initialRegion={{
            latitude: currentLocLat > 0 ? currentLocLat : 37.564362,
            longitude: currentLocLong > 0 ? currentLocLong : 126.977011,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {searchResult.map((mem, key) => {
            if (searchCenterType[0] || searchCenterType[mem.type]) {
              //센터유형 맞는 경우에만 보여줌.
              if (arrayMultiplication(searchTreatmentType, mem.care_type)) {
                return (
                  <Marker
                    coordinate={{
                      latitude: mem.latitude,
                      longitude: mem.longitude,
                    }}
                    image={require(markerIMG)}
                    key={key}
                    onPress={() => {
                      refRBSheet.current.open();
                    }}
                  />
                );
              }
            }
          })}
        </MapView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        height={Dimensions.get('window').height / 2}>
        <ScrollView>
          {searchResult.map((mem, key) => {
            if (searchCenterType[0] || searchCenterType[mem.type]) {
              //센터유형 맞는 경우에만 보여줌.
              if (arrayMultiplication(searchTreatmentType, mem.care_type)) {
                console.log(
                  key,
                  '번째 treatment type 맞는지 여부는? ',
                  arrayMultiplication(searchTreatmentType, mem.care_type),
                );
                return (
                  <TouchableOpacity
                    key={key}
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      borderColor: '#FA8072',
                      borderWidth: 1,
                      borderRadius: 10,
                      height: 100,
                      backgroundColor: 'white',
                      padding: 5,
                      marginTop: 5,
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      //개별기관 정보페이지로
                    }}>
                    <View style={{flex: 1}}>
                      <Image
                        style={{
                          width: 90,
                          height: 90,
                        }}
                        source={require('../../assets/image/filter.png')}
                      />
                    </View>
                    <View style={{flex: 2}}>
                      <Text style={{fontSize: 16, color: '#000'}}>
                        {mem.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }
          })}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default googleMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  logo: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
    paddingBottom: 100,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },
  button: {
    height: 33,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: '#FA8072',
    marginRight: 5,
    marginTop: 3,
  },
  optionText: {
    fontSize: 15,
    paddingLeft: 15,
  },
  optionButton: {
    borderColor: '#FA8072',
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
  },
  horizontalRegion: {flex: 4, flexDirection: 'row', backgroundColor: '#EEEEE8'},
});
