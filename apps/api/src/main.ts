import * as express from 'express';
import { data, getDataFromCSV } from './app/file-reader';
import { Pagination } from './app/models';
import { locations } from './app/files/locations.js';

const app = express();

app.get('/locations', (req, res) => {
  res.send(data);
  // res.send(new Pagination(req.query as any).getPaginatedData(locations));
});

app.get('/locations/:id', (req, res) => {
  const location = data.find(({ id }) => id === req.params.id);

  location
    ? res.send(location).status(200)
    : res.status(404).send({ message: 'No data found', code: 404 });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
  getDataFromCSV();
});
server.on('error', console.error);
