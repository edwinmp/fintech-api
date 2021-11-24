import express, { Application, Request, Response } from 'express';
import db from './db';
import { validateAPYRequest } from './db/manage/apy';
import { getCustomerById } from './db/manage/customer';
import { APYCalculation } from './utils';
import { calculateAPY } from './utils/math';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/apy/:customerId', async (req: Request, res: Response): Promise<Response> => {
  const { customerId } = req.params;
  const body = req.body as APYCalculation;

  const { data: customer, error } = await getCustomerById(db, parseInt(customerId));
  if (error) {
    console.log(error);

    return res.status(400).send({ error });
  }
  if (customer) {
    const validationError = validateAPYRequest({ ...body, customer_id: parseInt(customerId) });
    if (validationError) {
      return res.status(401).send({ error: validationError });
    }

    return res.status(200).send({ ...customer, value: calculateAPY(body) });
  } else {
    return res.status(401).send({ error: 'invalid customer id' });
  }
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
