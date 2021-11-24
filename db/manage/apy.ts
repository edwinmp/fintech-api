import { APYCalculation } from '../../utils';

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
