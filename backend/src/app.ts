import express from 'express';
import cors from 'cors';
import multer from 'multer';
import csv from 'csv-parser';
import { Request, Response } from 'express';
import { Readable } from 'stream';

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

let csvData: any[] = [];

// Função para converter buffer em stream legível
function bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

app.post('/api/files', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const results: any[] = [];
    const stream = bufferToStream(req.file.buffer);

    stream
        .pipe(csv())
        .on('data', (data: any) => results.push(data))
        .on('end', () => {
            csvData = results;
            res.status(200).json({ message: 'The file was uploaded successfully.' });
        })
        .on('error', (error: any) => {
            res.status(500).json({ message: error.message });
        });
});

app.get('/api/users', (req: Request, res: Response) => {
    const query = req.query.q?.toString().toLowerCase() || '';
    const filteredData = csvData.filter(row =>
        Object.values(row).some(value =>
            typeof value === 'string' && value.toString().toLowerCase().includes(query)
        )
    );
    res.status(200).json({ data: filteredData });
});

export default app;
