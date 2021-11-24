import path from 'path';
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db_name = path.join(__dirname, 'data', 'app.db');
const db = new sqlite.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'app.db'");
});

const sql_create_customer = `CREATE TABLE IF NOT EXISTS Customer (
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  created_at text NOT NULL
);`;
const sql_create_apy_calculation = `CREATE TABLE IF NOT EXISTS APYCalculation (
  customer_id INTEGER NOT NULL,
  deposit INTEGER NOT NULL,
  interest_rate INTEGER NOT NULL,
  yearly_compound_times INTEGER NOT NULL,
  value INTEGER NOT NULL,
  created_at text NOT NULL,
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)
);`;

db.run(sql_create_customer, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Customer' table");
});
db.run(sql_create_apy_calculation, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'APYCalculation' table");
});

export default db;
