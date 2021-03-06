import React, { Component } from "react";
import { StyleSheet, View, StatusBar, ImageBackground, Text, TextInput, TouchableOpacity, Image, } from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Button from "../../components/common/Button";
import { NaverLogin, getProfile } from '@react-native-seoul/naver-login';
import { GlobalVar } from '../../GlobalVariables';
import { useMutation } from '@apollo/react-hooks';
import { ADD_SOCIAL_USER } from '../../connection/query';
import AsyncStorage from '@react-native-async-storage/async-storage'; 



const loginBackground = "../../assets/image/login_background.jpg"
const sotongLogo = "../../assets/image/logo_v1.png"

const initials = {
    kConsumerKey: 'QuWkmldDj4pP3aPAq59I',
    kConsumerSecret: '6RQek41Dcj',
    kServiceAppName: '소통',
  };

function Login({navigation}) {

    const {loginCheck, setLoginCheck} = React.useContext(GlobalVar)
    const [naverToken, setNaverToken] = React.useState(null);

    const [add_social_user] = useMutation(ADD_SOCIAL_USER);


    ////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////     네이버 로그인     /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    //로그인
    const naverLogin = props => {
    return new Promise((resolve, reject) => {
        NaverLogin.login(props, (err, token) => {
        //네이버 로그인 성공시
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
            //네이버 로그인 실패
            reject(err);
            return;
        }
        resolve(token);
        }); 
    }).then( async (token) => {
        const profileResult = await getProfile(token.accessToken);
        /////////////////////////user 정보 DB에 넣어야 함/////////////////////////

        // if (profileResult.resultcode === '024') {
        //     Alert.alert('로그인 실패', profileResult.message);
        //     return;
        // }

        //  token id 가 있으면 정보받아오고 없으면 아이디 생성
        const date = new Date();
        add_social_user({ variables: {
            email : profileResult.response.email,
            password : '',
            nick_name : profileResult.name,
            name : profileResult.name,
            phone : profileResult.response.mobile,
            social_token : profileResult.response.id,
            modify_date : date
        }})
        
        AsyncStorage.setItem('loginMethod','naver');
        AsyncStorage.setItem('token',JSON.stringify(token));
        AsyncStorage.setItem('profile',JSON.stringify({    
            email : profileResult.response.email,
            nick_name : profileResult.name,
            name : profileResult.name,
            phone : profileResult.response.mobile,
            social_token : profileResult.response.id,}))
        setLoginCheck(true)
    }

    );
    };
    
 

    ////////////////////////////////////////////////////////////////////////////////
    //로그아웃
    const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken(null);
    };
    ////////////////////////////////////////////////////////////////////////////////
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





                {/**************************************************************************/}
                {/* 소셜 로그인 */}
                <View style={styles.socialLoginButton}>
                    <View>
                       {/* 네이버 */}
                        <Button 
                            height ={40}
                            width = {160}
                            text = {"Naver"}
                            backgroundColor = {'#63CC63'}
                            onPress = {() => naverLogin(initials)}
                        />
                        <View style={{marginTop : 10}}></View>
                        {/* 카카오 */}
                        <Button 
                            height ={40}
                            width = {160}
                            text = {"KaKao"}
                            backgroundColor = {'#F7E600'}
                            onPress = {() => alert("asdsad")}
                        />
                    </View>
                    <View>
                       {/* 구글 */}
                        <Button 
                            height ={40}
                            width = {160}
                            text = {"Google"}
                            backgroundColor = {'#d62d20'}
                            onPress = {() => alert("asdsad")}
                        />
                        <View style={{marginTop : 10}}></View>
                        {/* 페이스북 */}
                        <Button 
                            height ={40}
                            width = {160}
                            text = {"Facebook"}
                            backgroundColor = {'#3B5998'}
                            onPress = {() => alert("asdsad")}
                        />
                    </View>
                </View>
                {/**************************************************************************/}


            </View>
        </View>



        <View style={styles.footer}>
            {/* 계정 생성 */}
            <TouchableOpacity
                onPress={() => navigation.navigate("createAccount")}
                //onPress={() => alert("가입창 만들어야됨")}
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
    
    naverLoginButton :{
        height : 50,
        width : 160,
        marginTop : 30,
        backgroundColor : 'red',
        elevation : 2,
    },
    naverLoginImg :{
        height : 50,
        width : 160,
    },

    socialLoginButton:{
        marginTop : 30,
        flexDirection : "row",
        justifyContent : "space-between",
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
