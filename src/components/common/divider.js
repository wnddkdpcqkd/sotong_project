import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function divider(props) {
    return <View style={[styles.container,{backgroundColor: props.color}]}></View>
}

const styles = StyleSheet.create({
    container: {
        height: 1,
      }
});
