import { CellStyle, Border, BorderStyle } from '../types';
export declare class StyleBuilder {
    private style;
    bold(bold?: boolean): this;
    italic(italic?: boolean): this;
    underline(underline?: boolean): this;
    fontSize(size: number): this;
    fontFamily(family: string): this;
    color(color: string): this;
    backgroundColor(color: string): this;
    align(alignment: 'left' | 'center' | 'right'): this;
    verticalAlign(alignment: 'top' | 'middle' | 'bottom'): this;
    wrapText(wrap?: boolean): this;
    border(border: Border): this;
    borderTop(style?: BorderStyle['style'], color?: string): this;
    borderRight(style?: BorderStyle['style'], color?: string): this;
    borderBottom(style?: BorderStyle['style'], color?: string): this;
    borderLeft(style?: BorderStyle['style'], color?: string): this;
    borderAll(style?: BorderStyle['style'], color?: string): this;
    numberFormat(format: string): this;
    build(): CellStyle;
    static create(): StyleBuilder;
}
