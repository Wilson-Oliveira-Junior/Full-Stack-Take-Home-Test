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
const app_1 = __importDefault(require("../app"));
describe('POST /api/files', () => {
    it('should upload a CSV file and return success message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .attach('file', Buffer.from('id,name\n1,Alice\n2,Bob'), 'test.csv')
            .expect(200);
        expect(response.body).toEqual({ message: 'The file was uploaded successfully.' });
    }));
    it('should return error if no file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .expect(400);
        expect(response.body).toEqual({ message: 'No file uploaded' });
    }));
});
describe('GET /api/users', () => {
    it('should return filtered user data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .attach('file', Buffer.from('id,name\n1,Alice\n2,Bob'), 'test.csv')
            .expect(200);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/users?q=alice')
            .expect(200);
        expect(response.body).toEqual({
            data: [{ id: '1', name: 'Alice' }]
        });
    }));
    it('should return all users if no query is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .attach('file', Buffer.from('id,name\n1,Alice\n2,Bob'), 'test.csv')
            .expect(200);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/users')
            .expect(200);
        expect(response.body.data.length).toBe(2);
    }));
});
