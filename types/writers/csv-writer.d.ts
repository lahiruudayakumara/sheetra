import { Workbook } from '../core/workbook';
import { ExportOptions } from '../types';
export declare class CSVWriter {
    static write(workbook: Workbook, _options: ExportOptions): Promise<Blob>;
    private static generateCSVData;
}
