import {
  ApolloClient, from, gql, HttpLink, InMemoryCache,
} from '@apollo/client/core';
import fetch from 'node-fetch';

export class GqlService {
  static async getAssignee(assigneeId: string) {
    const cache = new InMemoryCache();
    const link = new HttpLink({
      uri: 'https://api.linear.app/graphql',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: process.env.LINEARAPI,
      },
      fetch,
    });

    const client = new ApolloClient({
      link: from([link]),
      cache,
    });

    const res = await client.query({
      query: gql`query {
        user(id: "${assigneeId}") {
          name
        }
      }`,
    });
    if (res.data) {
      return (res.data.user.name);
    }
    return (assigneeId);
  }
}
