import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Post from '../components/community/post';
import { getPost } from '../connection/gqlAPI2';


export default function test({navigation}) {

    const [searchText , setSearchText ] = React.useState();
    const [post, setPost] = React.useState([]);
    getPost().then((data) => { if(data && data.posts)  setPost(data.posts); })

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
            <View style={{flex : 1}}>
                <ScrollView style={{flex : 1}}>
                    {
                        post
							? post.map((item) => {
								if(item.title.indexOf(searchText) !== -1 || item.content.indexOf(searchText) !== -1)
								{
									console.log("item : ", item.title, item.content)
									return(
										<View style={{flex : 1}} key={item.id}>
											<TouchableOpacity onPress={()=> navigation.navigate('postDetail',item)}>
												<Post
													//postImage={item.image}
													title={item.title}
													content={item.content}
													category={item.small_category}
													type="communityList"
													//profileName={item.sotongUser.nick_name}
													profileTime={item.create_date}
													replyCount ={item.replyCount ? item.replyCount : 0 }
													likeCount ={item.likeCount ? item.likeCount : 0}
												/>
											</TouchableOpacity>
										</View>
									)
								}
								

							})
							:   <View><Text>검색 결과가 없습니다</Text></View>
                    }
                </ScrollView>
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
