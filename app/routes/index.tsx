import { json } from '@remix-run/node';
import { useLoaderData, useActionData, Form } from '@remix-run/react';

// type definitions

type Book = {
  title: string;
  genre: string;
};

type Books = Array<Book>;

type LoaderData = {
  books: Books;
};

// Loader function
export const loader = async () => {
  return json<LoaderData>({
    books: [
      {
        title: 'Harry Potter and the Deathly Hallows',
        genre: "Children's Fiction",
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        genre: "Children's Fiction",
      },
    ],
  });
};

// action funtion
export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');

  return json({ name });
};

export default function Index() {
  // use data from loader
  const { books } = useLoaderData() as LoaderData;

  // get data from action
  const data = useActionData();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix {data ? data.name : 'Stranger'} </h1>
      <ul>
        {books.map(({ title, genre }, i) => {
          return (
            <li key={i}>
              <h3> {title} </h3>
              <p> {genre} </p>
            </li>
          );
        })}
      </ul>

      <Form method="post">
        <div className="form-control">
          <label htmlFor="name">
            Name
            <input id="name" name="name" type="text" />
          </label>
        </div>
        <button type="submit">Submit </button>
      </Form>
    </div>
  );
}
