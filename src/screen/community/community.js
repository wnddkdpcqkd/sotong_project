import React, {Component, useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity  } from 'react-native'
import Post from '../../components/community/post'
import ActionButton from 'react-native-action-button';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Divider from '../../components/common/divider';

import {useQuery} from '@apollo/react-hooks';
import { GET_POSTS } from '../../connection/query';



export default function community({navigation}) {

    //게시물 받아오기
    const {loading, error, data} = useQuery(GET_POSTS);
	const [posts, setPosts] = useState([]);
	
	useEffect(() => {
		if (data && data.posts) 
			setPosts(data.posts);
	},[data])

    return (

        
        <View style={{flex : 1, backgroundColor : 'white'}}>

            {/* 게시글 */}
            <ScrollView>
                {
					posts ? posts.map((item) => {
						console.log('게시글 내부 : ', item)
						return(
							<View key = {item.id}> 
								<Divider color='gray' />
								
								<TouchableOpacity onPress={()=> navigation.navigate('postDetail',item)}>
									<Post
										//postImage={item.image}
										content={item.content}
										type="communityList"
										profileName={item.sotongUser.nick_name}
										profileTime={item.create_date}
										/>
								</TouchableOpacity>
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

const styles = StyleSheet.create({})
