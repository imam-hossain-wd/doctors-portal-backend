"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hospital = void 0;
const mongoose_1 = require("mongoose");
const hospitalSchema = new mongoose_1.Schema({
    hospital_id: { type: String },
    name: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
});
exports.Hospital = (0, mongoose_1.model)('Hospital', hospitalSchema);
