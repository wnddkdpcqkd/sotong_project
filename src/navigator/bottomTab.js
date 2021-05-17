import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/home/home';


const Tab = createBottomTabNavigator(); // Tab의 구조 선언
const homeIcon = '../assets/image/home_click.png';

const TabBarIcon = (focused, name) => {
  let iconName, fontSize;
  if (name === '홈') {
    iconName = focused ? require(homeIcon) : require(homeIcon);
  } else if (name === '지도') {
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
      {/* <Tab.Screen name="지도" component={MapScreen} />
      <Tab.Screen name="홈Test" component={HomeTest} />
      <Tab.Screen name="커뮤니티" component={MapTestScreen} />
      <Tab.Screen name="My Page" component={MyPageScreen} /> */}
      
    </Tab.Navigator>
  );
};
