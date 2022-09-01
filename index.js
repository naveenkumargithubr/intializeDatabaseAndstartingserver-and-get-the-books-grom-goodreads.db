const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const dbpath = path.join(__dirname, "goodreads.db");

let db = null;

const intializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
intializeDBandServer();

app.get("/books/", async (request, response) => {
  const getbooksQuery = `
           SELECT * FROM book ORDER BY book_id;    
    `;
  const bookArrayresult = await db.all(getbooksQuery);
  response.send(bookArrayresult);
});
