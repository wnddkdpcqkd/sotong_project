import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/home/home';
import Map from '../screen/searchInst/map';
import PostDetail from '../screen/community/postDetail';


const Tab = createBottomTabNavigator(); // Tab의 구조 선언

const TabBarIcon = (focused, name) => {
  let iconName, fontSize;
  if (name === '홈') {
    iconName = focused ? require('../assets/image/home_click.png') : require('../assets/image/home.png');
  } else if (name === '검색') {
    iconName = focused ? require('../assets/image/placeholder_click.png') : require('../assets/image/placeholder.png');
  } else if (name === '홈Test') {
    iconName = focused ? require('../assets/image/current_location.png') : require('../assets/image/chat.png');
  } else if (name === '커뮤니티') {
    iconName = focused ? require('../assets/image/chat_click.png') : require('../assets/image/chat.png');
  } else if (name === 'My Page') {
    iconName = focused ? require('../assets/image/user_click.png') : require('../assets/image/user.png');
  }
  return (
    <Image
      style={{
        width: 20,
        height: 20,
      }}
      source={iconName}
    />
  );
};

export default function bottomTab (){
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({route}) => ({
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
      })}>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="검색" component={Map} />
      <Tab.Screen name="커뮤니티" component={PostDetail} />
      {/* <Tab.Screen name="커뮤니티" component={MapTestScreen} /> */}
      {/* <Tab.Screen name="My Page" component={MyPageScreen} /> */}
      
    </Tab.Navigator>
  );
};

