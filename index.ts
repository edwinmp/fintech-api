import express, { Application, Request, Response } from 'express';
import db from './db';
import { getCustomerById } from './db/manage/customer';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/apy/:customerId', async (req: Request, res: Response): Promise<Response> => {
  const { customerId } = req.params;
  const { data: customer, error } = await getCustomerById(db, parseInt(customerId));
  if (error) {
    console.log(error);

    return res.status(400).send({ error });
  }
  if (customer) {
    // TODO: user exists

    return res.status(200).send(customer);
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
