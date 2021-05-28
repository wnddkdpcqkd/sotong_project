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