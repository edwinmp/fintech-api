import express, { Application, Request, Response } from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db_name = path.join(__dirname, 'data', 'app.db');
const db = new sqlite.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'app.db'");
});
console.log(db);

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Setup Successful',
  });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
