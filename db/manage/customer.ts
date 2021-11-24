import { Database } from 'sqlite3';
import { Customer, ManagerResponse } from '../../utils';

const CUSTOMER_DATABASE = 'Customer';

export const getCustomerById = (db: Database, customerId: number): Promise<ManagerResponse<Customer>> =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get(`SELECT * from ${CUSTOMER_DATABASE} where customer_id=${customerId}`, function (err, row) {
        if (err) {
          console.error(err.message);
          reject({ error: err.message });

          return;
        }

        resolve({ data: row });
      });
    });
  });

export const createCustomer = (db: Database, { customer_id, name }: Partial<Customer>): Promise<string> =>
  new Promise((resolve, reject) => {
    // TODO: validate
    if (!name) {
      reject('name is required');
    }

    const queryInsertCustomer = customer_id
      ? `INSERT INTO ${CUSTOMER_DATABASE} (customer_id, name, created_at) VALUES (${customer_id}, '${name}', datetime('now'));`
      : `INSERT INTO ${CUSTOMER_DATABASE} (name, created_at) VALUES ('${name}', datetime('now'));`;
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
