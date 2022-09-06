import { LoaderFunction, json } from "@remix-run/node";
import { gql } from "@apollo/client";
import { graphQLClient } from "~/lib/apollo";
import { Outlet, useActionData, useLoaderData } from "@remix-run/react";

const query = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;
// const mutation = gql`
//   mutation {
//     addBook(book: { title: "It worked!!", author: "Yours truly" }) {
//       title
//     }
//   }
// `;

export const loader: LoaderFunction = async ({ request, params }) => {
  const { data } = await graphQLClient.query({
    query,
  });

  // let data = {msg: "hola"}

  // const { data } = await graphQLClient.mutate({
  //   mutation,
  // });

  return json({ books: data.books });
};

export default function Books() {
  const { books } = useLoaderData();

  return (
    <main>
      <section>
        <h1>All books</h1>

        <ul>
          {books.map(({ title, author }: { title: string; author: string }, index:number) => (
            <li key={index}>
              <h3>{title}</h3>
              <p>{author}</p>
            </li>
          ))}
        </ul>
      </section>
      <Outlet />
    </main>
  );
}
