import { gql } from "apollo-boost";
import client from './client';
import { useQuery, useMutation, throwServerError } from '@apollo/react-hooks';
import * as query from './query'



export async function getPost() {
    const { loading , error , data } = useQuery(query.GET_POSTS)
    if(loading) return loading
    return data
}


// page=(community) : smallCategory에 {전체} 추가
export async function getSmallCategory(page) {

    const { loading , error , data } = useQuery(query.GET_POST_CATEGORY)
    if(loading) return loading
    if(page === "community") {
        if(data.postCategorys[0].id === 1){
            data.postCategorys.unshift({"__typename": "PostCategory", "content": "전체", "id": 0})
        }
    }else{
        if(data.postCategorys[0].id === 0){
            data.postCategorys.shift()
        }
    }
    return data
}

// 댓글 받기
// id : 댓글 받을 게시물의 id
export async function getPostReply(id) {
    const { loading, error, data } = useQuery(query.GET_POST_REPLY, { variables : { post_id : id }});
    if (loading) return loading
    return data
}

// 댓글 추가
// id           : 댓글 추가할 게시물의 id
// writerEmail  : 작성자 이메일
// replyText    : 댓글 내용

//     // ,{refetchQueries : [{
//     //     query : query.GET_POST_REPLY,
//     //     variables : { post_id : id }
//     // }]}
// )
export function addReplyMutation(id, writerEmail, replyText) {
    
    console.log("여기는?")

	const [ addPostReply ] = useMutation(query.ADD_POST_REPLY)
	// const [ addPostReply ] = useMutation(query.ADD_POST_REPLY, {
    //     refetchQueries : [{
    //         //query : query.GET_POST_REPLY,
    //         variables : { post_id : id }
    //     }]
    // })
    //return addPostReply
    const { loading, error, data} = addTest(
        {
            variables : {
            post_id : id,
            writer_email : writerEmail,
            content : replyText,
            },
            refetchQueries : [{
                query : query.GET_POST_REPLY,
                variables : { post_id : id }
            }]
        }
    ).then((item) => {
        console.log(item)
    })
    // const { loading, error, data } = useMutation(query.ADD_POST_REPLY, { 
    //     variables : {  
    //             post_id : id,
    //             writer_email : writerEmail,
    //             content : replyText, 
    //         },
    //     refetchQueries : [{
    //         query : query.GET_POSTS_REPLY,
    //         variables : { post_id : id }
    //     }]
    // });

    // return data
    // console.log("여기는??????????????????")
    return data
}

// 대댓글 추가
export async function addReReply(id, writerEmail, replyText) {
    // const [ addPostReReply ] = useMutation(query.ADD_POST_REPLY, {
    //     refetchQueries : [{
    //         query : query.GET_POST_REPLY,
    //         variables : { post_id : id }
    //     }]
    // })

    addPostReReply({variables : {
        writer_email : writerEmail,
        content : replyText,
        reply_post_id : id
    }}).catch( e => e.message)
}