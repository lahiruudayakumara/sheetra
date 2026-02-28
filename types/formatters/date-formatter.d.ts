export declare class DateFormatter {
    static format(date: Date | string | number, format?: string): string;
    static toExcelDate(date: Date | string | number): number;
    private static parseDate;
    private static formatWithPattern;
    private static pad;
}
