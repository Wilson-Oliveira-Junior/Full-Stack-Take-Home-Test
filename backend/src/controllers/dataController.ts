import { Request, Response } from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';

let csvData: any[] = [];

const upload = multer({ dest: 'uploads/' })

export const uploadCSV = upload.single('file');

export const parseCSV = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded.' });
    return;
  }

  const filePath = req.file.path;
  csvData = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => csvData.push(data))
    .on('end', () => {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'The file was uploaded successfully.', data: csvData });
    })
    .on('error', (error) => {
      res.status(500).json({ message: 'Error parsing CSV file', error });
    });
};

export const getData = (req: Request, res: Response) => {
  const query = req.query.q?.toString().toLowerCase() || '';
  const filteredData = csvData.filter(row =>
    Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(query))
  );
  res.status(200).json({ data: filteredData });
};