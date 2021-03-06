import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import IonIcon from 'react-native-vector-icons/Ionicons';


//////////////////// 탑 탭에 들어갈것들 /////////////////////////
import {
    Button,
    Title,
    Paragraph,
    Divider,
  } from 'react-native-paper';
  import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
  } from 'react-native-paper-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InstitutionDetail from '../searchInst/institutionDetail'
import InstitutionReview from '../searchInst/institutionReview'
////////////////////////////////////////////////////////////////




const Tab = createMaterialTopTabNavigator();

export default function institutionInfo(props,{navigation}) {

    const [imageTest, setImageTest] = React.useState([
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRtd1DmFPUolhZd_-1mwxBMNQxxRaoHy7rlp4CZS_sl--wgBOh51inhB5QLQ_2vq8Pns&usqp=CAU",
        "http://health.chosun.com/site/data/img_dir/2020/03/31/2020033104515_0.jpg",
        "https://littledeep.com/wp-content/uploads/2019/05/littledeep_hospital_sns-1024x552.png"
    ]);
    const [imageIndex, setImageIndex] = React.useState(1)
    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor : 'yellow',}}>
    
                {/* /////////////////////////병원 이미지 부분///////////////////////// */}
                <View style={{backgroundColor : 'green'}}>
                    {/* 병원 이미지 슬라이더 */}
                    <SliderBox 
                        autoplay={true}
                        circleLoop={true}
                        resizeMode="cover"
                        images={props.image || imageTest}
                        dotColor="rgba(0,0,0,0)"
                        inactiveDotColor="rgba(0,0,0,0)"
                        currentImageEmitter={(index) => { setImageIndex(index+1) }}
                        
                    />

                    {/* 이미지 인덱스 */}
                    <View style={styles.imageIndex}>
                        <Text style={styles.imageIndexText}>
                        {imageIndex}/{imageTest.length}
                        </Text>
                    </View>


                    {/* 뒤로가기 키 */}
                    <View style={styles.goBackbutton}>
                        <EvilIconsIcon
                            name="chevron-left"
                            style={{fontSize : 70}}
                            onPress = {() => navigation.goBack()}
                        />
                    </View>
                </View>
                {/*//////////////////////////////////////////////////////////////////////*/}



                {/* /////////////////////////  병원 이름 박스  ///////////////////////// */}
                <View style={styles.headerBox}>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerTitleText}>와이아동발달센터</Text>
                        <EvilIconsIcon
                            name="heart"
                            style={styles.heartIcon}
                        />
                    </View>
                    <View style={styles.careTypeBox}>
                        <Text style={styles.careTypeText}> 운동치료 작업치료 언어치료</Text>
                        <Text style={styles.voucherText}> 바우처 종류</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.headerButtonView}>
                            <TouchableOpacity style={styles.headerButton}>
                                <IonIcon name="home-outline" style={styles.headerButtonIcon} />
                                <Text style={styles.headerButtonText}>홈페이지</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerButtonView}>
                            <TouchableOpacity style={styles.headerButton}>
                                <IonIcon name="call-outline" style={styles.headerButtonIcon} />
                                <Text style={styles.headerButtonText}>전화걸기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerButtonView}>
                            <TouchableOpacity style={styles.headerButton}>
                                <IonIcon name="chatbox-ellipses-outline" style={styles.headerButtonIcon} />
                                <Text style={styles.headerButtonText}> 상담톡   </Text>                         
                            </TouchableOpacity>
                        </View>

                    </View>
                    
                </View>
                <Divider color= '#DADADA' height= {2} />
                {/*//////////////////////////////////////////////////////////////////////*/}



                {/*/////////////////////////  Top Tab navigator  ////////////////////////*/}
                <View style={{marginTop : 10, backgroundColor : 'blue'}}>
                    <Tabs 
                        // defaultIndex={0} // default = 0
                        // uppercase={false} // true/false | default=true | labels are uppercase
                        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
                        // iconPosition // leading, top | default=leading
                        style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
                        // dark={false} // works the same as AppBar in react-native-paper
                        // theme={} // works the same as AppBar in react-native-paper
                        // mode="scrollable" // fixed, scrollable | default=fixed
                        // onChangeIndex={(newIndex) => {}} // react on index change
                        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
                    >
                        
                        <TabScreen label="상세정보" >
                            <View style={{height : 100,backgroundColor : 'green'}}>
								<Text> aaaaaaaa </Text>
                            </View>
                        </TabScreen>
                        <TabScreen label="리뷰" >
                            <InstitutionReview />
                        </TabScreen>
                    </Tabs>
                </View> 
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : 'white',
    },
    goBackbutton:{
        position: 'absolute',
        top : '5%',
        left : '0%',
    },
    imageIndex:{
        position: 'absolute',
        top: '70%',
        right: 0,
        paddingTop: 4,
        paddingRight: 6,
        paddingBottom: 4,
        paddingLeft: 10,
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    imageIndexText:{ 
        fontSize: 15, 
        color: '#ffffff' 
    },

    ////////////////////////////////////////////
    ////////////////////////////////////////////

    headerBox :{
        backgroundColor : 'green',
        //flex : 1,
        marginTop : 20,
        marginLeft : 20,
        marginRight : 20,
        justifyContent : 'center'
        
    },
    headerTitle:{
        flexDirection : 'row',
        justifyContent :'space-between'
    },
    headerTitleText : {
        fontSize : 20,
        fontWeight : 'bold',
    },
    heartIcon :{
        fontSize : 30,
    },
    careTypeBox :{
        marginTop : 10,
    },
    careTypeText:{
        color : '#C4C4C4',
    },
    voucherText :{
        color : 'green',
        marginTop : 5,
        marginBottom : 10,
    },
    buttonContainer :{
        flexDirection :'row',
    },
    headerButtonView:{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    headerButton :{
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 15,
        marginBottom : 15, 
        backgroundColor : '#FA8072',
        borderRadius : 15,
        elevation : 2
    },
    headerButtonIcon:{
        fontSize : 25,
        marginRight : 10,
        marginLeft : 10,
        marginTop : 5,
        marginBottom : 5,
        color :'#ffffff'
    },
    headerButtonText:{
        color : '#ffffff',
        fontSize : 15,
        marginRight : 10,
        marginTop : 5,
        marginBottom : 5,
    },
})
