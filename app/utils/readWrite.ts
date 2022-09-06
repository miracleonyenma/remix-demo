import fs from "fs"

// JSON file containing books array
const dataPath = `${process.cwd()}/app/data/books.json`;

// function to read file contents 
export const read = (
  returnJSON = false,
  path = dataPath,
  encoding = "utf-8"
) => {
  try {
    let data = fs.readFileSync(path, encoding);
    return returnJSON ? data : JSON.parse(data);
  } catch (error) {
    console.log({ error });
    return null;
  }
};

// function to write content to file
export const write = (data: object, path = dataPath) => {
  let initialData = read();

  let modifiedData = [...initialData, data];

  try {
    fs.writeFileSync(path, JSON.stringify(modifiedData, null, 2));
    let result = read();

    return result;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

