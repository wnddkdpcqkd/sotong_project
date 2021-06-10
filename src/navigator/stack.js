import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './bottomTab';
import Search from '../screen/searchInst/search';
import PostDetail from '../screen/community/postDetail'
import WritePost from '../screen/community/writePost';
//import Search from '../screen/mapSearch/searchPage';
import filter from '../screen/searchInst/filter';
import loginButtonPage from '../screen/mypage/loginButtonPage';


const Stack = createStackNavigator();

export default function stack({navigation}){ //screen들간의 구조를 선언
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="home"
        component={BottomTab}
        options={{
          // title: 'SoTong',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: '세부검색',
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="postDetail"
        component={PostDetail}
        // options={{title: '세부검색'}}
      />

      <Stack.Screen
        name="writePost"
        component={WritePost}
        options ={
          {
            title : '글쓰기',
            headerTitleAlign : 'center'
          }
        }
      />
      <Stack.Screen
        name="filter"
        component={filter}
        options={{
          title: '세부검색',
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="loginButtonPage"
        component={loginButtonPage}
        options={{
          title: '로그인',
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};

