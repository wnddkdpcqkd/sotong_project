import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import IonIcon from 'react-native-vector-icons/Ionicons';
import Divider from '../../components/common/divider';


//////////////////// 탑 탭에 들어갈것들 /////////////////////////
import {
    Button,
    Title,
    Paragraph,
  } from 'react-native-paper';
  import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
  } from 'react-native-paper-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InstitutionDetail from './institutionDetail'
import InstitutionReview from './institutionReview'
////////////////////////////////////////////////////////////////




const Tab = createMaterialTopTabNavigator();

export default function institutionInfo(props,{navigation}) {
    const [pageState, setPageState] = React.useState('detail')
    const [imageTest, setImageTest] = React.useState([
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRtd1DmFPUolhZd_-1mwxBMNQxxRaoHy7rlp4CZS_sl--wgBOh51inhB5QLQ_2vq8Pns&usqp=CAU",
        "http://health.chosun.com/site/data/img_dir/2020/03/31/2020033104515_0.jpg",
        "https://littledeep.com/wp-content/uploads/2019/05/littledeep_hospital_sns-1024x552.png"
    ]);
    const [imageIndex, setImageIndex] = React.useState(1)
    return (
        <View style={styles.container}>
            <ScrollView >
    
                {/* /////////////////////////병원 이미지 부분///////////////////////// */}
                <View style={{height: 200, }}>
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
                <Divider color='#DADADA' height={1} />
                {/*//////////////////////////////////////////////////////////////////////*/}



                {/*/////////////////////////  Top Tab navigator  ////////////////////////*/}
                <View style={{height : 50 ,backgroundColor : 'white', flexDirection : 'row'}}>
                    <View style={{flex : 1 ,alignItems : 'center', justifyContent : 'center'}}>
                        <TouchableOpacity onPress={() => setPageState('detail')}>
                            <Text>상세정보</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex : 1 ,alignItems : 'center', justifyContent : 'center'}}>
                        <TouchableOpacity onPress={() => setPageState('review')}>
                            <Text>리뷰</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider color='#DADADA' height={1} />
                {/*////////////////////////////////////////////////////////////////////////*/}
                
                
                
                {/*////////////////////////////  상세정보, 리뷰   //////////////////////////*/}
                
                {pageState === 'detail' ? 
                ////////////////////////진료시간
                <View>
                    <View style={styles.detailContainer}>
                        <View>
                            <View style={styles.treatmentHourText}>
                                <IonIcon name="alarm-outline" style={{fontSize : 25}}/>
                                <Text style={{fontSize :20}}>  진료시간 </Text>
                            </View>
                            <View style={{flexDirection : 'row'}}>
                                <View style={{flex : 1,marginTop : 10, marginLeft : 40}}>
                                    <Text style={{fontSize : 15}}>평일</Text>
                                    <Text style={{fontSize : 15}}>09:00 ~ 18:00</Text>
                                </View>
                                <View style={{flex : 1, marginTop : 10, marginLeft : 0}}>
                                    <Text style={{fontSize : 15}}>토</Text>
                                    <Text style={{fontSize : 15}}>09:00 ~ 13:00</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row'}}>
                                <View style={{flex : 1,marginTop : 10, marginLeft : 40}}>
                                    <Text style={{fontSize : 15}}>일,공휴일</Text>
                                    <Text style={{fontSize : 15}}>휴진</Text>
                                </View>
                                <View style={{flex : 1, marginTop : 10, marginLeft : 0}}>
                                    <Text style={{fontSize : 15}}>점심시간</Text>
                                    <Text style={{fontSize : 15}}>13:00 ~ 14:00</Text>
                                </View>
                            </View>
                        </View>
                    </View>
            
                    <Divider color='#DADADA' height={2}/>
                    {/* 진료 특이사항 */}
                    <View style={styles.detailContainer}>
                        <View >
                            <View style={styles.treatmentHourText}>
                                <IonIcon name="alert-circle-outline" style={{fontSize : 25}}/>
                                <Text style={{fontSize :20}}>  진료특이사항 </Text>
                            </View>
                            <View style={{marginLeft : 40, marginTop : 10}}>
                                <Text style={{fontSize : 15}}>평일 : 매주 수요일 오후 휴진</Text>
                            </View>
                        </View>
                    </View>
                    <Divider color='#DADADA' height={2}/>
                    
                    {/* 주소 */}
                    <View style={styles.detailContainer}>
                        <View >
                            <View style={styles.treatmentHourText}>
                                <IonIcon name="map-outline" style={{fontSize : 25}}/>
                                <Text style={{fontSize :20}}>  주소 </Text>
                            </View>
                            <View style={{marginLeft : 40, marginTop : 10}}>
                                <Text style={{fontSize : 15}}>서울특별시 서초구 어쩌구 저쩌구</Text>
                                <Text style={{fontSize : 15}}>(빌딩이름, 몇층)</Text>
                            </View>
                        </View>
                    </View>
                    <Divider color='#DADADA' height={2}/>


                </View>
                : <Text>bbb</Text>}

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
        flex : 1,
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

    /////////////////////////////////////
    /////////////////////////////////////
    detailContainer:{
        marginLeft : 20,
        marginBottom : 20
    },
    treatmentHourText :{
        marginTop : 20,
        flexDirection : 'row',
    }
})
