import fs = require('fs');
import { parse } from 'csv-parse';

export const data = [];
export const pomeranian_data = [];
export const getDataFromCSV = () => {
  fs.createReadStream('apps/api/src/app/west-pomeranian.csv')
    .pipe(parse({ delimiter: ';' }))
    .on('data', (row) => {
      if (row.every((item) => !!item.length)) {
        const [voivodeship, district, area, id, city, address] = row;
        data.push({
          voivodeship,
          district,
          area,
          city,
          address,
          id: Number(id),
        });
      }
    });
};
export const getDataPomeranianFromCSV = () => {
  let index = 1;
  fs.createReadStream('apps/api/src/app/pomeranian.csv')
    .pipe(parse({ delimiter: ';' }))
    .on('data', (row) => {
      const [voivodeship, district, area, city, address] = row;
      pomeranian_data.push({
        voivodeship,
        district,
        area,
        city,
        address,
        id: index,
      });
      index = index + 1;
    });
};
