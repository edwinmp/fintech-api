import { Database } from 'sqlite3';
import { APYCalculation, ManagerResponse } from '../../utils';
import { calculateAPY } from '../../utils/math';
import { clearCache, getCachedData, hasCache, updateCache } from '../cache';

const APY_DATABASE = 'APYCalculation';

export const validateAPYRequest = (request: APYCalculation) => {
  if (!request.customer_id) {
    return 'customer id is required';
  }
  if (!request.deposit) {
    return 'deposit is required';
  }
  if (!request.interest_rate) {
    return 'interest rate is required';
  }
  if (!request.yearly_compound_times) {
    return 'yearly compound times is required';
  }

  return '';
};

export const createAPYCalculation = (db: Database, apy: APYCalculation): Promise<ManagerResponse<{ apy: number }>> =>
  new Promise((resolve, reject) => {
    const { customer_id, deposit, yearly_compound_times, interest_rate } = apy;
    const value = calculateAPY(apy);
    const queryInsertCalculation = `INSERT INTO ${APY_DATABASE} (customer_id, deposit, yearly_compound_times, interest_rate, value, created_at) VALUES (${customer_id}, ${deposit}, ${yearly_compound_times}, ${interest_rate}, ${value}, datetime('now'));`;
    db.serialize(() => {
      db.run(queryInsertCalculation, function (err) {
        if (err) {
          console.error(err.message);
          reject({ error: err.message });

          return;
        }
        console.log(`Successful creation of APY Calculation ${this.lastID}`);

        // clear cache, if exists
        const historyQuery = getCustomerAPYCalculationsQuery(customer_id);
        if (hasCache(historyQuery)) {
          clearCache(historyQuery);
        }

        resolve({ data: { apy: value } });
      });
    });
  });

export const getCustomerAPYCalculationsQuery = (customerId: number) => {
  return `SELECT * from ${APY_DATABASE} where customer_id=${customerId}`;
};

export const getCustomerAPYCalculations = (
  db: Database,
  customerId: number,
): Promise<ManagerResponse<APYCalculation[]>> =>
  new Promise((resolve, reject) => {
    const query = getCustomerAPYCalculationsQuery(customerId);
    // check cache
    if (hasCache(query)) {
      const data = getCachedData<APYCalculation[]>(query);
      resolve({ data });

      return;
    }

    db.serialize(() => {
      db.all(query, function (err, rows) {
        if (err) {
          console.error(err.message);
          reject({ error: err.message });

          return;
        }

        updateCache(query, rows);
        resolve({ data: rows });
      });
    });
  });

export const deleteCustomerAPYCalculations = (db: Database, customerId: number): Promise<ManagerResponse<null>> =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`DELETE from ${APY_DATABASE} where customer_id=${customerId}`, function (err) {
        if (err) {
          console.error(err.message);
          reject({ error: err.message });

          return;
        }
        console.log('Here...');

        resolve({ data: null });
      });
    });
  });
