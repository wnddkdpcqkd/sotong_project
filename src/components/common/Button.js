import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

const sotongLogo = "../../assets/image/logo_v1.png"

export default function Button(props) {
    return (
        <View>
                <TouchableOpacity
                    // onPress={() => props.navigation.navigate("home")}
                    style={{
                        height : props.height || 30,
                        width : props.width || 100, 
                        backgroundColor : props.backgroundColor || 'blue',
                        borderRadius : 5,
                        elevation : 2
                    }}
                    onPress = {props.onPress}
                >
                    <Text style={styles.loginText}> {props.text || "버튼"} </Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        elevation : 2,
    },
    loginText: {
        flex : 1,
        fontSize : 25,
        alignSelf : "center",
        justifyContent : "center",
        color: "white",
    },

})
