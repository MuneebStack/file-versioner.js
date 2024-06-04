export interface Config {
    folders: { 
        folder: string;
        filePath?: string;
        updateInFile?: boolean;
        length?: number;
    }[];
    filePath: string;
    updateInFile?: boolean;
    length?: number;
}