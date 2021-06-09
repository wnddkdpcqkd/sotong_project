import React, { Component } from "react";
import { StyleSheet, View, StatusBar, ImageBackground, Text, TextInput, TouchableOpacity, Image } from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

const loginBackground = "../../assets/image/login_background.jpg"
const sotongLogo = "../../assets/image/logo_v1.png"
function Login(props) {
  return (
    <View style={styles.root}>
      
        {/* 백그라운드 img */}
        <View style={styles.background}>
        <ImageBackground
          style={styles.rect}
          source={require(loginBackground)}
        >

        
        <View style={styles.innerBox}>
            {/* 로고 (현재 글씨로 대체) */}
            <View style={styles.logo}>
                <Text style={styles.logoText}>Sotong</Text>
            </View>

            {/* ID, PW 입력창 , 로그인버튼 */}
            <View style={styles.form}>

                {/* ID입력창 */}
                <View style={styles.username}>
                    <EvilIconsIcon
                        name="user"
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
                {/* Login 버튼 home으로 바꿔야함 */}
                <TouchableOpacity
                    // onPress={() => props.navigation.navigate("home")}
                    onPress = {() => alert('로그인 누르면 어디로이동??')}
                    style={styles.loginButton}
                >
                    <Text style={styles.loginText}>로그인</Text>
                    <Image style={styles.loginImg} source = {require(sotongLogo)}></Image>
                </TouchableOpacity>
            </View>
        </View>



        <View style={styles.footer}>
            {/* 계정 생성 */}
            <TouchableOpacity
                // onPress={() => props.navigation.navigate("SignUp")}
                onPress={() => alert("가입창 만들어야됨")}
                style={styles.createAccount}
            >
                <Text style={styles.createAccount} >Create Account</Text>
            </TouchableOpacity>
            
            {/* Need Help? 필요한가? */}
            <TouchableOpacity
                // onPress={() => props.navigation.navigate("")}
                onPress={() => alert("이게 필요한가?")}
                style={styles.needHelp}
            >
                <Text style={styles.needHelp}>Need Help?</Text>
            </TouchableOpacity>
            
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
    rect: {
        flex: 1
    },
    innerBox: {
        marginTop: 130,
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
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        marginLeft: 20,
        alignSelf: "center"
    },
    password: {
        height: 59,
        backgroundColor: "rgba(253,251,251,0.25)",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 27,
    },
    loginButton: {
        marginTop : 30,
        height: 59,
        backgroundColor: "#FA8072",
        borderRadius: 5,
        flexDirection: "row",
        alignSelf: "center",
        elevation : 2,
    },
    loginImg: {
        height : 59,
        width : 59,
        marginRight : 10,
    },
    loginText: {
        fontSize : 30,
        alignSelf : "center",
        color: "white",
        marginRight : 20,
        marginLeft : 30,
    },
    footer: {
        flex : 1,
        justifyContent : "space-between",
        flexDirection: "row",
        marginBottom: 36,
        marginLeft: 37,
        marginRight: 36
    },
    createAccount: {
        color: "rgba(255,255,255,0.8)",
        alignSelf:'flex-end',
        fontSize : 15,
    },
    needHelp: {
        color: "rgba(255,255,255,0.8)",
        alignSelf: "flex-end",
        fontSize : 15,
    }
    });

export default Login;
