import { APYCalculation } from '..';

export const calculateAPY = (request: APYCalculation) => {
  const value = request.deposit * (Math.pow(1 + request.interest_rate / 100 / 12, 12) - 1);

  return value;
};
