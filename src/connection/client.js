import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: 'http://makgoon.tech:40009/graphql'
});

export default client;