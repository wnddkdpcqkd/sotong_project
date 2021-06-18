import React, {Component, useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity  } from 'react-native'
import Post from '../../components/community/post'
import ActionButton from 'react-native-action-button';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Divider from '../../components/common/divider';

import {useQuery} from '@apollo/react-hooks';
import { GET_POSTS, GET_POST_CATEGORY } from '../../connection/query';



export default function community({navigation}) {

    /////////////////////////////게시물 받아오기/////////////////////////
    const [posts, setPosts] = useState([]);				//게시물 
	const [category, setCategory] = useState([]);		//카테고리 ( 1: 질문, 2: 고민, 3: 리뷰, 4: 정보)

	const queryMultiple = () => {
		const res1 = useQuery(GET_POSTS);
		const res2 = useQuery(GET_POST_CATEGORY);
		return [res1, res2];
	}
	const [
		  { loading: loading1, data: getPost },
		  { loading: loading2, data: getCategory }
	] = queryMultiple()

	useEffect(() => {
		if (getPost && getPost.posts) 
			setPosts(getPost.posts);
		if (getCategory && getCategory.postCategorys){
			setCategory(getCategory.postCategorys);
		}
	},[getPost,getCategory])
	/////////////////////////////게시물 받아오기/////////////////////////

	///////////////////////////// SELECT BOX  //////////////////////////
	const [button1, setButton1] = useState(true)
	const [button2, setButton2] = useState(false)
	const [button3, setButton3] = useState(false)
	///////////////////////////// SELECT BOX  //////////////////////////
	



    return (

        
        <View style={{flex : 1, backgroundColor : 'white'}}>




			{/* 헤더 */}
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>커뮤니티</Text>
			</View>
			<Divider color = '#e3e1dc' />





			{/* BIG 카테고리 버튼 */}
			<View style={styles.bigCategory}>
				<TouchableOpacity 
					style={[{backgroundColor: button1? '#FA8072' : '#ffffff'},styles.bigCategoryButton]}
					onPress = {() => {
						setButton1(true)
						setButton2(false)
						setButton3(false)
					}}
				>
					<Text style={styles.bigCategoryText}> 전체 </Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={[{backgroundColor: button2? '#FA8072' : '#ffffff'},styles.bigCategoryButton]}
					onPress = {() => {
						setButton1(false)
						setButton2(true)
						setButton3(false)
					}}
				>
					<Text style={styles.bigCategoryText}> 컨텐츠 </Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={[{backgroundColor: button3? '#FA8072' : '#ffffff'},styles.bigCategoryButton]}
					onPress = {() => {
						setButton1(false)
						setButton2(false)
						setButton3(true)
					}}
				>
					<Text style={styles.bigCategoryText}> 공지사항 </Text>
				</TouchableOpacity>
			</View> 
			<Divider color = '#e3e1dc' />



			{/* SMALL 카테고리 버튼 (전체, 고민, 리뷰, 질문, 병원 ...) */}
			<View style={styles.smallCategory}>
				<View style={styles. smallCategoryBox}>
					<TouchableOpacity
						style={styles.smallCategoryButton}
					>
						<Text style={styles.smallCategoryText}> 전체 </Text>
					</TouchableOpacity>
				</View>
				{
					category ? category.map((item) => {
						return(
							<View key={item.id} style ={styles.smallCategoryBox}>
								<TouchableOpacity
									key = {item.id}
									style={styles.smallCategoryButton}
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
					posts ? posts.map((item) => {
						return(
							<View key = {item.id}> 
								<TouchableOpacity onPress={()=> navigation.navigate('postDetail',item)}>
									<Post
										//postImage={item.image}
										content={item.content}
										type="communityList"
										profileName={item.sotongUser.nick_name}
										profileTime={item.create_date}
										/>
								</TouchableOpacity>
								<Divider color = '#f7f6f2' height = {5} />
							</View>
						)} ) : '' 
				}
            </ScrollView>





            {/* Floating 버튼 */}
            <ActionButton buttonColor='#FA8072'>
                <ActionButton.Item buttonColor='#FA8072' title="게시글 작성" onPress={() => navigation.navigate('writePost')}>
                    <FontAwesomeIcon name="pencil" style={{fontSize : 15}} />
                </ActionButton.Item>
            </ActionButton>



        </View>


            

        
    )
}

const styles = StyleSheet.create({
	headerContainer:{
		height : '10%',
		alignItems : 'center',
		justifyContent : 'center'
	},
	headerText :{
		fontSize : 25
	},
	bigCategory :{
		height : '10%',
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
		backgroundColor: '#ffffff',
		borderColor: '#FA8072',
		borderWidth:1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		height : 30,
		width : 60,
	}
})
