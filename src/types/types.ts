export interface Config {
    folders: { 
        folder: string;
        filePath?: string | string[];
        updateInFile?: boolean;
        length?: number;
    }[];
    filePath?: string | string[];
    updateInFile?: boolean;
    length?: number;
}