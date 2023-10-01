const path = require('path');
const fs = require('fs');
const config = require('./config');
const { renameFileWithVersion } = require('./utils');

function renameFilesInFolders(folders) {
    folders.forEach((folderObj) => {
        const folder = folderObj.folder;
        const updateInHtml = folderObj.updateInHtml;
        const htmlFilePath = folderObj.htmlFilePath || config.htmlFilePath;

        if (fs.existsSync(folder)) {
            const files = fs.readdirSync(folder);

            files.forEach((fileName) => {
                const filePath = path.join(folder, fileName);
                const isDirectory = fs.statSync(filePath).isDirectory();

                if (!isDirectory) {
                    const versionedPath = renameFileWithVersion(filePath, config.length);
                    fs.renameSync(filePath, versionedPath);

                    console.log(`Success: Renamed ${filePath} to ${versionedPath}`);

                    if (updateInHtml) {
                        updateLinksInHtml(htmlFilePath, fileName, path.basename(versionedPath));
                    }
                }
            });
        } else {
            console.error(`Error: Folder not found: ${folder}`);
        }
    });
}

function updateLinksInHtml(htmlFilePath, oldFileName, newFileName) {
    if (fs.existsSync(htmlFilePath)) {
        let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        const regex = new RegExp(oldFileName, 'g');
        htmlContent = htmlContent.replace(regex, newFileName);

        if (htmlContent.includes(newFileName)) {
            fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
            console.log(`Success: Updated links in ${htmlFilePath}`);
        } else {
            console.error(`Error: No matching links found in ${htmlFilePath}`);
        }
    } else {
        console.error(`Error: HTML file not found: ${htmlFilePath}`);
    }
}

module.exports = {
    renameFilesInFolders,
    updateLinksInHtml,
};
