import React, { Component, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Divider from '../../components/common/divider'
import Reply from '../../components/community/reply'
import ReplyTextInput from '../../components/community/replyTextInput'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const showImage=(imageState)=>{

    let widthDivider = imageState.length;
    return(
        imageState.map((item) => {
            return (
                <Image 
                    key={item.id}
                    source={{uri : item.uri}}
                    resizeMode="cover"
                    style={{
                        marginTop : 0,  
                        width: windowWidth/widthDivider,
                        height: 150,
                        borderRadius: 10,}
                    }
                />
            )

        })
    );
}

const showReply=(replyState) =>{
    return(
        replyState.map((item) => {
            return (
                <Reply
                    key={item.id}
                    profileName={item.profileName}
                    replyTime={item.replyTime}
                    replyContent={item.replyContent}
                />
            )
        })
    )
}


function postDetail() {

    //게시글 이미지 받아올 변수
    const [postImage, setPostImage] = useState([
        {
            id : 0,
            uri : "data:image/jpeg;base64,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"
        },
        {
            id : 1,
            uri : "data:image/jpeg;base64,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"
        },
        {
            id : 2,
            uri : "data:image/jpeg;base64,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"
        },
 ]);
    
    //게시글 내용 받아올 변수
    const [content, setContent] = useState(
    '게시글이 들어가는 곳. 이곳에 게시글을 쓸 수 있습니다. ' +
    '게시글이 들어가는 곳. 이곳에 게시글을 쓸 수 있습니다. ' +
    '게시글이 들어가는 곳. 이곳에 게시글을 쓸 수 있습니다. ' +
    '게시글이 들어가는 곳. 이곳에 게시글을 쓸 수 있습니다. ' +
    '게시글이 들어가는 곳. 이곳에 게시글을 쓸 수 있습니다. ' +
    '게시글이 들어가는 곳. 이곳에 게시글을 쓸 수 있습니다. ' +
    '게시글이 들어가는 곳. 이곳에 게시글을 쓸 수 있습니다. ')

    //댓글
    const [reply, setReply] = useState([
        {
            id: 0,
            profileName: "미카미 유아",
            replyTime: "5분전",
            replyContent: "이곳은 댓글이 들어가는 곳입니다. 댓글을 작성해주세요. 댓글 댓글 댓글이곳은 댓글이 들어가는 곳입니다. 댓글을 작성해주세요. 댓글 댓글 댓글"
        },
        {
            id: 1,
            profileName: "미카미 유아",
            replyTime: "5분전",
            replyContent: "이곳은 댓글이 들어가는 곳입니다. 댓글을 작성해주세요. 댓글 댓글 댓글이곳은 댓글이 들어가는 곳입니다. 댓글을 작성해주세요. 댓글 댓글 댓글"
        },
        {   
            id: 2,
            profileName: "미카미 유아",
            replyTime: "5분전",
            replyContent: "이곳은 댓글이 들어가는 곳입니다. 댓글을 작성해주세요. 댓글 댓글 댓글이곳은 댓글이 들어가는 곳입니다. 댓글을 작성해주세요. 댓글 댓글 댓글"
        },
    ])

    return (

    <View style={{flex : 1, backgroundColor : 'white'}}>
        <ScrollView>

            {/* 헤더부분 */}
            <View style={{            
                height: 90,
                flexDirection : 'row',
                alignItems: 'stretch',
                alignSelf: 'stretch',
                backgroundColor: 'yellow'}
            }>
            
                {/* 프로필 IMG */}
                <View style={{flex : 1, backgroundColor : 'white',}}>
                    <Image
                        source={require("../../assets/image/dog.png")}
                        resizeMode="cover"
                        style={{
                        marginTop : 20,
                        marginLeft : 20,    
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        }}
                    />
                    </View>

                {/* 프로필명 */}
                <View style={{flex : 3, backgroundColor : 'white',}}>
                    <Text style={{marginTop :25, marginLeft: 0, fontSize : 15, fontWeight :'bold'}}> 우에하라 아이 </Text>
                    <Text style={{marginTop : 5, marginLeft : 0, fontSize : 13}} > 20분전</Text>
                </View>

                {/* 쩜 3개 */}
                <View style={{flex : 1, backgroundColor : 'white', alignItems : 'flex-end'}}>
                    <TouchableOpacity>
                    <MaterialCommunityIconsIcon
                        name="dots-vertical"
                        style={{    
                        color: "grey",
                        fontSize: 30,
                        marginRight: 20,
                        marginTop: 30
                        }}
                    />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Body-IMG 부분 */}
            <View style={{
                flexDirection : 'row', 
                backgroundColor:'white',
                alignSelf:'center' 
                }}>        

                {showImage(postImage)}     

            </View>

            {/* Body-Text부분 */}
            <View style={{marginTop : 30, marginLeft : 20, }}>
                <Text>{content} 
                </Text>
            </View>


            {/* 좋아요 , 댓글버튼 */}
            <View style={{flexDirection: 'row', marginTop : 30, marginLeft : 20}}>
                
                {/* 좋아요 수*/}
                <TouchableOpacity  onPress={()=>console.log("좋아요 클릭")}>
                    <View style={{flexDirection : 'row'}}>
                        <FontAwesomeIcon name="heart-o" style={{fontSize: 15}} ></FontAwesomeIcon>
                        <Text> 999+ </Text>
                    </View>
                </TouchableOpacity>
                
                {/* 댓글 수*/}
                <FontAwesomeIcon name="comments" style={{fontSize: 15, marginLeft : 10}}></FontAwesomeIcon>
                <Text> 999+ </Text>
            </View>



            <Divider color='#808080'/>
                

            {/* 댓글 */}
            <View>
                {showReply(reply)}
            </View>

                

        </ScrollView>
                
        <ReplyTextInput 
            uri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGBgaGhocGhwcGhwcHB8cHBoaGhocHB4cIS4lIR4rISEaJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQhISE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0ND8/ND8/Pz80P//AABEIAQAAxQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EADYQAAEDAgMFBgYCAwEAAwAAAAEAAhEDIQQSMQVBUWFxIoGRobHRBhMyweHwUmIUQvGSBxWC/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAeEQEBAQEAAwEBAQEAAAAAAAAAARECEiExA1FxQf/aAAwDAQACEQMRAD8A86JTZkHMnlZthw5LMq+ZIOQQ2ZMXIcpSgJZk0pJIGnlJMnCAZOlKYoBKbGEqVKnJW9svZ4OqDVcHs6dQtrDbFady2MHs8QtOhhIUXpU5cvjPhkES2y5zGbLew3Fl60ykqG0dnteNETsXl5RkSFNdPtHYmUkhUm4FaZrKsYUeSI2gVrjChEbhwE8GscYYqTcKtj5ScUkwyv8AESWmXNG8DvASQHJFyYuUAU0pYYpKQchhOjC0UFPKGApBKmmnSDU4YkDBOApBqfKgIpAImVKEHg+Db2hZdfsxlhZcrgxcLrdmBT18Pn66LCMsroEKphdFbWFvttIICoVW2UcyZ9TdqnyVrJx7Jlc9Up3K6LH0Kj/oyt5lY7vhE1DNWs8g/wCrey3xPsujn4w6ZlbFU2fW9o5TfwCqjarXmKbH1D/VsDxK6zC/DGGp3DGk/wBpefOy1GUGtEBsDnDR4BWjXEMweMfpTZSHF5k+CtUvhN7r1cQ88WsGUeK67NuBHRjZ81FwOpEc3H7BMtc/T+F8I0QWBx4uJJ8ky3Mx4n/8tskmHjICkkkpaEiMZKgtf4fwDqlQNEd+h5KbRmqX+M7hzCPTwhNoN/XcvXMB8MsyBrmg/ZHdsCm2BlFln13I055ePPwj7WMqWHwxdmEXAJXrdTYbD/qJVej8NsDy8NEmZSn6Si8PLHYNwNxqJA/e9McMQTIIj99vFeuH4dYQBGmnsnHwxTkOgToeYR5weDyZmBdEwSNx5Qf3qj4vZrmkW1uOlp8yB3r1mh8Psa0CNNEV+xGEgkae4P2CPMeLyGhhHg6HW3fH73rqdmUniJC7ZmwGCOyLR5I7tls3Dei9bBJjBougKw1yv19mAaI1PZwAE3t9ljntprMe5NK0amFBOiJRwjQnOsTYzWO5gdBJUXM3kd73QPBbjcAxVsTs0QSBJ5rfnqMuuWYXbs3cxv3UH095aBzeZ8kQn+xjg0QPFZ+J2nQZq5s8BL3eVlrrPFkOBtmc7kwQPFRyxMNa08+05YeM+KmizGE83nKP/LbrFxO3Kz9HZRpDBkHui9Q5za7J1SNXnxDfIlJedkuOpHfc+KSXkrxc/CUKUJ7JgmtXpXwLgIbmc0RuXneF+obr8F6/sABrGAcFl+l9NOI6lroCA6pe+ig/EDcpMIKw6rSJZZRWMTNbwRGlRDOGp8qdIu3II2VEYoKQKJSqW9QhSUmo0sNlTvCcqLk9AJYAgPN7aKy5Be1TVhfO3Kw2oIWZXeAU7MSIROivOub+MMMMmcTrpJjwXEQdJ14WXpO1e0x45Lzl9AgnM+L6DVdXHWxl1MAdDeAQw5xsAfNHDW7m97j9gne8f2dyFh4BWWUH/H4uDTwkJKQed0BJB4wQxPlUpCkOieoGwjYcDwXqOxsQcjSQLDff0Xm+BokkGIuvQ9ntGQCT+9yz7+NOGsyqHusVqUVlYGk3d++C1GFYVqtMcpgoAKdrlFCyCkChZkxegC5kSUAFTzJARqm0oDXp2uRpWDFyg4qAck56NGHJlQqcAkSlmTNQrUhdZ73gGBqtbENkLAxLMpmbJWCUWu3sm+5cHjqOUugxzN967im/MN64rbVE5jqLnUBb/lUdemU57eqg7EwdJP73ogYwRmd5JZwPpZ3ust2aEPdf7e6ZShzry7usPykgMkNTgjirtPZs/U8nkLK0zAsbqB3oLEdlOfmGWY38PNd3gXS0TfuXN7PIldfhW9kQB+9yz7VyvYaByVxrucqix9rqRrc1jWzQD1IPWcMQpHEKKF/PCfOqLa/NO2sEguh6mKiz843JCulhr7qicVFm/OU2V0ixoZ0syqtqJOqphZ+Yi5lQbW5ojKqcCy4SqGMwoeFcbUBTlXE1iNpZbALiPiAw9zTv56dV6JiqZAlcLt+g3Pmc0nkD6rXhHVYdFrRJGUczc+JSNRgJMlx46+ZSewkRla1u4QEwIbw6xqtkf6cv/rPVJQzE6AlJIJ/NGk24NsEwfua0DnqpNcwWEu5aBGa95+lrWDibeqoxtm4dxeC7NE9F3GHpwBaPFcZs94DwXPzHlf1XbYeoMth5rPv4qGe6FWqVxvTY071jYjERK560nxquxI3a9R7p24nl5rn6O0AZDjCmcUAc2YnqnOTtjdNa9z+9ykKvFZDMWx1wL9yX+Yp8Q2XYqBYygnFmVkVcXpBlBdjIk+XNHiG8zGE8kdmI5rlhjyrNHGHu8UvEOmZiZRPnLnm4p0XPghjawBifNOclbHSGuOiTcQucrbYG4KxhtoFyVmKkdRQqSrbHBYeGxC0aVVHNTVt7JXM/EWElsix/eC6M1Vz+38U4MIiJ33W/LOuEqFocf9j5Iecutu4DRSeWgyYKh89zrMGnHctU+kiHEmSeVkk/+K7VzrnuHckgIio7cGsHmouqN39pTp4Qf7Eu6e6Myi2P4jzV5BdPgHkvAiAu4wziGjKQuIzMYRlEniuj2TiTlGs84A9SSsuocHxTzvWNiaZ5rpshdvCTcBPNZWNJ04HE4Z53LLxj3sF5HevTK+zhey534h2MX03Bn1Zbc05cvsrdjiNm7Ve1/bJLd/ELpKW0mObLXzHpzC46rg3iTlIGhsbdd4VvZeyq1VzWMY68XGnUrbrnmzWXPXUuOmp4wOmOhsEqryO0dOht3Lbw3wU0MBe4udvgQAqtT4baA7K47wCelrfuqwtjfLjHdigdAZVrA4tomTYaytzZ3wox4kuJI14eCD8Q/CZDCWSSBoNSOFkpZosuOa21t4ZclJwJOpmI/eK57Eh7HkOeHOB1a7M09CLEcxZFx+zXsI7LoPI66IeGwr3va1sucbCLyd5ngumTmRzW3XWYFj3MDspItdauDqgWIIWzs7ZmSmxh1AAt0ujnZgK5evfx083PqOFeLLXotWR/ilmivYeupk9jqrzzbWFz236rshA9bea16mIEGQuS2/iCezmDRqTOo4LfmMqxCxjfquUwe50Brco4u6KBqNsGDMeJ+wRHYdxHbdlb1haJQIpj6nFx4pJfOpNs1hdzJToP0sOe4ifpHP2QnvZpGYhO6nH1PHTU+Sm2AOyzvcfstCDYHusB4BXsLWyakE8pPmqr3TYuLv6t0RGUX2hoYOJuVNha6jB4oEAwZPT3Wvh32vK5PBHcHEkb5Wvh8a1ovHqsrzim1UM9FQrUcx3d/wCFFmODxpZArYvhYcQpsh83Df8A1zGuzkAGP2Va2fgmg59CdIO4qpSq/MIbJA3k7/wt/DZWm8aazHkbJe76XLJ7VsTjMjDn7NtSbfhcbi9s0jOWrPEe0oX/AMqY4j5bGOOV0kgH+Me/ouDZjOx9IkTeLnqtJ+Uz2i/rZXp/w9tgF3ZdM7h6Fda6sY7cT6LxP4ZxTziKZaP9ujY4XsvbaZa4SBHn6KOvyz4fPe/WWzC0i8tDAQbkRLZN940PDRWKWzqLCSxjWO3lrQ0+iuVsEP5kHlZCYcohzz3u/Hopkvyqtn2JspCVZFEcFW+c3SZ6X9EVj+aMxN6pVaLSFm1KMHgtF71Qxj8oJJsE5NLyqhj8Zkb2hfdBv3LjMTTlxfUdE6N1PQAKxtXaL3vIaYbu48ys0U4O9x8T3rbnnEX2IMWQIptyj+RuT0VdzMzu0STwN3Hu4KwRH1OyjgLnxUqDHOsxtjv/ACdUzk/qIpkfxbydJPlokimnTbao+Ty3JJKyJ06Lj9LY5n9hTOGZq95d5BJ+Y6mOqgMoO9xWiRmVdzGju91F9Mm73R6ogY88Gt8FOixgIkFyBjU2fh8rNNbodR4FyJWj8zs2ECNFlYpY32aFTaLdwyxvmfCQfRVquMJ7WYxxsPW6p1xdA+Y0zmlPA1cDtNsnMdeJWsNvsDMrh2YtH3LjPgAuMq0ryFUrNcd5SwVe+IgK5GV0Rdtye7Ux+8FyjsI8E2mDGu9a+U8T1QKtB0WcFpKz6ntq/DLSx4c51x9NzYTeII/eK9Bo7aYxsh+Y7yDJnnm+5Xl9Ci46vjor1LCkXa49UWnJXptPbgO8EHjMjkQfVVjteXSLjfC4zDU37yVbbRc27SVl1NaT07RmNa4AgypitG+xXKYas4cVcpVzoUsJtVcXG+VibY2jmaWAnnHoqu08XkAAWSGPfdxyt5q+YAahA1PcPdPSpvcLCBxiP+pGpTYbAvd5JjUe8XdlbwH7dUNSDKbDrnd+25JOxD3mIgfxHoSnZhmtibx3JziBppbh+lCdD/x/0fdJRfU/sf3okgY0PlAfUZ5BP89rdBHqq+Q6uMJwANBJ4lWaT6jnG1hxP5Sp9kgl1+GvkoFw0J7gmY87o/eaBrpKT+yCdSqlcSi0nHK3ome2yzFZdems7EUls1mkqk+ne6AyySoEzqFoVKCAaPJM1EtSLOStFicUkErUmcVo0XhV/lIjKZSDTokcZsrfzRAjvCx2MM2KvUKJKMNb+YNQreEoyZKBQwxla+HpwE5EWsDb+KDHgAS6N+gWMW1H3JMcNB4Lc2/TaH5zrCxKuJ4C8ap4JUhh2t18fbcmfihoNI71VLydbnvThh3oCTqh03KAE2iyJDQOPL3/AArdMlzbNnm4Q0dBqT1SCk0Dr0CStZaY1OY79wHQQkmeUdruCg4zx6fhEbT3kwmzgfSJVH6RZhzrEdfZSytBG8pocbnREo0wXADeRdFJsPblDegUi4bhPFHxtPs23BY1PElpIWMu1VizVVN7FadUkeqAXSrToYZOqG+lKtBqKadk5BrJdQvCXylqOp8AoMpSnhaoiiUdlAK+2kBP74J6NJGDVWlRV7DshOxkEhHY2CmNHpsVoFV80qb9NUJcp8Qvd8yJ6CJWcWcbckbaeILqjoMwSO4IDKLnbo56BLYc0PONAPBFZh3u5Dy8UWGN07R8gmNRzraDklqpCDGM5nlpKcPe8wJjhEI7cK0QXnuUH4oCzeyOX3KR6f8AxGiznweA+6SrGsToI6pJjV3L/J33Pgna4f6jvKkzDf8AdyIajG21PJUQQpk75KNh6QD2ybkiw+6E6o46dkKVBsOHXeihvYh9u5YOKZe2i1n1JWfimLn+NVOpjoFxolRxQN1QxDPCVVz5Tqr56Z2OkZiA5Ha6YXM0sde6ts2jzWmpdASoTHcVmMxskXVkPsbo0L2ab71D5kHkq3zcouU/zcwTC3UqElHpcSVUaYVmgZsgtaAHDRNWEgjkVKnpCRU9FHEFrWkzcybe6Z73O6cAjvwpL3l3ZGY+pU/mNYOyJ5n7IWjTwkCXGEn1gNBHNV61aTqSVEUSddP26JAZ9YnSUmUN5KJYD3SDybC3r+E8H1KQNUkPKeXiAkkMX3l7ruNtw9kzWAckT5ZP1GB5p84H0ieZVQ8Qyxy6p2PAI3qYpuJk2nj7KWRjf7FBDufI7MLOq5hbx9kn1nMJI+k+STMU03HmsryvVKqTCz68LVxFQQVk4hyc5T1cis9yqveeKM8oD1pjPSbjXtIMyr2G204HtG0rKeEIowa6tmMzELXw9QRO5cjgK0iN4W5hq9oOs+Sn/p346Rrw4WR6AjdoszD4oAdyvsxYOiejFz5vFSz2J3KuDNyqe2cXkYcpubeOqn7T+MbE4mXuPFxjpyVcglQY3j++yuUQ0aju91WD/A2Ud/f/ANTudbj+7kXOX6COW78pqb8siJO47vz0Roz+hNoS2SY+/QIopxaPfx3ImTVzjHP2VWpitzLDjvKMG/wSo8AwTl4AJkJuBcbkgTxN0kbBlazKD3XdZPLGmBc8fyo1Xud+FKjRgfsKlX2iapdv7gnZT4nuUy8DQT6flDe7igg6rgLeiysQG9Oiv4h3BZFY3SK0J7yUB5R3BV3Jo0J6C8d3qjOG9BeQEjkV3N8EJ5RHklP8g70GjhXHOFtUK/FYzeyZC1cM9rgOKmnP41sNihoVpUMUsKnR4FXGDIe26BuUxXpsvxcAuO5ZGKxjqkbmhU8bjs/ZH0/sJUmmJ3cfZVE/VlmoA181YYAPqvy91WpOizdfNWW0QLv8PdP6Nz4mA553QOGlvVSfXaz6RJ6qu+uXdlunLerNLBBoDqhgbm7ynhe6rspvq9PABWWUWs07bt7joOSati7ZQIH8R9yqtWoTr3AaIVILVr34+SSC2i48kksPWw0gbgevsnAc6x9PIIbHkaWkR+89CjPxTjFgIJNp36zdUKBUEGIj1TEK4MW7XKCZ1MxaYgA21QK9XNFtOvGSb6dEJUntJCzsTSj3P2C2gz+Ik8Tp4KjiqY/2MnySGMYygVKjRzVnEUyTZBbgyd3eUFinUqFyTMKTc2HNWyxrOZ8kJ7yUGG7K3S6g5vFScfFRJSgCcxJjCJAMdEaI1TNumEzXeQJMDgLEojZMkmYQ8m4a70ak2BGvogviTBpafsr9NpI4DiVXYALnX90RBULrNQNWxVDR2fcqVOm95kmBxOianhw36rngjGqSYjoEHIssqMYIYJP8jogOe5/PmftwT/KiC/8A8orKRcO1ZsePQIP4pMYTYXVo0QwSTLvFEfVDey0Rz3/9Vd1xM+6C90z60xvSRaeBcRJgcJ1SQeP/2Q=="
            
        />
    </View>

  );
}

const styles = StyleSheet.create({

});

export default postDetail;
