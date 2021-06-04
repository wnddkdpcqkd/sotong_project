import { gql } from "apollo-boost";

export const clinic_info_query = gql`
    {
        clinic_info {
            id
            name
            hello
        }
    }   
`;

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