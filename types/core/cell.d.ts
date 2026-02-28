import { CellData, CellStyle } from '../types';
export declare class Cell {
    private value;
    private style?;
    private formula?;
    private type;
    constructor(value?: any, style?: CellStyle);
    setValue(value: any): this;
    setStyle(style?: CellStyle): this;
    setFormula(formula: string): this;
    setType(type: 'string' | 'number' | 'date' | 'boolean' | 'formula'): this;
    private inferType;
    getFormattedValue(): string;
    toData(): CellData;
    static fromData(data: CellData): Cell;
}
