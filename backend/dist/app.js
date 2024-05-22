"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = require("stream");
const app = (0, express_1.default)();
const upload = (0, multer_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let csvData = [];
// Função para converter buffer em stream legível
function bufferToStream(buffer) {
    const stream = new stream_1.Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}
app.post('/api/files', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const results = [];
    const stream = bufferToStream(req.file.buffer);
    stream
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => results.push(data))
        .on('end', () => {
        csvData = results;
        res.status(200).json({ message: 'The file was uploaded successfully.' });
    })
        .on('error', (error) => {
        res.status(500).json({ message: error.message });
    });
});
app.get('/api/users', (req, res) => {
    var _a;
    const query = ((_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) || '';
    const filteredData = csvData.filter(row => Object.values(row).some(value => typeof value === 'string' && value.toString().toLowerCase().includes(query)));
    res.status(200).json({ data: filteredData });
});
exports.default = app;
