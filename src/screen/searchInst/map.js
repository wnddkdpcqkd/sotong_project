import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Image ,TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { globalStyle } from '../../assets/style/globalStyle';
import SearchBox from '../../components/common/searchBox';
import LogoIMG from '../../components/common/logoIMG';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import RBSheet from 'react-native-raw-bottom-sheet';
import search from './search';
import RawBottomSheet from '../../components/searchInst/rawBottomSheet';

const markerIMG = '../../assets/image/marker_round.png'


const setMarker = (inst) => {
    return(
        inst.map((item) => (
        <Marker 
            width={20}
            height={20}
            key={item.idx}
            coordinate={{latitude : item.latitude, longitude: item.longitude}}
            image={require(markerIMG)} 
        >
        </Marker>
        )
    ));
}

export default function mapSearch({navigation}) {

    //전체 병원 목록
    const [instInfo, setInstInfo] = useState([
        { 
        idx : 0,
        inst_name : 'EY미술심리상담센터',
        latitude : 35.24370944,
        longitude : 129.087259
        },
       { 
        idx : 1,
        inst_name : '가온누리 언어심리발달연구소',
        latitude : 35.15007746,
        longitude : 129.0116214
        },
       { 
        idx : 2,
        inst_name : '강남식아동발달연구센터',
        latitude : 35.1893898,
        longitude : 129.0816266
        },
       { 
        idx : 3,
        inst_name : '강서구종합사회복지관',
        latitude : 35.21676068,
        longitude : 128.9593383
        },
       { 
        idx : 14,
        inst_name : '강서아이발달연구소',
        latitude : 35.09734147,
        longitude : 128.9235007
        },
       { 
        idx : 15,
        inst_name : '개금종합사회복지관',
        latitude : 35.16412813,
        longitude : 129.024995
        },
       { 
        idx : 26,
        inst_name : '구남역언어심리상담센터',
        latitude : 35.19782022,
        longitude : 128.9950855
        },
       { 
        idx : 27,
        inst_name : '굳센아동청소년발달센터',
        latitude : 35.23933155,
        longitude : 129.0865765
        },
       { 
        idx : 28,
        inst_name : '글로벌사회서비스센터',
        latitude : 35.10049024,
        longitude : 128.9809199
        },
       { 
        idx : 29,
        inst_name : '금곡언어심리센터',
        latitude : 35.2351571,
        longitude : 129.0119935
        },
       { 
        idx : 40,
        inst_name : '금정구장애인복지관',
        latitude : 35.21955479,
        longitude : 129.0989619
        },
       { 
        idx : 41,
        inst_name : '금정언어발달센터',
        latitude : 35.27100992,
        longitude : 129.0923559
        },
       { 
        idx : 42,
        inst_name : '기장언어심리치료센터',
        latitude : 35.24284938,
        longitude : 129.2178935
        },
       { 
        idx : 53,
        inst_name : '꿈공작소',
        latitude : 35.23543357,
        longitude : 129.0098792
        },
       { 
        idx : 64,
        inst_name : '나눔심리발달센터',
        latitude : 35.1121179,
        longitude : 129.0127889
        },
       { 
        idx : 65,
        inst_name : '나무언어감각치료센터',
        latitude : 35.32098963,
        longitude : 129.1898864
        },
       { 
        idx : 76,
        inst_name : '나사함발달장애인복지관',
        latitude : 35.14133283,
        longitude : 129.0890636
        },
       { 
        idx : 77,
        inst_name : '남구장애인복지관',
        latitude : 35.12923682,
        longitude : 129.0992147
        },
       { 
        idx : 88,
        inst_name : '다온',
        latitude : 35.24512792,
        longitude : 129.0922156
        },
       { 
        idx : 89,
        inst_name : '당감종합사회복지관',
        latitude : 35.16232437,
        longitude : 129.0366013
        },
       { 
        idx : 90,
        inst_name : '대연아동발달센터',
        latitude : 35.13245697,
        longitude : 129.091314
        },
       { 
        idx : 91,
        inst_name : '더자람아동청소년발달센터',
        latitude : 35.14151536,
        longitude : 128.989038
        },
       { 
        idx : 92,
        inst_name : '덕천종합사회복지관',
        latitude : 35.2090145,
        longitude : 129.0171502
        },
       { 
        idx : 103,
        inst_name : '도담도담 인지발달센터',
        latitude : 35.2709501,
        longitude : 129.0876362
        },
       { 
        idx : 104,
        inst_name : '도듬심리발달연구소',
        latitude : 35.13805845,
        longitude : 129.1021341
        },
       { 
        idx : 105,
        inst_name : '동구장애인복지관',
        latitude : 35.13091887,
        longitude : 129.0404185
        },
       { 
        idx : 106,
        inst_name : '동구종합사회복지관',
        latitude : 35.14563025,
        longitude : 129.0424297
        },
       { 
        idx : 107,
        inst_name : '동래구장애인복지관',
        latitude : 35.19703348,
        longitude : 129.1003803
        },
       { 
        idx : 108,
        inst_name : '동아와우청각언어센터',
        latitude : 35.17339081,
        longitude : 129.0719003
        },
       { 
        idx : 109,
        inst_name : '동인아동발달센터',
        latitude : 35.10319711,
        longitude : 128.9761627
        },
       { 
        idx : 110,
        inst_name : '라임언어심리발달센터',
        latitude : 35.10377581,
        longitude : 128.9265196
        },
       { 
        idx : 111,
        inst_name : '마음공감발달심리상담센터',
        latitude : 35.15286451,
        longitude : 129.0227573
        },
       { 
        idx : 112,
        inst_name : '만덕종합사회복지관',
        latitude : 35.20185873,
        longitude : 129.0353933
        },
       { 
        idx : 123,
        inst_name : '맑음 언어심리 클리닉',
        latitude : 35.08168819,
        longitude : 128.9032386
        },
       { 
        idx : 124,
        inst_name : '메디칼아동청소년발달센터',
        latitude : 35.15882429,
        longitude : 129.0576139
        },
       { 
        idx : 125,
        inst_name : '명지심리언어치료센터',
        latitude : 35.08859021,
        longitude : 128.8991939
        },
       { 
        idx : 126,
        inst_name : '모라종합사회복지관',
        latitude : 35.18494473,
        longitude : 128.9978741
        },
       { 
        idx : 127,
        inst_name : '모모아동발달센터',
        latitude : 35.20085137,
        longitude : 129.0871643
        },
       { 
        idx : 138,
        inst_name : '미소아동발달센터',
        latitude : 35.18697062,
        longitude : 129.107556
        },
       { 
        idx : 139,
        inst_name : '미소언어심리발달센터',
        latitude : 35.13548914,
        longitude : 129.0931322
        },
       { 
        idx : 150,
        inst_name : '박성일 청각언어센터',
        latitude : 35.09817697,
        longitude : 129.0346826
        },
       { 
        idx : 151,
        inst_name : '반송종합사회복지관',
        latitude : 35.22639867,
        longitude : 129.1469064
        },
       { 
        idx : 152,
        inst_name : '반여종합사회복지관',
        latitude : 35.19828992,
        longitude : 129.1318914
        },
       { 
        idx : 153,
        inst_name : '별빛심리언어발달센터',
        latitude : 35.09860364,
        longitude : 128.9180102
        },
       { 
        idx : 154,
        inst_name : '별아동심리발달센터',
        latitude : 35.16054707,
        longitude : 129.1140392
        },
       { 
        idx : 158,
        inst_name : '보듬음악심리발달센터',
        latitude : 35.17664443,
        longitude : 129.1254082
        },
       { 
        idx : 166,
        inst_name : '봉봉아동가족교육상담센터',
        latitude : 35.23392736,
        longitude : 129.0112298
        },
       { 
        idx : 177,
        inst_name : '부산경신청각언어연구소',
        latitude : 35.14800981,
        longitude : 129.0588856
        },
       { 
        idx : 178,
        inst_name : '부산광역시장애인종합복지관',
        latitude : 35.19056115,
        longitude : 129.0815464
        },
       { 
        idx : 189,
        inst_name : '부산뇌병변복지관',
        latitude : 35.24445143,
        longitude : 129.0100669
        },
       { 
        idx : 200,
        inst_name : '부산동구아동가족상담센터',
        latitude : 35.12395856,
        longitude : 129.0440664
        },
       { 
        idx : 201,
        inst_name : '부산심리치료연구센터(놀이치료연구소)',
        latitude : 35.17664443,
        longitude : 129.1254082
        },
       { 
        idx : 202,
        inst_name : '부산아동발달지원센터',
        latitude : 35.16923652,
        longitude : 129.0720552
        },
       { 
        idx : 203,
        inst_name : '부산아동인지상담센터',
        latitude : 0,
        longitude : 0
        },
       { 
        idx : 204,
        inst_name : '부산언어발달연구소',
        latitude : 35.20564356,
        longitude : 129.0758223
        },
       { 
        idx : 207,
        inst_name : '부산인지심리연구소',
        latitude : 35.21189776,
        longitude : 129.00608
        },
       { 
        idx : 216,
        inst_name : '부산인지학습연구소 부설 한스말발달연구원',
        latitude : 35.2546779,
        longitude : 129.0891907
        },
       { 
        idx : 227,
        inst_name : '부산인지학습연구소&한스말발달연구원',
        latitude : 35.15810212,
        longitude : 129.0536629
        },
       { 
        idx : 238,
        inst_name : '부산종합사회복지관',
        latitude : 35.1710363,
        longitude : 129.0986684
        },
       { 
        idx : 239,
        inst_name : '부산진구장애인복지관',
        latitude : 35.16404847,
        longitude : 129.0658467
        },
       { 
        idx : 240,
        inst_name : '부산특수치료교육연구원',
        latitude : 35.24647654,
        longitude : 129.0908
        },
       { 
        idx : 241,
        inst_name : '북구장애인종합복지관',
        latitude : 35.26711896,
        longitude : 129.0175545
        },
       { 
        idx : 252,
        inst_name : '빛마루',
        latitude : 35.21269563,
        longitude : 129.0249014
        },
       { 
        idx : 263,
        inst_name : '사상구장애인복지관',
        latitude : 35.1848992,
        longitude : 129.0009312
        },
       { 
        idx : 264,
        inst_name : '사직언어치료센터',
        latitude : 35.20087719,
        longitude : 129.0652749
        },
       { 
        idx : 275,
        inst_name : '사하구장애인종합복지관',
        latitude : 35.08543902,
        longitude : 128.9929974
        },
       { 
        idx : 276,
        inst_name : '상리종합사회복지관',
        latitude : 35.08616559,
        longitude : 129.070776
        },
       { 
        idx : 277,
        inst_name : '새가을언어학습심리센터',
        latitude : 35.22488698,
        longitude : 129.0101518
        },
       { 
        idx : 288,
        inst_name : '새꿈아동발달상담센터',
        latitude : 35.19213963,
        longitude : 129.0789231
        },
       { 
        idx : 289,
        inst_name : '서구장애인복지관',
        latitude : 35.11066521,
        longitude : 129.0235292
        },
       { 
        idx : 290,
        inst_name : '센소리발달센터',
        latitude : 35.06199974,
        longitude : 128.9841876
        },
       { 
        idx : 291,
        inst_name : '소담발달센터',
        latitude : 35.0771342,
        longitude : 128.9774866
        },
       { 
        idx : 293,
        inst_name : '소리엘언어발달센터',
        latitude : 35.19966177,
        longitude : 129.0628141
        },
       { 
        idx : 304,
        inst_name : '수영구장애인복지관',
        latitude : 35.1593712,
        longitude : 129.1049577
        },
       { 
        idx : 305,
        inst_name : '신라대사직사회서비스센터',
        latitude : 35.19909624,
        longitude : 129.0573004
        },
       { 
        idx : 306,
        inst_name : '아름공감심리센타',
        latitude : 0,
        longitude : 0
        },
       { 
        idx : 307,
        inst_name : '아름다운언어심리센터',
        latitude : 35.09751548,
        longitude : 128.9220869
        },
       { 
        idx : 308,
        inst_name : '아이맘심리발달센터',
        latitude : 35.20628067,
        longitude : 129.0760223
        },
       { 
        idx : 309,
        inst_name : '아이미래심리상담센터',
        latitude : 35.23418327,
        longitude : 129.0133067
        },
       { 
        idx : 320,
        inst_name : '아이원트심리발달센터',
        latitude : 35.32140303,
        longitude : 129.1815419
        },
       { 
        idx : 331,
        inst_name : '아이윈인지언어심리상담센터',
        latitude : 35.10132557,
        longitude : 128.9795011
        },
       { 
        idx : 332,
        inst_name : '언어청각상담센터 이음',
        latitude : 35.11845616,
        longitude : 129.0192169
        },
       { 
        idx : 333,
        inst_name : '에덴언어심리발달연구소',
        latitude : 35.13698166,
        longitude : 129.098319
        },
       { 
        idx : 334,
        inst_name : '연제구 거제종합사회복지관',
        latitude : 35.1884749,
        longitude : 129.0707003
        },
       { 
        idx : 345,
        inst_name : '영도구장애인복지관',
        latitude : 35.07526538,
        longitude : 129.066859
        },
       { 
        idx : 356,
        inst_name : '영도구종합사회복지관',
        latitude : 35.0812154,
        longitude : 129.0475116
        },
       { 
        idx : 367,
        inst_name : '영진종합사회복지관',
        latitude : 35.20575951,
        longitude : 129.1263373
        },
       { 
        idx : 368,
        inst_name : '온유발달센터',
        latitude : 35.18801703,
        longitude : 129.0816924
        },
       { 
        idx : 379,
        inst_name : '우리아이발달·심리상담센터',
        latitude : 35.10328136,
        longitude : 128.9753397
        },
       { 
        idx : 380,
        inst_name : '운봉종합사회복지관',
        latitude : 35.2302889,
        longitude : 129.158665
        },
       { 
        idx : 381,
        inst_name : '위캔아동발달센터',
        latitude : 35.19232394,
        longitude : 129.088852
        },
       { 
        idx : 382,
        inst_name : '은우심리발달연구소',
        latitude : 35.08706709,
        longitude : 128.8777905
        },
       { 
        idx : 383,
        inst_name : '이근희소아운동발달연구소',
        latitude : 35.18292789,
        longitude : 129.0812023
        },
       { 
        idx : 384,
        inst_name : '이루어GYM',
        latitude : 35.13737654,
        longitude : 129.0655701
        },
       { 
        idx : 385,
        inst_name : '이룸특수체육연구소',
        latitude : 35.1854702,
        longitude : 129.1256317
        },
       { 
        idx : 386,
        inst_name : '이지특수교육연구소',
        latitude : 35.23732752,
        longitude : 129.0918974
        },
       { 
        idx : 387,
        inst_name : '인우심리상담센터',
        latitude : 35.13506155,
        longitude : 129.0941329
        },
       { 
        idx : 388,
        inst_name : '자모감각통합아동발달센터',
        latitude : 35.10968247,
        longitude : 129.0172977
        },
       { 
        idx : 389,
        inst_name : '자모언어심리발달센터',
        latitude : 35.11162869,
        longitude : 129.0168134
        },
       { 
        idx : 390,
        inst_name : '장산아이즈연구소(부설 장산언어치료센터)',
        latitude : 35.16957683,
        longitude : 129.1776778
        },
       { 
        idx : 391,
        inst_name : '장선종합사회복지관',
        latitude : 35.19426533,
        longitude : 129.0086898
        },
       { 
        idx : 402,
        inst_name : '절영종합사회복지관',
        latitude : 35.07221629,
        longitude : 129.0617504
        },
       { 
        idx : 413,
        inst_name : '정관바름심리의사소통센터',
        latitude : 35.32655462,
        longitude : 129.1708838
        },
       { 
        idx : 424,
        inst_name : '정관심리언어발달센터',
        latitude : 35.32170491,
        longitude : 129.1762537
        },
       { 
        idx : 435,
        inst_name : '정관아동발달센터',
        latitude : 35.32195524,
        longitude : 129.1797441
        },
       { 
        idx : 446,
        inst_name : '정관언어발달센터',
        latitude : 35.33449346,
        longitude : 129.1658174
        },
       { 
        idx : 457,
        inst_name : '주은언어발달 심리상담센터',
        latitude : 35.18894549,
        longitude : 129.0805967
        },
       { 
        idx : 468,
        inst_name : '중구종합사회복지관',
        latitude : 35.10578462,
        longitude : 129.0282406
        },
       { 
        idx : 469,
        inst_name : '지원발달심리치료연구소',
        latitude : 35.2039471,
        longitude : 129.0690406
        },
       { 
        idx : 470,
        inst_name : '책과창의꿈터',
        latitude : 35.14215272,
        longitude : 129.1079701
        },
       { 
        idx : 471,
        inst_name : '킴스아동발달센터',
        latitude : 35.107414,
        longitude : 129.0205285
        },
       { 
        idx : 472,
        inst_name : '플로리시언어&상담센터',
        latitude : 35.17027223,
        longitude : 129.1121163
        },
       { 
        idx : 473,
        inst_name : '하담아동발달센터',
        latitude : 35.09886025,
        longitude : 128.9870483
        },
       { 
        idx : 474,
        inst_name : '학장종합사회복지관',
        latitude : 35.13865144,
        longitude : 128.9897444
        },
       { 
        idx : 475,
        inst_name : '한국치료교육지원센터',
        latitude : 35.10953115,
        longitude : 129.0289094
        },
       { 
        idx : 476,
        inst_name : '한마음아동발달센터',
        latitude : 35.20664272,
        longitude : 129.0733115
        },
       { 
        idx : 477,
        inst_name : '함께사회서비스지원센터',
        latitude : 35.16674461,
        longitude : 128.9879555
        },
       { 
        idx : 478,
        inst_name : '해오름아동발달센터(기장점)',
        latitude : 35.24493341,
        longitude : 129.2142383
        },
       { 
        idx : 489,
        inst_name : '해운대언어발달센터',
        latitude : 35.17045788,
        longitude : 129.1755722
        },
       { 
        idx : 500,
        inst_name : '해운대종합사회복지관',
        latitude : 35.17966921,
        longitude : 129.1275323
        },
       { 
        idx : 501,
        inst_name : '행복숲아동발달사회적협동조합',
        latitude : 35.1854702,
        longitude : 129.1256317
        },
       { 
        idx : 502,
        inst_name : '행복한심리언어상담센터',
        latitude : 35.14761795,
        longitude : 129.1097249
        },
       { 
        idx : 503,
        inst_name : '화명언어심리센터',
        latitude : 35.23590663,
        longitude : 129.0113195
        },
       { 
        idx : 514,
        inst_name : '화명종합사회복지관',
        latitude : 35.22680891,
        longitude : 129.0097811
        },
       { 
        idx : 525,
        inst_name : '화정종합사회복지관',
        latitude : 35.2536421,
        longitude : 129.0153901
        },
       { 
        idx : 536,
        inst_name : '힐링뮤직아트센터',
        latitude : 35.18419197,
        longitude : 129.0832491
        },
       { 
        idx : 537,
        inst_name : '경기편안한아이심리발달센터',
        latitude : 36.99094666,
        longitude : 127.1056917
        },
       { 
        idx : 538,
        inst_name : '동래평생교육원',
        latitude : 35.21096155,
        longitude : 129.0796269
        },
       { 
        idx : 539,
        inst_name : '선아원',
        latitude : 35.22871645,
        longitude : 129.0764424
        },
    ]);
    
    //검색된 목록
    const [searchedList, setSearchedList] = useState([
        { 
            idx: 0,
            inst_name : 'EY미술심리상담센터',
            latitude : 35.24370944,
            longitude : 129.087259
        },
        { 
            idx: 1,
            inst_name : '가온누리 언어심리발달연구소',
            latitude : 35.15007746,
            longitude : 129.0116214
        },
        { 
            idx : 2,
            inst_name : '강남식아동발달연구센터',
            latitude : 35.1893898,
            longitude : 129.0816266
            },
           { 
            idx : 3,
            inst_name : '강서구종합사회복지관',
            latitude : 35.21676068,
            longitude : 128.9593383
            },
           { 
            idx : 14,
            inst_name : '강서아이발달연구소',
            latitude : 35.09734147,
            longitude : 128.9235007
            },
           { 
            idx : 15,
            inst_name : '개금종합사회복지관',
            latitude : 35.16412813,
            longitude : 129.024995
            },
           { 
            idx : 26,
            inst_name : '구남역언어심리상담센터',
            latitude : 35.19782022,
            longitude : 128.9950855
            },
           { 
            idx : 27,
            inst_name : '굳센아동청소년발달센터',
            latitude : 35.23933155,
            longitude : 129.0865765
            },
    ]);

    //RBSheet에서 선택한 기관
    const [selectedInst, setSelectedInst] = useState({
        
    });

    const refRBSheet = useRef();
    const P0 = {latitude: 37.564362, longitude: 126.977011};

    return (
        <View style={globalStyle.container}>



            {/* 검색창 
            TouchableOpacity onPress -> 클릭시 searchedList 값 변경 
            */}
            <View style={styles.headerSearch}>
                <View style={{flex : 1, backgroundColor : 'red'}} >
                    <LogoIMG imgStyle={globalStyle.mapLogo} />
                </View>
                <View style={{flex : 3, backgroundColor : 'yellow'}}>
                    {/* <TouchableOpacity onPress={()=>{refRBSheet.current.open()}}> */}
                    <TouchableOpacity onPress={()=>{navigation.navigate('search')}}>
                        <SearchBox />
                    </TouchableOpacity>
                </View>
            </View>



            {/* 지도 */}
            {/* 처음 검색창 들어갈때만 마커 보이고 두번째부터는 마커 미아됨 */}
            {/* <View style={styles.mapView}> */}
            <NaverMapView style={{flex : 9, width: '100%'}}
                                    showsMyLocationButton={false}
                                    center={{...P0, zoom: 16}}
                >  
                    {/* { setMarker(instInfo) } */}
            </NaverMapView>
            {/* </View> */}





            {/* RBSheet */}
            <RawBottomSheet refRBSheet={refRBSheet} searchedList={searchedList} />


        </View>

    )
}

const styles = StyleSheet.create({
    headerSearch :{
        flex : 1,
        flexDirection : 'row',
    },

    mapView : {
        flex : 8,
        width : '100%',
    },

});











