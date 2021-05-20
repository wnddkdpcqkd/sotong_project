import React, { Component, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import Divider from '../../components/common/divider'

export default function reply(props) {
  return (
    <View style={{backgroundColor : 'white'}}>
      
      <Divider color='gray'/>

      <View style={{            
        height: 80,
        flexDirection : 'row',
        alignItems: "stretch",
        alignSelf: "stretch",
        justifyContent: "space-around",
        backgroundColor: 'yellow'}
      }>
           
        {/* 프로필 IMG */}
        <View style={{flex : 1, backgroundColor : 'white',}}>
          <Image
            source={require("../../assets/image/dog.png")}
            resizeMode="cover"
            style={{
              marginTop : 20,
              marginLeft : 20,    
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
          />
        </View>

        {/* 프로필명 */}
          <View style={{flex : 3, backgroundColor : 'white',}}>
            <Text style={{marginTop :20, marginLeft: 0, fontSize : 15, fontWeight: 'bold'}}> {props.profileName || '안넘어왔을 때'} </Text>
            <Text style={{marginTop : 5, marginLeft : 0, fontSize : 15}} > {props.replyTime || '20분전'}</Text>
          </View>
        </View>

        {/* Body-Text부분 */}
        <View style={{marginTop : 10, marginLeft : 20, marginBottom : 10}}>
            <Text>{props.replyContent}</Text> 
          
        </View>

        
    </View>
  )
}

const styles = StyleSheet.create({})
