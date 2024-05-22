import { Router } from 'express';
import { uploadCSV, parseCSV, getData } from '../controllers/dataController';

const router = Router();

router.post('/upload', uploadCSV, parseCSV);
router.get('/', getData);

export default router;

