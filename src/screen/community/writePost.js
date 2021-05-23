import React, {Component, useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import Divider from '../../components/common/divider';

export default function writePost() {

    const [contentByte, setContentByte] = useState();
    
    const calculateByte= (str) =>{
        setContentByte(
            str
            .split('') 
            .map(s => s.charCodeAt(0))
            .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0) // 계산식에 관한 설명은 위 블로그에 있습니다.
        );
    }


    //게시물 카테고리 종류
    const [postCategory, setPostCategory] = useState(['질문','고민','리뷰','정보']);

    //게시물 카테고리를 화면에 뿌려줌
    const showButton=(categoryArray) => {
        return (
            categoryArray.map((categoryName,key) => {
                return <Button title={categoryName} />
            })
        )   
    }


    ////////////////////////////////////////////////////////////////////////////////////// 
    return (

        <View style={styles.container}>
            <Divider color= '#dcdcdc' />

            <View style={styles.marginContainer}>
            



                {/* 카테고리 버튼 */}
                <View style={styles.header}>
                    

                    <Text style={styles.textStyle}> 카테고리 </Text>
                    <View style={styles.categoryButton}>
                        {showButton(postCategory)}
                    </View>
                </View>

                {/* 텍스트 입력란 */}
                <View style={styles.textInputContainer} >
                    <View style={styles.textInputHeader} >
                        <Text style={styles.textStyle}> 게시글 작성 </Text>
                        <Text style={styles.textStyle}> 0 / 1000</Text>
                    </View>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='내용을 작성해주세요'
                        multiline={true}
                    />
                </View>


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

                {/* 게시글 제출버튼 */}
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.touchableButton}>
                        <Text style={styles.buttonText}> 게시글 작성하기 </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems : 'center',
        backgroundColor: 'white',
    },
    marginContainer :{
        marginTop : 10,
        width : '90%',
        flex : 1,
        backgroundColor : 'white',
    },
    header : {
        flex : 1,
    },
    headerText:{
        fontSize : 15,
        marginLeft : 15,
        marginTop : 15,
    },
    categoryButton :{
        flexDirection : 'row',
        
    },
    textInputContainer:{
        flex : 3,
        backgroundColor : 'white',
    },
    textInputHeader : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    textStyle : {
        fontSize : 20,
    },
    textInput :{
        marginTop : 20,
        height : 200,
        width : '100%',
        borderRadius : 10,
        borderWidth : 1,
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
