"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const dataRoutes_1 = __importDefault(require("../routes/dataRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/data', dataRoutes_1.default);
describe('Data Routes', () => {
    it('should upload and parse CSV', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/data/upload')
            .attach('file', 'path/to/test.csv');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('The file was uploaded successfully.');
    }));
    it('should search data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/api/data?q=John');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
    }));
});
