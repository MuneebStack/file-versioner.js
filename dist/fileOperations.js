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
exports.renameFilesInFolders = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("./utils/utils");
const renameFilesInFolders = (folders, config) => {
    folders.forEach((folderObj) => {
        var _a;
        const folder = folderObj.folder;
        const updateInFile = (_a = folderObj === null || folderObj === void 0 ? void 0 : folderObj.updateInFile) !== null && _a !== void 0 ? _a : config === null || config === void 0 ? void 0 : config.updateInFile;
        const filePath = folderObj.filePath || config.filePath;
        const length = (folderObj === null || folderObj === void 0 ? void 0 : folderObj.length) || (config === null || config === void 0 ? void 0 : config.length);
        if (fs.existsSync(folder)) {
            const files = fs.readdirSync(folder);
            files.forEach((fileName) => {
                const currentFilePath = path.join(folder, fileName);
                const isDirectory = fs.statSync(currentFilePath).isDirectory();
                if (!isDirectory) {
                    const versionedPath = (0, utils_1.renameFileWithVersion)(currentFilePath, length);
                    fs.renameSync(currentFilePath, versionedPath);
                    console.log(`Success: Renamed ${currentFilePath} to ${versionedPath}`);
                    if (updateInFile) {
                        updateLinksInHtml(filePath, fileName, path.basename(versionedPath));
                    }
                }
            });
        }
        else {
            console.error(`Error: Folder not found: ${folder}`);
        }
    });
};
exports.renameFilesInFolders = renameFilesInFolders;
const updateLinksInHtml = (filePath, oldFileName, newFileName) => {
    if (fs.existsSync(filePath)) {
        let htmlContent = fs.readFileSync(filePath, 'utf8');
        const originalName = oldFileName.split('.')[0];
        const extension = path.extname(oldFileName);
        const regexPattern = "".concat(originalName, "(\\.[0-9a-f]+)?").concat(extension.replace('.', '\\.'));
        const regex = new RegExp(regexPattern, 'g');
        htmlContent = htmlContent.replace(regex, newFileName);
        if (htmlContent.includes(newFileName)) {
            fs.writeFileSync(filePath, htmlContent, 'utf8');
            console.log(`Success: Updated links in ${filePath}`);
        }
        else {
            console.error(`Error: No matching links found in ${filePath}`);
        }
    }
    else {
        console.error(`Error: HTML file not found: ${filePath}`);
    }
};
