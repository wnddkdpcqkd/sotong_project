import React ,{useState}from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Button from '../../components/common/Button'
import { NaverLogin, getProfile } from '@react-native-seoul/naver-login';
import { GlobalVar } from '../../GlobalVariables';

export default function mypage({navigation,user}) {


    const {name, email, kidInfo} = user || {name : '로그인이 필요합니다.', kidInfo : '등록된 아이 정보가 없습니다.'}

    return (
        <View style={styles.root}>
            
            {/* 프로필 */}
            <View style={styles.container}>
                {/* 헤더  */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>마이페이지</Text>
                </View>

                <View style={styles.profile}>
                    <View>
                        <Image
                            source={require("../../assets/image/user.png")}
                            resizeMode="cover"
                            style={styles.profileImage}
                        />
                    </View>
                    <View>
                        <Text style={styles.profileText}> {name} </Text>
                        <Text style={styles.profileText2}> {email} </Text>
                        <Text style={styles.profileText2}> {kidInfo} </Text>
                    </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        backgroundColor : 'white'
    },
    container :{
        flex : 1,
        marginLeft : 30,
        marginTop : 30,
        marginRight : 30,
    },
    header : {
        height : 50,
    },
    headerText : {
        marginTop : 10,
        fontSize : 30,
    },
    profile : {
        flexDirection : 'row',
        marginTop : 30,
    },
    profileImage:{
        marginRight : 30, 
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor : 'gray',
    },
    profileText:{
        fontSize: 20,
    },
    profileText2:{
        fontSize: 15,
        color: "gray",
    },
})
