"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameFileWithVersion = exports.generateRandomVersion = void 0;
const path = __importStar(require("path"));
const generateRandomVersion = (length = 6) => {
    let version = '';
    for (let i = 0; i < length; i++) {
        version += Math.floor(Math.random() * 10).toString();
    }
    return version;
};
exports.generateRandomVersion = generateRandomVersion;
const renameFileWithVersion = (originalFilePath, versionLength = 6) => {
    const ext = path.extname(originalFilePath);
    const dir = path.dirname(originalFilePath);
    const base = path.basename(originalFilePath, ext);
    const baseWithoutVersion = base.replace(/\.\d+$/, '');
    const version = (0, exports.generateRandomVersion)(versionLength);
    const newFileName = `${baseWithoutVersion}.${version}${ext}`;
    const newFilePath = path.join(dir, newFileName);
    return newFilePath;
};
exports.renameFileWithVersion = renameFileWithVersion;
