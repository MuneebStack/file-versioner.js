#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileOperations_1 = require("./fileOperations");
const config_1 = __importDefault(require("./config"));
const foldersToProcess = config_1.default.folders;
(0, fileOperations_1.renameFilesInFolders)(foldersToProcess, config_1.default);
