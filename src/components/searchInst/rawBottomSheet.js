import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import LogoIMG from '../common/logoIMG';
import RBSheet from 'react-native-raw-bottom-sheet';
import { globalStyle } from '../../assets/style/globalStyle';
import { useNavigation } from '@react-navigation/native';
//import BottomTab from '../../navigator/bottomTab';

export default function rawBottomSheet({refRBSheet, searchedList} ) {
    
const navigation = useNavigation();

//선택한 아이템 이름
const [selectedInst, setSelectedInst] = useState({
    idx : 0,
    inst_name : ''
});

    function change(name){
        console.log('change : ', selectedInst);
    }
    return (
        <RBSheet
            height={500}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            dragFromTopOnly={true}
            customStyles={{
                wrapper: { backgroundColor: "transparent" },
                draggableIcon: { backgroundColor: "#000" },
            }}
        >

            <View style={{flex : 1}}> 


                <FlatList 
                    keyExtractor={(item) => {
                        return item.idx
                    }}
                    data={searchedList}


                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                            change('adsfdsafasdf');
                            setSelectedInst({
                                idx : item.idx,
                                inst_name : item.inst_name
                            });
                            console.log(selectedInst);
                            navigation.navigate('instDetail',{ inst_name : {selectedInst}});
                        }}>
                            <View styles={{widh: '100%', flexDirection: 'row',backgroundColor : 'pink'}}>
                                
                                <LogoIMG imgStyle={globalStyle.mapLogo} styles={{flex :1 }}/>
                                <Text styles={{flex : 3 }} >{item.inst_name}</Text>
                                
                            </View>    
                        </TouchableOpacity>


                    )}
                    
                />
            </View>
        

        
        </RBSheet>
    )
}

const styles = StyleSheet.create({
    rawBottomSheetView :{
        
    }
})
