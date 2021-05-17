import { StyleSheet , Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems :'center',
        width : windowWidth,
    },

    searchBoxContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#f0aa98',
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent : 'center',
        alignItems : 'center',
    },

    homeSearchBoxView: {
        flex : 1,
        backgroundColor : 'white',
        marginTop : 10, 
        width : 0.8 * windowWidth,
        height : 60,
        justifyContent : 'center',
        alignItems : 'center',
    },

    searchBoxInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },

    searchBoxIconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
      },

})