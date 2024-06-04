#!/usr/bin/env node

import { renameFilesInFolders } from './fileOperations';
import { Config } from './types/types';
import config from './config';

const foldersToProcess: Config["folders"] = config.folders;

renameFilesInFolders(foldersToProcess, config)