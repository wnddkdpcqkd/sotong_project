import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function divider(props) {
    return <View style={{
            backgroundColor: props.color,
            height : props.height || 1
        }}></View>
}

const styles = StyleSheet.create({
});
