import { StyleSheet , Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const globalStyle = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems :'center',
    },

    homeLogo: {
        width: 45, 
        height: 45,
        marginTop :10,
    },

    mapLogo: {
        width: 45, 
        height: 45,
        marginTop : 10,
        marginLeft : 15,
    },

    homeTextContainer: {
        backgroundColor : 'yellow',
        width : '100%',
        marginTop : 10,
    },

    homeSearchBoxView: {
        //backgroundColor : 'yellow',
        marginTop : 10,
        height : 60,
        alignItems : 'center',
    },

    fontJalnan: {
        fontFamily:"jalnan",
        fontSize : 25,
        textAlign : 'center',
        color : '#272727',
        lineHeight : 40
    },

    fontGothic: {
        fontFamily: 'SD_Gothic B',
        fontSize: 28,
        fontWeight:'bold',
        marginBottom: 10,
        color: '#272727',
        textAlign: 'center'
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
    
    shadowViewBox: {
        width: '100%',
        height: 70,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})