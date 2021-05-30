import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { useQuery, useMutation} from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import FormButton from '../../components/common/FormButton';
// 사용자정의모듈

//import {clinic_info_query} from '../../connection/query';



const clinic_info_query = gql`
  {
    mutation{
      insertSotong(
        id:1234
        name:"이름adsf"
        hello:"dddff"
    )
  }
}
`;
// const clinic_info_add = gql`
//   {
//     mutation AddCustomer($id: int!, $name: String!, $hello: Int!) {
//       addCustomer(id: $id, name: $name, hello: $hello) {
//         id,
//         name,
//         hello
//     )
//   }
// }
// `;

export default function test() {


    const { loading, error, data } = useQuery(clinic_info_query);
    // const [addCustomer] = useMutation(clinic_info_add);

    
    if (loading) return ( <Text> 'Loading...' </Text>)
    if (error) return (<Text> `Error! ${error.message}` </Text>)
    if (data && data.Sotongs){
      console.log(data)

      return(
        <View>
        {/* <FormButton
          buttonTitle="add"
          onPress={()=>{
            addCustomer({ variables: {
              id: 12,
              name: 'elise',
              hello: 'hi'
            }})
          }} />
  <Text></Text> */}
</View>

      )
    }

}

const styles = StyleSheet.create({})