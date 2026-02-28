import { RowData, CellData, CellStyle } from '../types';
import { Cell } from './cell';
export declare class Row {
    private cells;
    private height?;
    private hidden;
    private outlineLevel;
    private collapsed;
    constructor(cells?: Cell[]);
    addCell(cell: Cell): this;
    createCell(value?: any, style?: CellStyle): Cell;
    setCell(index: number, value: any, style?: CellStyle): this;
    getCell(index: number): CellData | undefined;
    getCells(): Cell[];
    setHeight(height: number): this;
    setHidden(hidden: boolean): this;
    setOutlineLevel(level: number, collapsed?: boolean): this;
    toData(): RowData;
    static fromData(data: RowData): Row;
}
