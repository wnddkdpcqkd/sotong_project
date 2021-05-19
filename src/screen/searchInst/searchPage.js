import React from 'react'
import { StyleSheet, Text, View, TextInput,Image } from 'react-native'
import { globalStyle } from '../../assets/style/globalStyle'

export default function serachPage() {
    return (
        <View style={globalStyle.container}>
            
            {/* 맨위에 검색창 */}
            <View style={styles.searchContainer}>

                <View style={{flex : 1, backgroundColor : 'red'}}>
                    <Text>이게 없어서그런가?</Text>
                </View>
                
                <View style={{flex : 6, backgroundColor : 'yellow'}}>
                    
                <TextInput
                    numberOfLines={1}
                    placeholder="병원 또는 센터를 검색하세요"
                    placeholderTextColor="#666"
                />
                </View>

                <View style={{flex : 1, backgroundColor : 'blue'}}>
                    {/* <TouchableOpacity onPress={() => {}}> */}
                        <Image style={styles.searchButtonIcon} source={require('../../assets/image/magnifier.png')}/>
                    {/* </TouchableOpacity> */}
                </View>

            </View>

            {/* 관련 병원 밑에 리스트로 뜨기 */}
        </View>
    )
}

const styles = StyleSheet.create({})
