import { LoaderFunction, json } from '@remix-run/node';
import { gql } from '@apollo/client';
import { graphQLClient } from '~/lib/apollo';

const query = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const { data } = await graphQLClient.query({
    query,
  });

  return json({ data });
};
