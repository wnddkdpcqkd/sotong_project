/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, useEffect} from 'react';
 //import 'react-native-gesture-handler';
 //import AppStack from './src/AppStack';
 import HomeStack from './src/navigator/stack';
 import {NavigationContainer} from '@react-navigation/native';
 //import { SearchProvider } from './src/SearchProvider';
 //import SplashScreen from 'react-native-splash-screen';
 
 // SearchProvider에서는 전역변수를 선언, 배포하고 AppStack에서는 navigation으로 스크린들 간의 구조를 정의. 그리고 그 안에 여러가지 스크린들이 들어있는 구조임.
 export default function App () {
//  useEffect(()=>{
//    setTimeout(() => {
//      SplashScreen.hide();
//    }, 1000);
//  },[])
   return (
     <NavigationContainer>
       {/* <SearchProvider>  */}
         <HomeStack />
       {/* </SearchProvider>  */}
     </NavigationContainer>
   );
 }
