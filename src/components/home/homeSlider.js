import React, { useState, Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';
import { globalStyle } from '../../assets/style/globalStyle'



export default function homeSlider() {
    

    //event 테이블이 필요... (진행중 : 1 , 종료 : 0)
    const [image, setImage] = useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
        "https://www.addeck.io/upload/template/admin/1596378688__.jpg",
    ]);

    return (
        <View> 
            <SliderBox
                sliderBoxHeight={160}
                autoplay={true}  //자동 슬라이드 넘김
                circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                images={image}
                ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
                dotColor="#FFC0CB"
                inactiveDotColor="#90A4AE"
                onCurrentImagePressed={index => console.log(`homeTest : event image ${index} pressed`)}  //로그 출력용
                //currentImageEmitter={index => console.log(`homeTest pos is: ${index}`)}  //로그 출력용
            />
        </View>
    )

}

