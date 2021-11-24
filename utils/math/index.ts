import { APYCalculation } from '..';

export const calculateAPY = (request: APYCalculation) => {
  // should probably use a precision library like numbers.js
  const { deposit, interest_rate, yearly_compound_times } = request;
  const value = deposit * (Math.pow(1 + interest_rate / 100 / yearly_compound_times, 12) - 1);

  return value;
};
