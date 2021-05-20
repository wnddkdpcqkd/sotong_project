import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {enableScreens} from 'react-native-screens';

enableScreens();

export default function instDetail({navigation}) {

    // const {inst_name} = route.params;

    // console.log('int instDetail', inst_name);
    // console.log(route);
    // console.log(route.params);
    // console.log(route.params.inst_name);

    //inst_id , inst_name으로 해당 화면에 필요한 데이터를 api로 요청


    return (
        <View>
            <Text>inst_name : </Text>
        </View>
    )
}

const styles = StyleSheet.create({})
