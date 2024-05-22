"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.parseCSV = exports.uploadCSV = void 0;
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
let csvData = [];
const upload = (0, multer_1.default)({ dest: 'uploads/' });
exports.uploadCSV = upload.single('file');
const parseCSV = (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded.' });
        return;
    }
    const filePath = req.file.path;
    csvData = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => csvData.push(data))
        .on('end', () => {
        fs_1.default.unlinkSync(filePath);
        res.status(200).json({ message: 'The file was uploaded successfully.', data: csvData });
    })
        .on('error', (error) => {
        res.status(500).json({ message: 'Error parsing CSV file', error });
    });
};
exports.parseCSV = parseCSV;
const getData = (req, res) => {
    var _a;
    const query = ((_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) || '';
    const filteredData = csvData.filter(row => Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(query)));
    res.status(200).json({ data: filteredData });
};
exports.getData = getData;
