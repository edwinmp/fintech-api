import path from 'path';
import sqlite3 from 'sqlite3';
import setupDatabase from './setup';

const sqlite = sqlite3.verbose();
const db_name = path.join(__dirname, 'data', 'app.db');
const db = new sqlite.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'app.db'");
});

setupDatabase(db);

export default db;
