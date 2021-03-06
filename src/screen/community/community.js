import React, {Component, useState, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button  } from 'react-native'
import Post from '../../components/community/post'
import ActionButton from 'react-native-action-button';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Divider from '../../components/common/divider';
import { GlobalVar } from '../../GlobalVariables';

import { useQuery } from '@apollo/react-hooks';
import { useFocusEffect, useIsFocused  } from '@react-navigation/native';
import { GET_POSTS, GET_POST_CATEGORY } from '../../connection/query';
import { getPost, getSmallCategory } from '../../connection/gqlAPI2';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as gqlAPI from '../../connection/gqlAPI'

export default function community({navigation,route}) {
	
	

	const {loginCheck, setLoginCheck} = React.useContext(GlobalVar)
	const [postContainer, setPostContainer] = useState([]);			//전체 게시물 담아두는곳
	const [post, setPost] = useState([]) 							//실제 보여줄 게시물 배열 (smallCategory로 filtering) 
	const [category, setCategory] = useState([]);					//카테고리 ( 1: 질문, 2: 고민, 3: 리뷰, 4: 정보)
	

	useFocusEffect(
		useCallback(() => {
			gqlAPI.getPost().then((data) => {
				setPostContainer(data)
				setPost(data)
				console.log(data);
			})
	
			gqlAPI.getCommunitySmallCategory().then((data) =>{
				setCategory(data);
			})
		}, []),
	);

	///////////////////////////// bigCategory BOX  //////////////////////////
	// [전체, 컨텐츠, 공지사항]
	const [bigCategoryArr, setBigCategoryArr] = useState([1,0,0])	
	function bigCategoryEvent(num){
		let newArr = [0,0,0]
		newArr[num] = 1
		setBigCategoryArr(newArr);
	}
	///////////////////////////// bigCategory BOX  //////////////////////////
	
	///////////////////////////// smallCategory Button  //////////////////////////
	// 카테고리 [0: 전체, 1: 질문, 2: 고민, 3: 리뷰, 4: 정보]
	const [ smallCategoryArr, setSmallCategoryArr ] = useState([1,1,1,1,1])
	function smallCategorySelect(num) {
		//smallCategoryArr 배열 변경,
		//post 배열 변경
		
		if(num === 0){ 
			//0 : 전체
			setSmallCategoryArr([1,1,1,1,1])
			setPost(postContainer)
		}
		else{	
			// 1,2,3,4 : 선택된 카테고리들에 해당하는것만 보여줌
			let tmpArr = [0,0,0,0,0]
			tmpArr[num] = 1


			let tmpPost = []
			postContainer.map((item) => {
				if(tmpArr[item.small_category])
					tmpPost.push(item)
			})

			setPost(tmpPost)
			setSmallCategoryArr(tmpArr)

		}
	}
	///////////////////////////// smallCategory Button  //////////////////////////


    return (

        
        <View style={{flex : 1, backgroundColor : 'white'}}>



			{/* 헤더 */}
			<View style={styles.headerContainer}>
				<View style={{flex : 1, width : '90%', flexDirection : 'row', justifyContent : 'space-between'}}>
					<View style={{justifyContent : 'center'}}> 
						<Text style={styles.headerText}>커뮤니티</Text>
					</View>
					<View style={{justifyContent: 'center', flexDirection : 'row', justifyContent : 'flex-end' , alignItems : 'center'}}> 
						<TouchableOpacity style={{ borderRadius : 100, marginRight : 20,}}>
							<FontAwesomeIcon name="refresh" style={{ borderRadius : 100, fontSize: 25 }} />
						</TouchableOpacity>
						<TouchableOpacity 
							style={{ borderRadius : 100,}} 
							onPress = {() => {navigation.navigate("searchPost")}}>
							<FontAwesomeIcon name="search" style={{ fontSize: 25 }} />
						</TouchableOpacity>
					</View>
				</View>
				
			</View>
			<Divider color = '#e3e1dc' />





			{/* BIG 카테고리 버튼 */}
			<View style={styles.bigCategory}>
				<TouchableOpacity 
					style={[{backgroundColor: bigCategoryArr[0]? '#FA8072' : '#ffffff'},styles.bigCategoryButton]}
					onPress = {() => bigCategoryEvent(0)}
				>
					<Text style={styles.bigCategoryText}> 전체 </Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={[{backgroundColor: bigCategoryArr[1]? '#FA8072' : '#ffffff'},styles.bigCategoryButton]}
					onPress = {() => bigCategoryEvent(1)}
				>
					<Text style={styles.bigCategoryText}> 컨텐츠 </Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={[{backgroundColor: bigCategoryArr[2]? '#FA8072' : '#ffffff'},styles.bigCategoryButton]}
					onPress = {() => bigCategoryEvent(2)}
				>
					<Text style={styles.bigCategoryText}> 공지사항 </Text>
				</TouchableOpacity>
			</View> 
			<Divider color = '#e3e1dc' />











			{/* SMALL 카테고리 버튼 (전체, 고민, 리뷰, 질문, 병원 ...) */}
			<View style={styles.smallCategory}>
				{
					category ? category.map((item) => {
						return(
							<View key={item.id} style ={styles.smallCategoryBox}>
								<TouchableOpacity
									key = {item.id}
									style={[{backgroundColor : smallCategoryArr[item.id] ? '#FFBCBC' : '#ffffff'},styles.smallCategoryButton]}
									onPress = { () => smallCategorySelect(item.id)}
								>
									<Text style={styles.smallCategoryText}> {item.content} </Text>
								</TouchableOpacity>
							</View>

						)
					}) : ''
				}
			</View>
			<Divider color = '#e3e1dc' />












            {/* 게시글 */}
            <ScrollView>
                {
					post ? post.map((item) => {
						return(
							<View key = {item.id}> 
								<TouchableOpacity onPress={()=> navigation.navigate('postDetail',item)}>
									<Post
										//postImage={item.image}
										title={item.title}
										content={item.content}
										category={item.small_category}
										type="communityList"
										//profileName={item.sotongUser.nick_name}
										profileTime={item.create_date}
										replyCount ={item.replyCount ? item.replyCount : 0 }
										likeCount ={item.likeCount ? item.likeCount : 0}
										/>
								</TouchableOpacity>
								<Divider color = '#f7f6f2' height = {5} />
							</View>
						)} ) : '' 
				}
            </ScrollView>





            {/* Floating 버튼 */}
            <ActionButton buttonColor='#FA8072'>
                <ActionButton.Item buttonColor='#FA8072' title="게시글 작성" onPress={() => 	
						loginCheck ? navigation.navigate('writePost') : alert('로그인이 필요합니다')
				}>
                    <FontAwesomeIcon name="pencil" style={{fontSize : 15}} />
                </ActionButton.Item>
				<ActionButton.Item buttonColor='#FA8072' title="컨텐츠 작성" onPress={() => 	
						loginCheck ? navigation.navigate('writePost') : alert('로그인이 필요합니다')
				}>
                    <FontAwesomeIcon name="film" style={{fontSize : 15}} />
                </ActionButton.Item>
            </ActionButton>



        </View>


            

        
    )
}

const styles = StyleSheet.create({
	headerContainer:{
		height : '8%',
		alignItems : 'center',
		justifyContent : 'center'
	},
	headerText :{
		fontSize : 25
	},
	bigCategory :{
		height : '8%',
		flexDirection : 'row',
		alignItems : 'center'
	},
	bigCategoryButton:{
		flex : 1,
		height : '100%',
		justifyContent : 'center',
		alignItems : 'center'
	},
	bigCategoryText :{
		fontSize : 25,
	},
	smallCategory :{
		height : '7%',
		flexDirection : 'row',
	},
	smallCategoryText:{
		fontSize : 15
	},
	smallCategoryBox:{
		flex : 1,
		alignItems : 'center',
		justifyContent : 'center'
	},
	smallCategoryButton: {
		borderColor: '#FA8072',
		borderWidth:1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		height : 30,
		width : 60,
	}
})
