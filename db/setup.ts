// setup database table with initial data

import { Database } from 'sqlite3';
import { createCustomer } from './manage/customer';

const setupDatabase = (db: Database) => {
  const queryCreateCustomerTable = `CREATE TABLE IF NOT EXISTS Customer (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at text NOT NULL
  );`;
  const queryCreateAPYCalculationTable = `CREATE TABLE IF NOT EXISTS APYCalculation (
    customer_id INTEGER NOT NULL,
    deposit INTEGER NOT NULL,
    interest_rate INTEGER NOT NULL,
    yearly_compound_times INTEGER NOT NULL,
    value INTEGER NOT NULL,
    created_at text NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)
  );`;

  db.run(queryCreateCustomerTable, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'Customer' table");
    createCustomer(db, { customer_id: 1, name: 'admin' })
      .then(() => {
        console.log('Customer Created!');
      })
      .catch((error) => {
        console.log(error);
      });
  });
  db.run(queryCreateAPYCalculationTable, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'APYCalculation' table");
  });

  return db;
};

export default setupDatabase;
