import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';
import { NaverLogin, getProfile } from '@react-native-seoul/naver-login';
import { GlobalVar } from '../../GlobalVariables';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const ioskeys = {
  kConsumerKey: 'VC5CPfjRigclJV_TFACU',
  kConsumerSecret: 'f7tLFw0AHn',
  kServiceAppName: '테스트앱(iOS)',
  kServiceAppUrlScheme: 'testapp', // only for iOS
};

const androidkeys = {
  kConsumerKey: 'QuWkmldDj4pP3aPAq59I',
  kConsumerSecret: '6RQek41Dcj',
  kServiceAppName: '소통',
};

const initials = Platform.OS === 'ios' ? ioskeys : androidkeys;

const App = () => {
  const [naverToken, setNaverToken] = React.useState(null);
    const {loginCheck, setLoginCheck} = React.useContext(GlobalVar);

  const naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken(null);
    setLoginCheck(false);
  };

  const getUserProfile = async () => { 
    const profileResult = await getProfile(naverToken.accessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    console.log('profileResult', profileResult);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="네이버 아이디로 로그인하기"
        onPress={() => naverLogin(initials)}
      />
      {!!naverToken && <Button title="로그아웃하기" onPress={naverLogout} />}

      {!!naverToken && (
        <Button title="회원정보 가져오기" onPress={getUserProfile} />
      )}
        <Button title="토큰 확인" onPress={() => AsyncStorage.getItem('token',(err,result) => {
          console.log(result);
        })}/>
        <Button title="토큰 지우기" onPress={() => AsyncStorage.clear()}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default App;