import { calculateAPY } from '..';
import { APYCalculation } from '../..';

const apy = {
  deposit: 100,
  interest_rate: 0.5,
  yearly_compound_times: 12,
} as APYCalculation;

test('Calculates APY accurately', () => {
  expect(calculateAPY(apy)).toBe(0.5011474262615723);
});
