import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function instDetail({route,navigation}) {

    const {inst_name} = route.params;

    console.log(route);
    console.log(route.params);
    console.log(route.params.inst_name);

    return (
        <View>
            <Text>inst_name : {JSON.stringify(inst_name)} </Text>
        </View>
    )
}

const styles = StyleSheet.create({})
