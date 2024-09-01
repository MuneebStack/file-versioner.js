import * as path from 'path';
import * as fs from 'fs';
import { Config } from './types/types';

const loadConfig = (filePath: string): Config => {
    if (!fs.existsSync(filePath)) {
        console.error(`Error: Configuration file not found at ${filePath}`);
        process.exit(1);
    }
    
    const configFileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(configFileContent);
};

const configPath = path.join(process.cwd(), 'file-versioner.json');
const config = loadConfig(configPath);

export default config;