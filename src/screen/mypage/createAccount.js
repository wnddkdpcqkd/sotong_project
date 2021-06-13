import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native'
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

const loginBackground = "../../assets/image/login_background.jpg"
const sotongLogo = "../../assets/image/logo_v1.png"

export default function createAccount() {
    return (
        <View style={styles.root}>
      
            {/* 백그라운드 img */}
            <View style={styles.background}>
                <ImageBackground
                style={styles.background}
                source={require(loginBackground)}
                >

                

                    <View style={styles.innerBox}>
                        {/* 로고 (현재 글씨로 대체) */}
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>Sotong</Text>
                        </View>


                        {/* ID, PW 입력창 , 로그인버튼 */}
                        <View style={styles.form}>

                            {/* Email (아이디) */}
                            <View style={styles.username}>
                                <EvilIconsIcon
                                    name="envelope"
                                    style={styles.icon}
                                ></EvilIconsIcon>
                                <TextInput
                                    styles = {styles.textInput}
                                    placeholder="User"
                                    placeholderTextColor="rgba(255,255,255,1)"
                                ></TextInput>
                            </View>

                            {/* PW 입력창 */}
                            <View style={styles.password}>
                                <EvilIconsIcon
                                    name="lock"
                                    style={styles.icon}
                                ></EvilIconsIcon>
                                <TextInput
                                    styles = {styles.textInput}
                                    placeholder="Password"
                                    placeholderTextColor="rgba(255,255,255,1)"
                                    secureTextEntry={true}
                                ></TextInput>
                            </View>

                            {/* PW 확인창 */}
                            <View style={styles.password}>
                                <EvilIconsIcon
                                    name="lock"
                                    style={styles.icon}
                                ></EvilIconsIcon>
                                <TextInput
                                    styles = {styles.textInput}
                                    placeholder="Password Verification"
                                    placeholderTextColor="rgba(255,255,255,1)"
                                    secureTextEntry={true}
                                ></TextInput>
                            </View>

                            {/* 이름 */}
                            <View style={styles.password}>
                                <EvilIconsIcon
                                    name="user"
                                    style={styles.icon}
                                ></EvilIconsIcon>
                                <TextInput
                                    styles = {styles.textInput}
                                    placeholder="Name"
                                    placeholderTextColor="rgba(255,255,255,1)"
                                    secureTextEntry={true}
                                ></TextInput>
                            </View>

                            {/* 회원가입 */}
                            <TouchableOpacity
                                // onPress={() => props.navigation.navigate("home")}
                                onPress = {() => alert('회원가입창')}
                                style={styles.registerButton}
                            >
                                <Text style={styles.registerText}>Sign Up</Text>
                                <Image style={styles.registerImg} source = {require(sotongLogo)}></Image>
                            </TouchableOpacity>

                        </View>


                    </View>





                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
    },
    
    background: {
        flex: 1
    },
    innerBox: {
        marginTop: 100,
        marginLeft: 41,
        marginRight: 41,
    },
    logo: {
        alignSelf: "center",
    }, 
    logoText: {
        color: "rgba(255,255,255,1)",
        fontSize: 80,
        marginBottom: 4
    },
    form: {
        // height: 230,
        marginTop: 30,
        //backgroundColor : 'red'
    },
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        marginLeft: 20,
        alignSelf: "center"
    },
    username: {
        height: 59,
        backgroundColor: "rgba(251,247,247,0.25)",
        borderRadius: 5,
        flexDirection: "row"
    },
    textInput:{
        color : 'white',
        fontSize : 20,
    },
    password: {
        height: 59,
        backgroundColor: "rgba(253,251,251,0.25)",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 27,
    },

    registerButton: {
        marginTop : 30,
        height: 59,
        backgroundColor: "#FA8072",
        borderRadius: 5,
        flexDirection: "row",
        alignSelf: "center",
        elevation : 2,
    },
    registerImg: {
        height : 59,
        width : 59,
        marginRight : 10,
    },
    registerText: {
        fontSize : 30,
        alignSelf : "center",
        color: "white",
        marginRight : 20,
        marginLeft : 30,
    },
})
