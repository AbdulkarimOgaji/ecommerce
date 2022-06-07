import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import ordersRoutes from './handlers/ordersRoutes';

import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerJsDoc = YAML.load('./api.yaml');


export const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

app.use(express.json());

app.use(cors());

app.use(morgan('common'));

app.use(helmet());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});

ordersRoutes(app);
export default app