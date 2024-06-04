import * as fs from 'fs';
import * as path from 'path';

export const generateRandomVersion = (length: number = 6): string => {
    let version = '';
    for (let i = 0; i < length; i++) {
        version += Math.floor(Math.random() * 10).toString();
    }
    return version;
};

export const renameFileWithVersion = (originalFilePath: string, versionLength: number = 6): string => {
    const ext = path.extname(originalFilePath);
    const dir = path.dirname(originalFilePath);
    const base = path.basename(originalFilePath, ext);

    const baseWithoutVersion = base.replace(/\.\d+$/, '');

    const version = generateRandomVersion(versionLength);
    const newFileName = `${baseWithoutVersion}${version ? '.' + version : ''}${ext}`;
    const newFilePath = path.join(dir, newFileName);

    return newFilePath;
};