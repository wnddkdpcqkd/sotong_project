import React from 'react';
import {View, TextInput, Dimensions, Image} from 'react-native';
import { globalStyle } from '../../assets/style/globalStyle'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function searchBox ({placeholderText, ...rest}) {
    return(
        <View style={globalStyle.searchBoxContainer}>
            <TextInput
                style= {globalStyle.searchBoxInput}
                numberOfLines={1}
                placeholder="병원 또는 센터를 검색하세요"
                placeholderTextColor="#666"
                {...rest}
            />
            
            <View style={globalStyle.searchBoxIconStyle}>
                <Image style={{width: 25, height: 25}} source={require('../../assets/image/magnifier.png')}/>
            </View>
            
        </View>
        
    )
}
