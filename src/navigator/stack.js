import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './bottomTab';

const Stack = createStackNavigator();

export default function stack(){ //screen들간의 구조를 선언
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{
          // title: 'SoTong',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="ListSearch"
        component={ListSearchScreen}
        options={{title: '세부검색'}}
      />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        // options={{title: '세부검색'}}
      /> */}
    </Stack.Navigator>
  );
};

