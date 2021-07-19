import React, {Component, useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import Divider from '../../components/common/divider';

import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { GET_POST_CATEGORY, ADD_POST, GET_POSTS } from '../../connection/query';
import { useQuery, useMutation } from '@apollo/client';
import { GlobalVar } from '../../GlobalVariables';

import * as gqlAPI from '../../connection/gqlAPI'

import { getPost1, getSmallCategory } from '../../connection/gqlAPI2';

// 이미지 업로드 //
import ImagePicker from 'react-native-image-crop-picker';




export default function writePost({navigation}) {
    
    // 변경부분!
    const [profile, setProfile] = useState();

    const [postTitle, setPostTitle] = useState();       //게시글 제목
    const [postText, setPostText] = useState();         //게시글 내용
    const [contentByte, setContentByte] = useState(0);  //텍스트 입력 byte
    const [images, setImages]  = useState ([])          //사진 첨부
    

    // Text Byte 수 표시
    const calculateByte= (str) =>{
        setContentByte(
            str
            .split('') 
            .map(s => s.charCodeAt(0))
            .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0) // 계산식에 관한 설명은 위 블로그에 있습니다.
        );
    }

    // 게시물 카테고리 종류 
    const [postCategory, setPostCategory] = useState([])
    useEffect(()=> {
        gqlAPI.getWritePostSmallCategory().then((data) =>{
            setPostCategory(data)
        })
    },[])

    // 게시물 카테고리 선택 이벤트
    const [categoryState, setCategoryState] = useState([0,0,0,0]);
    function setCategoryArr(num) {
        let newArr = [0,0,0,0]
        newArr[num] = 1
        console.log('[writePost] newArr : ' , newArr)
        setCategoryState(newArr);
    }






    ///////////////////// 게시글 쓰기 ///////////////////////////////
    const [ add_post ] = useMutation(ADD_POST,
        {
            refetchQueries : [ { query : GET_POSTS }]
        }
    )

    function sendPost() {
        AsyncStorage.getItem('profile', (err,result) =>{
            const profile = JSON.parse(result)
            add_post({variables : {
                user_email : profile.email,
                small_category : categoryState.findIndex((item) => item === 1) + 1,
                title : postTitle,
                content : postText,
            }}).catch(e => console.log('Error : ',e.message))
        })
    }


    useEffect(() => {
        // 변경부분! profile 받아오는 함수 만들어서 따로 놓을것
        AsyncStorage.getItem('profile',(err,result) => {
            setProfile(JSON.parse(result))
        })
    },[])
    function addPost() {
        gqlAPI.addPost(profile.email, categoryState.findIndex((item) => item === 1) + 1 , postTitle, postText)
        .then((item) => {
            if(item) alert("게시글 입력 완료!")
            navigation.goBack()
        })
    }
    
    
    ///////////////////// 게시글 쓰기 ///////////////////////////////

    ///////////////////// 이미지 선택 ///////////////////////////////
    const openImagePicker = () => {
        let imageList = [] ;

        ImagePicker.openPicker({
            mediaType : 'photo',
            multiple : true,
            includeBase64 : true,
            forceJpg : true,
        }).then((response) => {
            response.map((image) => {
                imageList.push({
                    data : image.data,
                    uri : image.path,
                    width : image.width,
                    height : image.height,
                    mime : image.mime
                })
            })
            setImages(imageList);
        }).catch(e => console.log('Error ', e.message))        
    }

    ///////////////////// 이미지 선택 ///////////////////////////////


    ///////////////////// 이미지 화면에 뿌리기 //////////////////
    const showImages= () =>{
        console.log(images.length);
        if(images.length > 5){
            alert('이미지는 5개까지 첨부 가능합니다')
            setImages([]);
            console.log('왜 일로들어오지?')
        }
        else if(images.length > 0){
            images.map((image,id) =>{
                return(
                    <Image
                        style= {styles.imageStyle}
                        source={image}
                    />
                )
                console.log("이미지")
            })
        }
    }
    ///////////////////// 이미지 화면에 뿌리기 //////////////////



    ////////////////////////////////////////////////////////////////////////////////////// 
    return (

        <View style={styles.container}>
            <Divider color= '#DADADA' height= {2} />


                {/********************************글쓰기 헤더 *********************************/}
                <View style={styles.header}>

                    <EvilIconsIcon
                        name="chevron-left"
                        style={styles.headerIcon}
                        onPress = {() => navigation.goBack({refresh : true})}
                    ></EvilIconsIcon>

                    <Text style={{fontSize : 25}}> 글쓰기 </Text>

                    <TouchableOpacity
                        onPress = {() => addPost()}
					>
                        <Text style={styles.headerButton}>등록</Text>
                    </TouchableOpacity>
                </View>
                <Divider color='#E2E2E2' height={2} />


                {/********************************* 카테고리 탭 *********************************/}

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
                




                {/********************************* 게시글 작성탭 *********************************/}
                <View style={styles.textInputContainer} >
                    
                    <View style={styles.textInputHeader} >
                        <Text style={[styles.textStyle,{marginBottom : 10}]}> 게시글 작성 </Text>
                        <Text style={styles.textStyle}> {contentByte} / 1000</Text>
                    </View>
                    <Divider color='#E2E2E2' height={1} />
                    
                    {/********************************* 제목 입력란 *********************************/}
                    <TextInput
                        placeholder='제목을 입력하세요'
                        style={styles.titleInput}
                        onChangeText={(str) => { setPostTitle(str) } }
                    />
                    <Divider color='#E2E2E2' height={1} />

                    {/********************************* 내용 입력란 *********************************/}
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





                {/********************************* 사진 첨부 *********************************/}
                <View style={styles.imageUploadContainer}>
                    <View style={styles.textInputHeader} >
                        <Text style={styles.textStyle}> 사진첨부 (최대 5장)</Text>
                        <Text style={styles.textStyle}> {images.length} / 5 </Text>
                    </View>

                    <View style = {styles.imageUploadSubContainer}>
                        <View style={styles.cameraIconContainer}> 
                            <EvilIconsIcon
                                name="camera"
                                style={{fontSize : 55}}
                                onPress= { () => openImagePicker() }
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            {/* image 0 개일 때 null, 5개 이하일 때만 image 첨부 가능 */}
                            {images ?
                                images.length <= 5 ? 
                                (
                                    images.map((image,id) => {
                                        return(
                                            <Image
                                                    style= {styles.imageStyle}
                                                    source={image}
                                            />
                                        )
                                    }) 
                                )
                                : (
                                    alert("이미지는 5개까지 첨부 가능합니다."),
                                    setImages([])
                                )
                            : null }
                        </View>
                        
                        
                    </View>
                </View>
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
    },




    /////////////// 사진첨부

    imageUploadContainer:{
        flex : 2,
    },
    imageUploadSubContainer: {
        flex : 1 ,
        flexDirection : 'row',
        marginLeft : 15,
        marginTop : 20,
        marginRight : 20,
    },
    cameraIconContainer: {
        flex : 1 ,
        alignItems : 'center',
        justifyContent:'center', 
        marginRight : 5, 
        borderRadius : 15, 
        borderWidth : 1, 
        height : '50%' 
    },
    imageContainer: {
        flex : 5, 
        flexDirection : 'row'
    },
    imageStyle : {
        width : '20%',
        height: '50%',
    },

})
