import { Workbook } from '../core/workbook';
import { SectionConfig, ExportOptions } from '../types';
export declare class ExportBuilder {
    private workbook;
    private currentSheet;
    constructor(sheetName?: string);
    addHeaderRow(headers: string[], style?: any): this;
    addDataRows(data: any[], fields?: string[]): this;
    addSection(config: SectionConfig): this;
    addSections(sections: SectionConfig[]): this;
    setColumnWidths(widths: number[]): this;
    autoSizeColumns(): this;
    addStyle(style: any): this;
    private groupData;
    private getNestedValue;
    build(): Workbook;
    export(options: ExportOptions): Promise<Blob>;
    download(options?: ExportOptions): void;
    static create(sheetName?: string): ExportBuilder;
}
