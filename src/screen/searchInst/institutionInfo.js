import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";



//////////////////// 탑 탭에 들어갈것들 /////////////////////////
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import institutionDetail from './institutionDetail'
import institutionReview from './institutionReview'
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
            <ScrollView>
    
                {/* /////////////////////////병원 이미지 부분///////////////////////// */}
                <View>
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
                    </View>
                </View>
                {/*//////////////////////////////////////////////////////////////////////*/}



                {/*/////////////////////////  Top Tab navigator  ////////////////////////*/}
                <Tab.navigator
                    initialRouteName="상세정보"
                    tabBarOptions={{
                        activeTintColor: '#e91e63',
                        labelStyle: { fontSize: 12 },
                        style: { backgroundColor: 'powderblue' },
                    }}
                >
                    <Tab.Screen name="상세정보" component={institutionDetail} />
                    <Tab.Screen name="리뷰" component={institutionReview} />
                </Tab.navigator>
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
    }
})
