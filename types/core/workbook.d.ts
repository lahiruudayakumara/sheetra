import { WorkbookData, ExportOptions } from '../types';
import { Worksheet } from './worksheet';
export declare class Workbook {
    private sheets;
    private properties;
    constructor(data?: WorkbookData);
    addSheet(sheet: Worksheet): this;
    createSheet(name: string): Worksheet;
    getSheet(index: number): Worksheet | undefined;
    getSheetByName(name: string): Worksheet | undefined;
    removeSheet(index: number): boolean;
    setProperty(key: string, value: any): this;
    toData(): WorkbookData;
    fromData(data: WorkbookData): void;
    export(options?: ExportOptions): Promise<Blob>;
    download(options?: ExportOptions): void;
    static create(): Workbook;
    static fromData(data: WorkbookData): Workbook;
}
