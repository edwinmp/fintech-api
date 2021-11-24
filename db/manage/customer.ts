import { Database } from 'sqlite3';
import { Customer } from '../../utils';

export const createCustomer = (db: Database, { customer_id, name }: Partial<Customer>): Promise<string> =>
  new Promise((resolve, reject) => {
    // TODO: validate
    if (!name) {
      reject('name is required');
    }

    const queryInsertCustomer = customer_id
      ? `INSERT INTO Customer (customer_id, name, created_at) VALUES (${customer_id}, '${name}', datetime('now'));`
      : `INSERT INTO Customer (name, created_at) VALUES ('${name}', datetime('now'));`;
    db.serialize(() => {
      db.run(queryInsertCustomer, function (err) {
        if (err) {
          console.error(err.message);
          reject(err.message);

          return;
        }
        console.log(`Successful creation Customer ${this.lastID}`);
        resolve('success');
      });
    });
  });
