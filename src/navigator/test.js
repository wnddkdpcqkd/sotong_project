import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SearchBar } from 'react-native-elements';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";



export default function test({navigation}) {

    const [searchText , setSearchText ] = React.useState();
    
    return (
        <View style={styles.container}> 

            <View style={styles.header}>
                <View style = {styles.headerArrow}>
                    <EvilIconsIcon
                        name="chevron-left"
                        style={{fontSize : 35}}
                        onPress = {() => navigation.goBack()}
                    />
                </View>
                <View style = {styles.headerSearch}>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={(text) => setSearchText(text)}
                        lightTheme = {true}
                        value={(searchText)}
                    />
                </View>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    header : {
        flexDirection : 'row', height : '10%'
    },
    headerArrow: {
        flex : 1, alignItems : 'center' , justifyContent : 'center'
    },
    headerSearch : {
        flex : 9,
    }
})
