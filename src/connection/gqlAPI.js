import { request, GraphQLClient } from 'graphql-request'
import * as query from './query'
// const graphql = require('graphql-request');

    
const graphqlClient = new GraphQLClient('http://192.168.0.165:3000/graphql',{
    headers: { 'Content-Type' : 'application/json' },
    timeout: 30000,
})

//커뮤니티 게시글 전체 받아오기
export async function getPost(){
	const data = await graphqlClient.request(query.GET_POSTS)

	return data.posts.reverse()
}

//커뮤니티 게시글 댓글
//postId : 게시글 ID에 해당되는 댓글 가져옴
export async function getPostReply(postId) {
    
    let variables = {
        post_id : postId
    }
    
    const data = await graphqlClient.request(query.GET_POST_REPLY, variables)
    
    return data.postReply;
}

//커뮤니티 게시글 분류 
export async function getCommunitySmallCategory(){
	const data = await graphqlClient.request(query.GET_POST_CATEGORY)
	data.postCategorys.unshift({"__typename": "PostCategory", "content": "전체", "id": 0})

	return data.postCategorys
}

//글쓰기 게시글 분류
export async function getWritePostSmallCategory(){
	const data = await graphqlClient.request(query.GET_POST_CATEGORY)

	return data.postCategorys
}

//커뮤니티 게시글 입력
export async function addPost(user_email, small_category, title, content) {

	let variables = {
		user_email : user_email,
		small_category : small_category,
		title : title,
		content : content,
	}

    const data = await graphqlClient.request(query.ADD_POST,variables)

	return data.savePost
}

//커뮤니티 댓글 입력
export async function addReply(post_id, writer_email, content) {

	let variables = {
		post_id : post_id,
		writer_email : writer_email,
		content : content,
	}

    const data = await graphqlClient.request(query.ADD_POST_REPLY, variables)
    
    return data.savePostReply
}

//커뮤니티 대댓글 입력
export async function addReplyReply(writer_email, content, reply_post_id) {

	let variables = {
		writer_email : writer_email,
		content : content,
		reply_post_id : reply_post_id
	}

    const data = await graphqlClient.request(query.ADD_POST_REPLY, variables)
    
    return data.savePostReply
}

