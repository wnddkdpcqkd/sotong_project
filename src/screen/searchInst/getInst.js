import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { institution } from '../../connection/query'

const markerIMG = '../../assets/image/marker_round.png';

export default async function getInst() {
    const {loading, error, data} = await useQuery(institution)
    

    if (loading) return <Text> 'Loading...' </Text>;
    if (error) return <Text> `Error! ${error.message}` </Text>;
    if (data && data.Institutions) {
        return data.Institutions.map(item => {
            console.log(item)
            return(
            <Marker
                width={40}
                height={40}
                key={item.id}
                coordinate={{latitude : item.latitude, longitude: item.longitude}}
                image={require(markerIMG)}
                title={item.institution_name}
            />
            )
            
        }); 
    }
}

const styles = StyleSheet.create({})
