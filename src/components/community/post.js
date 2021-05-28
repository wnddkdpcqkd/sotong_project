import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";


export default function post(props) {
    /*props
    type = communityList : 커뮤니티 리스트일때 , default : 게시글 상세페이지
    content = 게시글 들어갈 내용
    postImage = state배열 ( postImage.uri 에서 데이터 가져옴 )
    profileName = 프로필 명
    */
    let imageHeight, textMargin, windowWidth, windowHeight;

    // 게시판 리스트일때와 게시판 상세일때 UI가 약간 다름 
    if(props.type === "communityList"){
        imageHeight=80;
        textMargin=20;
        windowWidth = Dimensions.get('window').width * 0.9;
        windowHeight = Dimensions.get('window').height * 0.9;
    }else { 
        imageHeight= 150;
        textMargin= 30;
        windowWidth = Dimensions.get('window').width;
        windowHeight = Dimensions.get('window').height;
    }

    const showImage=(imageState)=>{

        let widthDivider = imageState.length;
        

        return(
            imageState.map((item) => {
                return (
                    <Image 
                        key={item.id}
                        source={{uri : item.uri}}
                        resizeMode="cover"
                        style={[styles.bodyImage,{ width: windowWidth/widthDivider, height: imageHeight,}]}
                    />
                    
                )
            })
        );
    }



    return (
        <View style={{backgroundColor : 'white'}}>
        <ScrollView>

            {/* 헤더부분 */}
            <View style={styles.header}>
            
                {/* 프로필 IMG */}
                <View style={{flex : 1 }}>
                    <Image
                        source={require("../../assets/image/dog.png")}
                        resizeMode="cover"
                        style={styles.profileImage}
                    />
                </View>

                {/* 프로필명 */}
                <View style={{flex : 3, }}>
                    <Text style={styles.profileName}> {props.profileName || '우에하라 아이'} </Text>
                    <Text style={styles.prfileTime} > {props.profileTime || '20분 전'}</Text>
                </View> 

                {/* 쩜 세개 */}
                <View style={styles.dotsVerticalContainer}>
                    <TouchableOpacity>
                    <MaterialCommunityIconsIcon
                        name="dots-vertical"
                        style={styles.dotsVertical}
                    />
                    </TouchableOpacity>
                </View>

            </View>



            {/* Body-IMG 부분 */}
            <View style={styles.bodyImageContainer}>        
                {showImage(props.postImage)}     
            </View>

            
            {/* Body-Text부분 */}
            <View style={[styles.bodyText, {marginTop : textMargin, marginBottom : textMargin}]}>
                <Text>{props.content} </Text>
            </View>


            {/* 좋아요 , 댓글버튼 */}
            <View style={styles.bottomContainer}>
                
                {/* 좋아요 수*/}
                <TouchableOpacity  onPress={()=>console.log("좋아요 클릭")}>
                    <View style={{flexDirection : 'row'}}>
                        <FontAwesomeIcon name="heart-o" style={{fontSize: 15}} />
                        <Text> 999+ </Text>
                    </View>
                </TouchableOpacity>
                
                {/* 댓글 수*/}
                <FontAwesomeIcon name="comments" style={{fontSize: 15, marginLeft : 10}} />
                <Text> 999+ </Text>
            </View>

        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 90,
        flexDirection : 'row',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    bodyText:{
        marginLeft : 20,
    },
    bottomContainer:{
        flexDirection: 'row',
        marginLeft : 20,
    },
    bodyImageContainer:{
        flexDirection : 'row', 
        backgroundColor:'white',
        alignSelf:'center' 
    },
    bodyImage:{
        marginTop : 0,  
        borderRadius: 10,
    },
    profileImage:{
        marginTop : 20,
        marginLeft : 20,    
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    profileName: {marginTop :25, marginLeft: 0, fontSize : 15, fontWeight :'bold'},
    profileTime: {marginTop : 5, marginLeft : 0, fontSize : 13},
    dotsVertical: {
        color: 'gray',
        fontSize: 30,
        marginRight: 20,
        marginTop: 30
    },
    dotsVerticalContainer : {flex : 1, backgroundColor : 'white', alignItems : 'flex-end'}
})