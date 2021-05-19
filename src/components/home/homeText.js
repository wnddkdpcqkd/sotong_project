import React from 'react'
import { Text, View } from 'react-native'
import { globalStyle } from '../../assets/style/globalStyle'

export default function homeText() {
    return (
        <View style={globalStyle.homeTextContainer}>
          <Text style={globalStyle.fontJalnan}>소통하세요 ;)</Text>
          <Text style={globalStyle.fontGothic}>소아재활 정보 검색</Text>
        </View>
    )
}
