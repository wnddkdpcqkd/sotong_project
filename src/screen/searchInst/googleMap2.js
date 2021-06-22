import 'react-native-gesture-handler';
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FormInput from '../../components/common/FormInput';
import FormButton from '../../components/common/FormButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GlobalVar} from '../../GlobalVariables';
import Geolocation from 'react-native-geolocation-service'; //iOS 참조링크: https://dev-yakuza.posstree.com/ko/react-native/react-native-geolocation-service/
import ConditionalSearchView from '../../components/searchInst/conditionalSearchView';
import TextSearchView from '../../components/searchInst/textSearchView';
import BriefInfoView from '../../components/searchInst/briefInfoView';
import {institution, findWithCareTypeaSearch} from '../../connection/query';
import {useQuery} from '@apollo/react-hooks';
import {getInst} from './getInst';
import {isTypeSystemDefinitionNode} from 'graphql';
import {prependOnceListener} from 'node:process';

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

export default function googleMap2({navigation}) {
  const {centerType, setCenterType} = useContext(GlobalVar);
  const {location, setLocation} = useContext(GlobalVar);

  ////////////////////////////////////////////////////////////
  // 마커
  const {markerList, setMarkerList} = useContext(GlobalVar);
  const {markerFlag, setMarkerFlag} = useContext(GlobalVar);

  ////////////////////////////////////////////////////////////

  const {
    treatment,
    setTreatment,
    searchCenterType,
    searchTreatmentType,
    rere,
    setRere,
  } = useContext(GlobalVar);
  const [centerName, setCenterName] = useState(''); //검색창에 입력된 문자열
  const [searchResult, setSearchResult] = useState([]);
  const [flag, setFlag] = useState(false);
  const [showOne, setShowOne] = useState();
  const [currentPos, setCurrentPos] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [mounted, setMounted] = useState(false);

  const refRBSheet = useRef();

  // const {loading, error, data_institution} = useQuery(institution);
  const {loading, error, data, refetch} = useQuery(findWithCareTypeaSearch, {
    variables: {careTypes: searchTreatmentType},
  });

  const loadCurrentLoc = () => {
    const position = Geolocation.getCurrentPosition(
      position => {
        setCurrentPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log('현재 latitude  : ', currentPos.latitude);
        console.log('현재 longitude : ', currentPos.longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

  ////////////////////////////////////////////////////////////////////////////////
  // 현재 위치에서 지도 보이게 함.
  if (!mounted) {
    loadCurrentLoc();
  }

  useEffect(() => {
    setMounted(true);
  }, []);
  ////////////////////////////////////////////////////////////////////////////////
  // marker 전체 띄움
  // useEffect(() => {
  //   if (data_institution && data_institution.Institutions) {
  //     const arr = data_institution.Institutions;
  //     setMarkerList(...markerList, arr);
  //   }
  // }, [data_institution]);

  useFocusEffect(
    useCallback(() => {
      refetch();
      console.log('Refetched!');
      console.log(
        'Length of refetched list:',
        // data.findWithCareTypeaSearch.length,
      );
    }, []),
  );

  // 필터조건 중 치료과목에 맞는 marker만 띄움
  useEffect(() => {
    if (data) {
      // console.log('Length of raw data:', data.findWithCareTypeaSearch.length);
      console.log('data changed');
      setMarkerList(data.findWithCareTypeaSearch);
    }
  }, [data]);

  // marker데이터 들어오면 markerFlag : true
  useEffect(() => {
    if (markerList.length > 0) {
      console.log('Length of list:', markerList.length);
      setMarkerFlag(true);
    }
  }, [markerList]);
  // markerList 내의 아이템들 화면에 띄워줌 (현위치 기준으로 근처에 있는 것만 보여주고 지도상에서 위치 옮기면 그 근처에 있는 것만 보여줌)
  const showMarker = arr => {
    if (arr.length > 0) {
      return arr.map(item => {
        if (
          Math.abs(item.latitude - currentPos.latitude) <
            currentPos.latitudeDelta / 2 &&
          Math.abs(item.longitude - currentPos.longitude) <
            currentPos.longitudeDelta / 2
        ) {
          return (
            <Marker
              width={50}
              height={50}
              key={item.id}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              image={require(markerIMG)}
              title={item.institution_name}
              onPress={() => {
                setShowOne(item);
                setFlag(true);
              }}
            />
          );
        }
      });
    }
  };
  ////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* 검색창(TextSearchView.js) View */}
      <TextSearchView
        onGoBackButtonPress={() => {
          refRBSheet.current.open();
        }}
        labelValue={centerName}
        onChangeText={str => {
          setCenterName(str);
        }}
      />

      {/* 조건부검색(ConditionalSearchView.js) View */}
      <ConditionalSearchView
        locationButtonTitle={location}
        centerTypeButtonTitle={centerType}
        careTypeButtonTitle="치료과목"
        selectedCenterType={searchCenterType[0]}
        locationButtonOnPress={() => {
          navigation.navigate('filter');
        }}
        centerTypeButtonOnPress={() => {
          navigation.navigate('filter');
        }}
        careTypeButtonOnPress={() => {
          navigation.navigate('filter');
        }}
        filterButtonOnPress={() => {
          navigation.navigate('filter');
        }}
      />

      {/* 지도 View */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          showsUserLocation={true}
          showsMyLocationButton={true} //iOS에서 NSLocationWhenInUseUsageDescription key in Info.plist필요, 참조: https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
          zoomControlEnabled={true}
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
            setFlag(false);
          }}
          onRegionChange={region => {
            setCurrentPos({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
          }}
          initialRegion={{
            latitude: currentPos.latitude > 0 ? currentPos.latitude : 37.564362,
            longitude:
              currentPos.longitude > 0 ? currentPos.longitude : 126.977011,
            latitudeDelta:
              currentPos.latitudeDelta > 0 ? currentPos.latitudeDelta : 0.015,
            longitudeDelta:
              currentPos.longitudeDelta > 0
                ? currentPos.longitudeDelta
                : 0.0121,
          }}>
          {/****************************************************************************/}
          {/*			 						마커									 */}
          {markerFlag && showMarker(markerList)}
          {/****************************************************************************/}
        </MapView>

        {/* 지도 하단 근처치료기관보기(institutionsNearby) 버튼 */}
        <TouchableOpacity
          style={styles.institutionsNearby}
          onPress={() => {
            refRBSheet.current.open(); //전체검색결과 보여줌
          }}>
          <Text>근처 치료기관 보기</Text>
        </TouchableOpacity>

        {/* 개별 마커 선택시 간략정보창(BriefInfoView) 띄우기 */}
        {flag && (
          <BriefInfoView
            imageSource={require('../../assets/image/filter.png')}
            instName={showOne.institution_name}
            instInfo={showOne.id}
          />
        )}
      </View>

      {/* 전체 검색 결과 리스트 */}
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
        height={windowHeight * 0.9}>
        <ScrollView>
          {data && <Text style={{textAlign: 'center'}}>
            {data.findWithCareTypeaSearch.length}개의 검색 결과가 있습니다.
          </Text>}
          {data && data.findWithCareTypeaSearch.map((mem, key) => {
            return (
              <TouchableOpacity
                key={key}
                style={styles.searchResultList}
                onPress={() => {
                  //개별기관 정보페이지로
                }}>
                <Text style={{fontSize: 16}}>{mem.institution_name}</Text>
                <Text style={{fontSize: 14}}>{mem.address}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  instIcon: {
    width: 90,
    height: 90,
  },
  filterContainer: {
    flex: 2,
  },
  mapContainer: {
    flex: 20,
  },
  institutionsNearby: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    right: 0,
    bottom: 0,
    height: windowHeight / 16,
    width: windowWidth,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchResultList: {
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
  },
});
