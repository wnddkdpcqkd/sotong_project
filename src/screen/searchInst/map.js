import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Image ,TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { globalStyle } from '../../assets/style/globalStyle';
import SearchBox from '../../components/common/searchBox';
import LogoIMG from '../../components/common/logoIMG';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import RBSheet from 'react-native-raw-bottom-sheet';
import search from './search';
import RawBottomSheet from '../../components/searchInst/rawBottomSheet';

const markerIMG = '../../assets/image/marker_round.png'


const setMarker = (inst) => {
    return(
        inst.map((item) => (
        <Marker 
            width={20}
            height={20}
            key={item.idx}
            coordinate={{latitude : item.latitude, longitude: item.longitude}}
            image={require(markerIMG)} 
        >
        </Marker>
        )
    ));
}

export default function mapSearch({navigation}) {


    //RBSheet에서 선택한 기관
    const [selectedInst, setSelectedInst] = useState({
        
    });

    const refRBSheet = useRef();
    const P0 = {latitude: 37.564362, longitude: 126.977011};

    return (
        <View style={globalStyle.container}>



            {/* 검색창 
            TouchableOpacity onPress -> 클릭시 searchedList 값 변경 
            */}
            <View style={styles.headerSearch}>
                <View style={{flex : 1, backgroundColor : 'red'}} >
                    <LogoIMG imgStyle={globalStyle.mapLogo} />
                </View>
                <View style={{flex : 3, backgroundColor : 'yellow'}}>
                    {/* <TouchableOpacity onPress={()=>{refRBSheet.current.open()}}> */}
                    <TouchableOpacity onPress={()=>{navigation.navigate('search')}}>
                        <SearchBox />
                    </TouchableOpacity>
                </View>
            </View>



            {/* 지도 */}
            {/* 처음 검색창 들어갈때만 마커 보이고 두번째부터는 마커 미아됨 */}
            {/* <View style={styles.mapView}> */}
            <NaverMapView style={{flex : 9, width: '100%'}}
                                    showsMyLocationButton={false}
                                    center={{ ...P0, zoom: 16}}
                >  
                    {/* { setMarker(instInfo) } */}
            </NaverMapView>
            {/* </View> */}





            {/* RBSheet */}
            {/* <RawBottomSheet refRBSheet={refRBSheet} searchedList={searchedList} /> */}


        </View>

    )
}

const styles = StyleSheet.create({
    headerSearch :{
        flex : 1,
        flexDirection : 'row',
    },

    mapView : {
        flex : 8,
        width : '100%',
    },

});











