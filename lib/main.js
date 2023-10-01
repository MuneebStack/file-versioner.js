#!/usr/bin/env node

const { renameFilesInFolders } = require('./fileOperations');
const config = require('./config');

const foldersToProcess = config.folders;

renameFilesInFolders(foldersToProcess);