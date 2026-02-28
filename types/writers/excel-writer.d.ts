import { Workbook } from '../core/workbook';
import { ExportOptions } from '../types';
export declare class ExcelWriter {
    static write(workbook: Workbook, _options: ExportOptions): Promise<Blob>;
    private static generateExcelData;
    private static generateSheetData;
    private static getSheetRange;
    private static columnToLetter;
    private static createExcelFile;
    private static generateWorkbookXML;
}
export declare class ExportBuilder {
    private workbook;
    constructor(workbook: Workbook);
    download(options?: ExportOptions): void;
}
