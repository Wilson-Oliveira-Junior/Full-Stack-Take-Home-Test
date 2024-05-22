"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/files', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(500).json({ message: 'File upload failed' });
    }
    // Logic to process CSV and store data
    return res.status(200).json({ message: 'The file was uploaded successfully.' });
});
app.get('/api/users', (req, res) => {
    const query = req.query.q;
    // Logic to search data
    res.status(200).json({ data: filteredData });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
