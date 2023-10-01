const path = require('path');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomVersion(length) {
    let version = '';
    for (let i = 0; i < length; i++) {
        version += getRandomInt(0, 10);
    }
    return version;
}

function renameFileWithVersion(originalFilePath, versionLength) {
    const ext = path.extname(originalFilePath);
    const dir = path.dirname(originalFilePath);
    const base = path.basename(originalFilePath, ext);

    const baseWithoutVersion = base.replace(/\.\d+$/, '');

    const version = generateRandomVersion(versionLength);
    const newFileName = `${baseWithoutVersion}.${version}${ext}`;
    const newFilePath = path.join(dir, newFileName);

    return newFilePath;
}

module.exports = {
    getRandomInt,
    generateRandomVersion,
    renameFileWithVersion,
};