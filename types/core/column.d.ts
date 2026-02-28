import { ColumnData } from '../types';
export declare class Column {
    private width?;
    private hidden;
    private outlineLevel;
    private collapsed;
    constructor(width?: number);
    setWidth(width: number): this;
    setHidden(hidden: boolean): this;
    setOutlineLevel(level: number, collapsed?: boolean): this;
    toData(): ColumnData;
    static fromData(data: ColumnData): Column;
}
