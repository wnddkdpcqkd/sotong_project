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
  mutation saveUser(
      $id: Float!,
      $identification: String,
      $user_password: String!
    ){
      saveUser(id : $id, identification: $identification, user_password: $user_password){
        id
        identification
        user_password
      }
    }
`;