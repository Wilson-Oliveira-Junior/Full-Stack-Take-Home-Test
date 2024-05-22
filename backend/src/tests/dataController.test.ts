import request from 'supertest';
import express from 'express';
import dataRoutes from '../routes/dataRoutes';

const app = express();
app.use(express.json());
app.use('/api/data', dataRoutes);

describe('Data Routes', () => {
  it('should upload and parse CSV', async () => {
    const response = await request(app)
      .post('/api/data/upload')
      .attach('file', 'path/to/test.csv');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('The file was uploaded successfully.');
  });

  it('should search data', async () => {
    const response = await request(app)
      .get('/api/data?q=John');

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
