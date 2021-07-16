import ApolloClient from "apollo-boost";
import {createHttpLink} from 'apollo-link-http';

const client = new ApolloClient({
    //uri: 'http://makgoon.com:40009/graphql'
    //uri: 'http://192.168.55.183:3000/graphql'
    //uri: 'http://192.168.25.1:3000/graphql'
    uri: 'http://192.168.0.223:3000/graphql'


});

export default client;