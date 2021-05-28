import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
// 사용자정의모듈

//import {clinic_info_query} from '../../connection/query';

export default function testScreen() {

const clinic_info_query = gql`
    {
      Sotongs {
            id 
            name
            hello 
        }
    }   
`;

    const { loading, error, data } = useQuery(clinic_info_query);
    
    if (loading) return ( <Text> 'Loading...' </Text>)
    if (error) return (<Text> `Error! ${error.message}` </Text>)
    if (data && data.Sotongs){
      return(
        data.Sotongs.map((item,key) => {

          
          console.log( "item : " , item);
          console.log( "item.id : " , item.id);
          console.log( "item.name : " , item.name);
          console.log( "item.hello : " , item.hello);
          <View>
            <Text key={key} > id : {item.id}, name : {item.name} , hello : {item.hello} </Text>
          </View>
          
        })
      )
    }

}

const styles = StyleSheet.create({})
