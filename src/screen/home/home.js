import React, {useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SearchBox from '../../components/common/searchBox';
import { globalStyle } from '../../assets/style/globalStyle'
import LogoIMG from '../../components/common/logoIMG'
import HomeText from '../../components/home/homeText'
import HomeSlider from '../../components/home/homeSlider'
import { institution } from '../../connection/query';
import { GlobalVar } from '../../GlobalVariables';

////////////로그인 체크////////////
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { NaverLogin, getProfile } from '@react-native-seoul/naver-login';
//////////////////////////////////




import {useQuery} from '@apollo/react-hooks';
import { type } from 'node:os';





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = ({navigation}) => {


	////////////////////////////////////////////////////////////////////
	/////////////////////////   로그인 체크   ///////////////////////////
	////////////////////////////////////////////////////////////////////
	const {loginCheck, setLoginCheck} = React.useContext(GlobalVar)
	AsyncStorage.getItem('loginMethod', (err,result) => {
		
		/////	네이버 소셜 로그인
		if(result === 'naver' ){
			const loginMethod = AsyncStorage.getItem('token', async (err,result) => {

				const token = JSON.parse(result)
				const profileResult = await getProfile(token.accessToken);
					
				if(profileResult.message === "success"){
					setLoginCheck(true);
				}
				
			})

		}
	})
	AsyncStorage.getItem('profile',(err,result) => {
		const profile = JSON.parse(result)
		console.log("[home] profile : " , profile);
	})
	





return (
	<View style={globalStyle.container}>

		{/* 맨 위 로고 */}
		<View style={styles.logoContainer}>
		<LogoIMG imgStyle={globalStyle.homeLogo}></LogoIMG>
		<HomeText></HomeText>
		</View>


		{/* 검색 버튼 */}
		<View style={styles.searchBoxContainer}>
		<View style={globalStyle.homeSearchBoxView}>
			<TouchableOpacity
			onPress={() => {navigation.navigate('search')}}
			style={{marginBottom:130}}
			>
			<SearchBox autoCorrect={false} editable={false}/>
			</TouchableOpacity>
		</View>
		</View>


		{/* 컨텐츠 */}
		<View style={styles.contentContainer}>
		
		</View>


		{/* 슬라이더 */}
		<View style={styles.sliderContainer}>
		<HomeSlider></HomeSlider>
		</View>


	</View>
);
};

export default App;

const styles = StyleSheet.create({
logoContainer:{
	flex : 4, 
	alignItems:'center', 
	backgroundColor:'white',
	width: '100%',
},
searchBoxContainer: {
	flex : 2, 
	width : 0.8 * windowWidth, 
	alignItems : 'center',
	backgroundColor:'white',
},
contentContainer :{
	flex : 5,
	backgroundColor: 'white',
},
sliderContainer :{
	flex : 3,
	backgroundColor: 'white',
},

});