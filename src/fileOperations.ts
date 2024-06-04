import * as fs from 'fs';
import * as path from 'path';
import { Config } from './types/types';
import { renameFileWithVersion } from './utils/utils';

const renameFilesInFolders = (folders: Config["folders"], config: Config) => {
    folders.forEach((folderObj) => {
        const folder = folderObj.folder;
        const updateInFile = folderObj?.updateInFile ?? config?.updateInFile;
        const filePath = folderObj.filePath || config.filePath;
        const length = folderObj?.length || config?.length;

        if (fs.existsSync(folder)) {
            const files = fs.readdirSync(folder);

            files.forEach((fileName) => {
                const currentFilePath = path.join(folder, fileName);
                const isDirectory = fs.statSync(currentFilePath).isDirectory();

                if (!isDirectory) {
                    const versionedPath = renameFileWithVersion(currentFilePath, length);
                    fs.renameSync(currentFilePath, versionedPath);

                    console.log(`Success: Renamed ${currentFilePath} to ${versionedPath}`);

                    if (updateInFile) {
                        updateLinksInHtml(filePath, fileName, path.basename(versionedPath));
                    }
                }
            });
        } else {
            console.error(`Error: Folder not found: ${folder}`);
        }
    });
}

const updateLinksInHtml = (filePath : string, oldFileName : string, newFileName : string) => {
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
        } else {
            console.error(`Error: No matching links found in ${filePath}`);
        }
    } else {
        console.error(`Error: HTML file not found: ${filePath}`);
    }
}

export { renameFilesInFolders };