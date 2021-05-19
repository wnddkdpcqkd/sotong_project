import React, {useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SearchBox from '../../components/common/searchBox';
import { globalStyle } from '../../assets/style/globalStyle'
import LogoIMG from '../../components/common/logoIMG'
import HomeText from '../../components/home/homeText'
import HomeSlider from '../../components/home/homeSlider'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = ({navigation}) => {
  
  //const [centerName, setCenterName] = useState();
  //const {centerType, setCenterType} = useContext(SearchContext);

  return (
      <View style={globalStyle.container}>

        {/* 맨 위 로고 */}
        <View style={styles.logoContainer}>
          <LogoIMG imgStyle={globalStyle.homeLogo}></LogoIMG>
          <HomeText></HomeText>
        </View>


        {/* 검색 버튼 */}
        <View style={styles.searchBoxContainer}>
          <View style={globalStyle.homeSearchBoxView}>
            <TouchableOpacity
              onPress={() => {navigation.navigate('search')}}
              style={{marginBottom:130}}
            >
              <SearchBox autoCorrect={false} editable={false}/>
            </TouchableOpacity>
          </View>
        </View>


        {/* 컨텐츠 */}
        <View style={styles.contentContainer}>
          
        </View>


        {/* 슬라이더 */}
        <View style={styles.sliderContainer}>
          <HomeSlider></HomeSlider>
        </View>


    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  logoContainer:{
    flex : 4, 
    alignItems:'center', 
    backgroundColor:'red',
    width: '100%',
  },
  searchBoxContainer: {
    flex : 2, 
    width : 0.8 * windowWidth, 
    alignItems : 'center',
    backgroundColor:'pink',
  },
  contentContainer :{
    flex : 5,
    backgroundColor: 'green',
  },
  sliderContainer :{
    flex : 3,
    backgroundColor: 'blue',
  },

});