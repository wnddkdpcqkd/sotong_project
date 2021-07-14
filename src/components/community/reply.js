import React, { Component, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import Divider from '../../components/common/divider'
import IonIcon from 'react-native-vector-icons/Ionicons';


export default function reply(props) {

	const [bgColor , setBGColor] = React.useState('white')
	const commentButtonEvent = (commentId,nickName) =>{
		props.backgroundColor === 'white' ? props.getReplyInfo(commentId,nickName) : props.getReplyInfo('','')
	}

  	return (
    
	<View style={styles.container}>
      
      	<Divider color='#D4D4D4'/>

		<View style={{backgroundColor : props.backgroundColor}}>

			<View style={styles.replyContainerBox}>
			
				{/* 프로필 IMG */}
				<View style={styles.profileImageBox}>
					<Image
						source={require("../../assets/image/dog.png")}
						resizeMode="cover"
						style={styles.profileImage}
					/>
				</View>

				{/* 프로필명 */}
				<View style={styles.profileNameBox}>
					<Text style={styles.profileName}> {props.profileName || ''} </Text>
					<Text style={styles.replyTime} > {props.replyTime.substring(0,10) || '20분전'}</Text>
				</View>
				
				{/* 댓글, 좋아요 버튼 */}
				<View style={styles.buttonContainer}>
					<View style={[styles.buttonContainerBox, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }]}>
						<TouchableOpacity onPress={() => commentButtonEvent(props.replyId,props.profileName)}>
							<IonIcon style={styles.buttonIconStyle} name="chatbox-ellipses-outline" />
						</TouchableOpacity>
					</View>
					<View style={[styles.buttonContainerBox, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
						<TouchableOpacity>
							<IonIcon style={styles.buttonIconStyle} name="heart-outline" />
						</TouchableOpacity>
					</View>
					<View style={[styles.buttonContainerBox, { borderTopRightRadius: 5, borderBottomRightRadius: 5 }]}>
						<TouchableOpacity>
							<IonIcon style={styles.buttonIconStyle} name="ellipsis-vertical-outline" />
						</TouchableOpacity>
					</View>
				</View>
			
			</View>

			{/* 답글 내용 */}
			<View style={styles.replyContentBox}>
				<Text>{props.replyContent}</Text> 
			</View>
		</View>


		{/* 대댓글 */}
		{
			props.replyReply
			// 댓글 있을 때
			? props.replyReply.map((item,id) =>{
				return (
					<View key={id}>
						<Divider color='#D4D4D4'/>
						<View style={styles.replyReplyBox}>
							<View style={{flex : 1}}>
								<IonIcon name="return-down-forward-outline" 
										style={{marginTop : 20, fontSize : 20}} 
								/>
							</View>
							<View style={{flex : 9}}>
								<View style={{flex: 1, flexDirection : 'row'}}> 
									<View style={{flex : 2}}>
										<Image
											source={require("../../assets/image/dog.png")}
											resizeMode="cover"
											style={styles.replyProfileImage}
										/>
									</View>
									<View style={{flex : 7}}>
										<Text style={styles.profileName}> {item.nickName || '대댓글 닉네임 안넘어옴'} </Text>
										<Text style={styles.replyTime} > {item.create_date.substring(0,10) || '20분전'}</Text>
									</View>
								</View>
								<View style={{marginTop : 20}}>
									<Text>{item.content}</Text>
								</View>
							</View>



						</View>
					

						<View style={{marginTop : 10}}></View>
					</View>
					
				)
			}) 
			//댓글 없을 때
			: null
		}

		{/* // {console.log('[reply] : ', props.replyReply)} */}
        
    </View>
  )
}

const styles = StyleSheet.create({
	container : {backgroundColor : 'white'},
	replyContainerBox : {            
        height: 80,
        flexDirection : 'row',
        justifyContent: "space-around",
	},
	profileImageBox : {
		flex : 4, 
	},
	profileImage : {
		marginTop : 20,
		marginLeft : 20,    
		width: 50,
		height: 50,
		borderRadius: 100,
	},
	profileNameBox: { 
		flex: 9, 
	},
	profileName: { marginTop: 20, fontSize: 15, fontWeight: 'bold' },
	replyTime: { marginTop: 5, fontSize: 13, color : 'gray' },
	buttonContainer: { 
		flex: 5, 
		height : '35%', 
		flexDirection: 'row', 
		justifyContent: 'flex-end',
		marginTop : 20 ,
		marginRight : 20,
	},
	buttonContainerBox : { flex : 1, alignItems : 'center', borderWidth : 1, borderColor : '#D4D4D4',},
	buttonIconStyle:{alignItems : 'center', fontSize : 15 , margin : 5, color : 'gray'},
	replyContentBox: { marginTop: 10, marginLeft: 20, marginBottom: 10 },
	replyReplyBox: { marginLeft: 20, flexDirection: 'row', },
	replyProfileImage: {
		marginTop: 20,
		width: 50,
		height: 50,
		borderRadius: 100,
	},


	
})
