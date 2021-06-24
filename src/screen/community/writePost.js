import React, {Component, useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Divider from '../../components/common/divider';

import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { GET_POST_CATEGORY, ADD_POST, GET_POSTS } from '../../connection/query';
import { useQuery, useMutation } from '@apollo/client';
import { GlobalVar } from '../../GlobalVariables';

export default function writePost({navigation}) {

    const [postTitle, setPostTitle] = useState();       //게시글 제목
    const [postText, setPostText] = useState();         //게시글 내용
    const [contentByte, setContentByte] = useState(0);  //텍스트 입력 byte
    

    const calculateByte= (str) =>{
        setContentByte(
            str
            .split('') 
            .map(s => s.charCodeAt(0))
            .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0) // 계산식에 관한 설명은 위 블로그에 있습니다.
        );
    }

    

    ///////////////////// 게시물 카테고리 종류 ///////////////////////////
    const [postCategory, setPostCategory] = useState([])
    const { loading, error , data } = useQuery(GET_POST_CATEGORY)
    useEffect(() => {
        if(data && data.postCategorys){
            setPostCategory(data.postCategorys)
        }
    },[data])
    // console.log('[writePost] data.postCategorys : ',data.postCategorys)
    // console.log('[writePost] postCategory: ',postCategory)
    //게시물 카테고리를 화면에 뿌려줌
    const showButton=(categoryArray) => {
        return (
            categoryArray.map((categoryName,key) => {
                return <Button key={key} title={categoryName} />
            })
        )   
    }
    ////////////////////////////////////////////////////////////





    ////////////////////  게시물 카테고리 선택 ///////////////////////
    const [categoryState, setCategoryState] = useState([0,0,0,0]);
    function setCategoryArr(num) {
        let newArr = [0,0,0,0]
        newArr[num] = 1
        console.log('[writePost] newArr : ' , newArr)
        setCategoryState(newArr);
    }

    ////////////////////////////////////////////////////////////




    ///////////////////// 게시글 쓰기 ///////////////////////////////
    const [ add_post ] = useMutation(ADD_POST,
        {
            refetchQueries : [ { query : GET_POSTS }]
        })
    function sendPost() {
        AsyncStorage.getItem('profile', (err,result) =>{
            const profile = JSON.parse(result)
            add_post({variables : {
                user_email : profile.email,
                small_category : categoryState.findIndex((item) => item === 1) + 1,
                title : postTitle,
                content : postText,
            }})
        })
    }
    ///////////////////// 게시글 쓰기 ///////////////////////////////




    ////////////////////////////////////////////////////////////////////////////////////// 
    return (

        <View style={styles.container}>
            <Divider color= '#DADADA' height= {2} />


                {/* 글쓰기 헤더 */}
                <View style={styles.header}>

                    <EvilIconsIcon
                        name="chevron-left"
                        style={styles.headerIcon}
                        onPress = {() => navigation.goBack()}
                    ></EvilIconsIcon>

                    <Text style={{fontSize : 25}}> 글쓰기 </Text>

                    <TouchableOpacity
                        onPress = {() => {
                             sendPost()
                            alert('게시글 작성 완료.')
                            navigation.goBack()
                        }
                    }>
                        <Text style={styles.headerButton}>등록</Text>
                    </TouchableOpacity>
                </View>
                <Divider color='#E2E2E2' height={2} />


                {/* 카테고리 버튼 */}

                <View style={styles.category}>
                    <Text style={styles.textStyle}> 카테고리 </Text>

                    
                    <View style={styles.categoryContainer}>
                        {
                            postCategory ? postCategory.map((item) =>{
                                return (
                                    <View key={item.id} style ={styles.categoryBox}>
                                    <TouchableOpacity
                                        key = {item.id}
                                        style={styles.categoryButton}
                                        onPress={() => setCategoryArr( item.id -1 )}
                                    >
                                        <Text style={styles.smallCategoryText}> {item.content} </Text>
                                    </TouchableOpacity>
                                    </View>
                                )
                            }) : ''
                        }
                    </View>
                </View>
                




                {/* 텍스트 입력란 */}
                <View style={styles.textInputContainer} >
                    
                    <View style={styles.textInputHeader} >
                        <Text style={[styles.textStyle,{marginBottom : 10}]}> 게시글 작성 </Text>
                        <Text style={styles.textStyle}> {contentByte} / 1000</Text>
                    </View>
                    <Divider color='#E2E2E2' height={1} />
                    
                    {/* 제목 입력란 */}
                    <TextInput
                        placeholder='제목을 입력하세요'
                        style={styles.titleInput}
                        onChangeText={(str) => { setPostTitle(str) } }
                    />
                    <Divider color='#E2E2E2' height={1} />

                    {/* 내용 입력란 */}
                    <ScrollView>
                    <TextInput 
                        style={styles.contentInput}
                        placeholder='내용을 작성해주세요'
                        multiline={true}
                        onChangeText={(str) => {
                                setPostText(str)
                                calculateByte(str)
                            }
                        }
                    />
                    </ScrollView>
                </View>
                <Divider color='#E2E2E2' height={1} />





                {/* 이미지 업로드 */}
                <View style={styles.imageUpload}>
                    <View style={styles.textInputHeader} >
                        <Text style={styles.textStyle}> 사진첨부 (최대 10장)</Text>
                        <Text style={styles.textStyle}> 0 / 10 </Text>
                    </View>

                    <View style = {{heigth : 50, width : 50, backgroundColor : 'gray' , borderRadius : 15,}}> 
                        <Text>이미지업로드 이미지</Text>
                    </View>
                </View>






                {/* 게시글 제출버튼
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.touchableButton}
                        onPress = {() => {
                                sendPost()
                                alert('게시글 작성 완료.')
                                navigation.goBack()
                            }
                        }
                    >
                        <Text style={styles.buttonText}> 게시글 작성하기 </Text>
                    </TouchableOpacity>
                </View> */}


        </View>

    )
}

const styles = StyleSheet.create({
    header:{
        width : '100%',
        height : '10%', 
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center', 
    },
    headerIcon : {
        fontSize : 50
    },
    headerButton :{
        fontSize : 20,
        color : '#FA8072',
        marginRight : 15,
    },
    container:{
        flex : 1,
        backgroundColor: 'white',
    },
    marginContainer :{
        marginTop : 10,
        width : '90%',
        backgroundColor : 'white',
    },




    category : {
        height : '15%',
    },
    headerText:{
        fontSize : 15,
        marginLeft : 15,
        marginTop : 15,
    },
    categoryContainer :{
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
    },
    categoryBox : {
        flex : 1,
		alignItems : 'center',
		//justifyContent : 'center'
    },
    categoryButton :{
        backgroundColor: '#ffffff',
		borderColor: '#FA8072',
		borderWidth:1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		height : 35,
		width : 70,
    },









    textInputContainer:{
        flex : 5,
        backgroundColor : 'white',
    },
    textInputHeader :{
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    textStyle : {
        fontSize : 17,
        marginLeft : 15,
        marginTop : 10,
        marginRight : 15,
    },
    titleInput :{
        marginLeft : 15,
    },
    contentInput : {
        //height : 200,
        width : '100%',
        marginLeft : 15,
    },
    imageUpload:{
        flex : 2,
    },
    submitContainer:{
        flex : 1,
        alignItems : 'center',
        backgroundColor : 'white',
    },

    touchableButton: {
        height : 50,
        width : '70%',
        backgroundColor : '#FA8072',
        borderRadius : 5,
        alignItems : 'center',
        justifyContent : 'center',
        
        
        //IOS
        shadowColor: "#000000", //그림자색
        shadowOpacity: 0.3,//그림자 투명도
        shadowOffset: { width: 2, height: 2 }, //그림자 위치
        //ANDROID
        elevation: 3,
    },
    buttonText: {
        color : 'white',
    }
})
