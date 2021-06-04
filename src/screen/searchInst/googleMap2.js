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
import LogoIMG from '../../components/common/logoIMG';
import { globalStyle } from '../../assets/style/globalStyle';
import SearchBox from '../../components/common/searchBox';
import { institution } from '../../connection/query';

//gpl
import {useQuery} from '@apollo/react-hooks';






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




const googleMap = ({navigation}) => {
    const refRBSheet = useRef();
    const [currentPos, setCurrentPos] = useState({
        latitude : 0,
        longitude : 0
    })

    const [instLoc, setInstLoc] = useState([]);

    const setMarker = async() =>{
        const {loading, error, data} = await useQuery(institution);
        await setInstLoc(data.Institutions)
        instLoc.map(item => {
            return(
                <Marker
                    width={20}
                    height={20}
                    coordinate={{latitude : item.latitude, longitude: item.longitude}}
                    image={require(markerIMG)} 
                >
                </Marker>
            )
        }) 
    }


    useEffect(() => {
        const loadCurrentLoc = async() =>{
            const position = await Geolocation.getCurrentPosition(            
                position =>{
                    setCurrentPos({
                        latitude : position.coords.latitude,
                        longitude : position.coords.longitude
                    });
                },
                error => {
                    console.log(error.code, error.message);
                },
            );
        }
        loadCurrentLoc();
        console.log('현재 latitude  : ', currentPos.latitude);
        console.log('현재 longitude : ', currentPos.longitude); 
    },[]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

        {/* 검색창 */}
        <View style={styles.headerSearch}>
            <View style={{ flex : 1 }} >
                <LogoIMG imgStyle={globalStyle.mapLogo} />
            </View>
            <View style={{flex : 3 }}>
                {/* <TouchableOpacity onPress={()=>{refRBSheet.current.open()}}> */}
                <TouchableOpacity onPress={()=>{navigation.navigate('filter')}}>
                    <SearchBox />
                </TouchableOpacity>
            </View>
        </View>

        {/* 필터영역 */}
        <View style={{flex : 1, backgroundColor: 'yellow'}}>

        </View>



        {/* 지도 */}
        <View style={{flex: 10}}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{...StyleSheet.absoluteFillObject}}
                showsUserLocation={true}
                showsMyLocationButton={true} //iOS에서 NSLocationWhenInUseUsageDescription key in Info.plist필요, 참조: https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
                zoomControlEnabled={true}
                onPress={e => {
                    console.log(e.nativeEvent.coordinate);
                    setCenterIndex(-1);
                    setFlag(false);     
                }}
                initialRegion={{
                latitude: currentPos.latitude > 0 ? currentPos.latitude : 37.564362,
                longitude: currentPos.longitude > 0 ? currentPos.longitude : 126.977011,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}>

                {/* {setMarker()} */}
            </MapView>
        </View>


        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            right: 0,
            bottom: 0,
            height: windowHeight / 16,
            width: windowWidth,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            justifyContent:'center'
          }}
          onPress={()=>{
            refRBSheet.current.open();
          }}
          >
            <Text>근처 치료기관 보기</Text>
          </TouchableOpacity>
        {flag && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#FFFFFF',
              right: 0,
              bottom: 0,
              height: windowHeight / 8,
              width: windowWidth,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <Image
                style={{
                  width: windowHeight / 8,
                  height: windowHeight / 8,
                }}
                source={require('../../assets/image/filter.png')}
              />
            </View>
            <View style={{flex: 4}}>
              <Text style={{fontSize: 16, color: '#000'}}>{showOne.name}</Text>
            </View>
          </View>
        )}
      </View> */}
      





      {/* <RBSheet
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
        height={windowHeight*0.9}>
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
      </RBSheet> */}
    </View>
  );
};

export default googleMap;

const styles = StyleSheet.create({
    headerSearch :{
        flex : 1,
        flexDirection : 'row',
    },
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
