import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalStyle } from '../../assets/style/globalStyle'

export default function logoIMG({imgStyle}) {
    return (
        <View>
          <Image 
            style={imgStyle}
            source={require('../../assets/image/logo_v1.png')}/>
        </View>
    )
}

