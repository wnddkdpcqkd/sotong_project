import React, {useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import SearchBox from '../../components/common/searchBox';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = ({navigation}) => {
  
  //const [centerName, setCenterName] = useState();
  //const {centerType, setCenterType} = useContext(SearchContext);

  return (
      <View style={styles.container}>
        <View>
          <Image style={{
            width: 35, 
            height: 35,
            marginTop :80

            }} 
            source={require('../../assets/image/logo_v1.png')}/>
          </View>

        <View style = {{
          backgroundColor : 'yellow',
          flex : 0.2,
          width : '100%',
          marginTop : 30
        }}>
        <Text style={{
          fontFamily:"jalnan",
          fontSize : 25,
          textAlign : 'center',
          color : '#272727',
          lineHeight : 40
        }}>소통하세요 ;)</Text>
        <Text style={styles.centralText}>소아재활 정보 검색</Text>
        </View>

        <View style={{
          flex : 1,
          backgroundColor : 'black',
          marginTop : 10, 
          width : 0.8*windowWidth,
          height : 60,
          alignItems : 'center'
          }}>
          <TouchableOpacity
          //onpress
          style={{marginBottom:130}}>
          <SearchBox
              //labelValue={centerName}
              //onChangeText={(userCenter) => setCenterName(userCenter)}
              //placeholderText="병원 또는 센터를 검색하세요"
              //iconType= {require('../assets/magnifier.png')}
              //autoCapitalize="none"
              autoCorrect={false}
              editable={false}
          />
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems :'center'
  },
  logo: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
    paddingBottom: 100,
  },
  centralText: {
    fontFamily: 'SD_Gothic B',
    fontSize: 28,
    fontWeight:'bold',
    marginBottom: 10,
    color: '#272727',
    textAlign: 'center'
  },
  leftText: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontFamily: 'SD_Gothic B',
    fontSize: 19,
    marginBottom: 10,
    color: '#051d5f',
    textAlign: 'center',
  },
});