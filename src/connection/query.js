import { gql } from "apollo-boost";

export const institution = gql`
query {
    Institutions {
      id
      institution_name
      latitude
      longitude
    }
  }
`;

export const ADD_USER = gql`
mutation saveUser( $id: Float!, $identification: String, $user_password: String! ){
  saveUser(id : $id, identification: $identification, user_password: $user_password)
}
`;

export const ADD_SOCIAL_USER = gql`
mutation saveSotongUser( $email: String!, $password: String!, $nick_name: String, $name : String, $phone: String, $social_token: String, $modify_date : DateTime){
  saveSotongUser( email : $email, password : $password, nick_name : $nick_name, name : $name, phone : $phone, social_token : $social_token, modify_date : $modify_date)
}
`;

export const GET_POSTS = gql`
query {
  	posts{
		id  
		user_email
		big_category
		small_category
		title
		content
		create_date
		sotongUser{
			nick_name
		}
		replyCount
		likeCount
  	}
}`;

export const GET_POST_REPLY = gql`
  	query postReply($post_id : Float!){
	  	postReply(post_id : $post_id) {
			id
			post_id
			content
			create_date
			sotongUser{
			  nick_name
			}
			postReplys{
				id
				content
				writer_email
				create_date
				sotongUser{
						nick_name
				}
			}
	 	}
  	}`;

export const GET_POST_CATEGORY = gql`
query{
	postCategorys{
	  id
	  content
	}
}`; 

export const ADD_POST_REPLY = gql `
mutation savePostReply( $post_id : Float , $writer_email : String , $content : String, $reply_post_id : Float){
	savePostReply(post_id : $post_id, writer_email : $writer_email, content : $content, reply_post_id : $reply_post_id)
}`;

export const ADD_POST = gql`
mutation savePost($user_email : String, $id : Float, $content : String, $small_category : Float , $title : String, $big_category : String){
	savePost(user_email : $user_email, id : $id, content : $content, small_category : $small_category, title : $title, big_category : $big_category)
}`;

export const findWithCareTypeaSearch = gql`
query findWithCareTypeaSearch(
    $careTypes: [Float!],  
  ) {
    findWithCareTypeaSearch(
    careTypes: $careTypes,
  ) {
    institution_name
    latitude
    longitude
    id
	address
	CareTypes{
		category
	}
  }
}
`;
