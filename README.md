# Versionize

## Overview

Versionize is a Node.js package that allows you to versionize your CSS, JS, or other specified files and update their associated links in HTML, PHP, or any other files containing these tags.

## Installation

```bash
npm install versionize
```

## Usage

Create a `versionize.json` file at the root of your project with the following structure:

```bash
{
  "folders": [
    {
      "folder": "path/to/your/folder",
      "filePath": ["path/to/your/file1.html", "path/to/your/file2.html"],
      "length": 8
    },
    {
      "folder": "path/to/another/folder",
      "filePath": "path/to/your/file.html",
      "updateInFile": false
    }
  ],
  "updateInFile": true,
  "filePath": ["path/to/default/file1.html", "path/to/default/file2.html"],
  "length": 6
}
```

## Configuration

- folders: An array of objects specifying the folders to process.
- folder: The path to the folder containing files to versionize.
- updateInFile: (Optional) Boolean indicating whether to update links in files. Defaults to updateInFile from the root level, or false if not specified.
- filePath: (Optional) Path(s) to the file to update links. If not provided, filePath from the root level will be used.
- length: (Optional) Length of the version string. If not provided, length from the root level will be used. Defaults to 6 if not specified.
- filePath: Default path(s) to the file to update links.
- updateInFile: (Optional) Default boolean indicating whether to update links in files. Defaults to false if not provided.
- length: (Optional) Default length of the version string. Defaults to 6 if not provided.

### Note

When the length parameter is set to 0, the filename will be generated without a version. This is useful for cases where versioning is no longer required.

## Example versionize.json

```bash
{
    "folders": [
        {
            "folder": "public/assets"
        },
        {
            "folder": "public/images",
            "filePath": ["app/index.php", "app/another-file.php"],
        }
    ],
    "updateInFile": true,
    "filePath": "index.html",
    "length": 8
}
```

## Running Versionize

After setting up versionize.json, run the following command in your project directory:

```bash
npx versionize
```

## Behavior

The versionize command will:

- Rename each file in the folder with a version string appended to its name.
- Optionally update links to these files in the specified filePath.

## Author
Muneeb

## License
This project is licensed under the MIT License.

## Contributing
Contributions, issues, and feature requests are welcome!
