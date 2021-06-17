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
mutation saveSotongUser( $id : Float! $user_email: String!, $password: String!, $phone_number: String, $social_token: String ){
  saveSotongUser( id : $id, user_email : $user_email, password : $password, phone_number : $phone_number, social_token : $social_token)
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
	 	}
  	}`;

export const GET_POST_CATEGORY = gql`
query{
	postCategorys{
	  id
	  content
	}
  }`; 