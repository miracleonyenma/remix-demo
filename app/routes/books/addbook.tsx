import { gql } from "@apollo/client";
import { ActionFunction, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { graphQLClient } from "~/lib/apollo";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const author = formData.get("author");

  let book = {
    title,
    author,
  };

  console.log({ book });

  const mutation = gql`
    mutation ($book: BookInput) {
      addBook(book: $book) {
        title
      }
    }
  `;

  const { data } = await graphQLClient.mutate({
    mutation,
    variables: { book },
  });

  return json({ books: data.books });
};

export default function AddBook() {
  return (
    <section style={{ border: "1px solid #333", padding: "1rem" }}>
      <h2>Add new book</h2>
      <Form method="post">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" />
        </div>
        <div className="form-control">
          <label htmlFor="author">Author</label>
          <input id="author" name="author" type="text" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </section>
  );
}
