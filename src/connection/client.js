import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    //uri: 'http://makgoon.tech:40009/graphql'
    uri: 'http://192.168.55.183:3000/graphql'
});

export default client;