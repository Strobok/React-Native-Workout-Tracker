import { GraphQLClient } from "graphql-request";

const url = 'https://pennyan.stepzen.net/api/hazy-pika/__graphql'

const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;

const graphqlClient = new GraphQLClient(url, { 
    headers: {
        Authorization: `apikey ${apiKey}`,
}});

export default graphqlClient;