import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";



export default function map() {
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P5 = {latitude: 37.565383, longitude: 126.976292};
    const markerIMG = '../../assets/image/marker_round.png'

    return (
    <NaverMapView style={{width: '100%', height: '100%'}}
                         showsMyLocationButton={true}
                         center={{...P0, zoom: 16}}
                         onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                         onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                         onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                         >

                    {/* <Marker coordinate={P0} image=                    */}
                    <Marker coordinate={P5} width={20} height={20} onClick={(key)=> console.log(key)} image={require(markerIMG)}></Marker> 
                    <Marker coordinate={P1} width={20} height={20} onClick={(key)=> console.log(key)} image={require(markerIMG)}></Marker>
    </NaverMapView>
    )
}

