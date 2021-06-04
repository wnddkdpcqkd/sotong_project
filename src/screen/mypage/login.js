import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import {signInWithKakao, signOutWithKakao, getInfo} from './kakao'


export default function login() {
    return (
        <View>
            <Button 
                title = "로그인"
                onPress = {() => {
                signInWithKakao()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
