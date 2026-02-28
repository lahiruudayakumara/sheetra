import { Worksheet } from '../core/worksheet';
import { CellStyle, CellData, PrintOptions, HeaderFooter, TableConfig, DataValidation, ConditionalFormatRule, ChartConfig, Drawing } from '../types';
/**
 * SheetBuilder provides a fluent API for building Excel worksheets
 */
export declare class SheetBuilder {
    private worksheet;
    private currentRow;
    /**
     * Create a new SheetBuilder instance
     * @param name Worksheet name
     */
    constructor(name?: string);
    /**
     * Get the underlying worksheet
     */
    getWorksheet(): Worksheet;
    /**
     * Set the worksheet name
     */
    setName(name: string): this;
    /**
     * Add a header row with styling
     * @param headers Array of header text
     * @param style Optional style for all headers
     */
    addHeaderRow(headers: string[], style?: CellStyle): this;
    /**
     * Add a title row
     * @param title Title text
     * @param colSpan Number of columns to span
     */
    addTitle(title: string, colSpan?: number): this;
    /**
     * Add a subtitle row
     * @param subtitle Subtitle text
     * @param colSpan Number of columns to span
     */
    addSubtitle(subtitle: string, colSpan?: number): this;
    /**
     * Add a row of data
     * @param data Array of cell values
     * @param styles Optional array of styles per cell
     */
    addRow(data: any[], styles?: (CellStyle | undefined)[]): this;
    /**
     * Add multiple rows of data
     * @param rows Array of row data
     * @param styles Optional array of styles per row or per cell
     */
    addRows(rows: any[][], styles?: (CellStyle | CellStyle[] | undefined)[]): this;
    /**
     * Add data from objects
     * @param data Array of objects
     * @param fields Fields to extract (keys or dot notation paths)
     * @param headers Optional header labels
     */
    addObjects<T extends Record<string, any>>(data: T[], fields: (keyof T | string)[], headers?: string[]): this;
    /**
     * Add a section with header and data
     * @param title Section title
     * @param data Section data
     * @param fields Fields to display
     * @param level Outline level
     */
    addSection(title: string, data: any[], fields: string[], level?: number): this;
    /**
     * Add grouped data with sub-sections
     * @param data Data to group
     * @param groupBy Field to group by
     * @param fields Fields to display
     * @param level Outline level
     */
    addGroupedData(data: any[], groupBy: string, fields: string[], level?: number): this;
    /**
     * Add summary row for a group
     */
    private addGroupSummary;
    /**
     * Add a summary row with totals
     * @param fields Fields to summarize
     * @param functions Summary functions (sum, average, count, min, max)
     * @param label Summary label
     */
    addSummaryRow(fields: string[], functions: Array<'sum' | 'average' | 'count' | 'min' | 'max'>, label?: string): this;
    /**
     * Set column widths
     * @param widths Array of column widths
     */
    setColumnWidths(widths: number[]): this;
    /**
     * Auto-size columns based on content
     * @param maxWidth Maximum width in characters
     */
    autoSizeColumns(maxWidth?: number): this;
    /**
     * Set column to auto-fit
     * @param colIndex Column index
     */
    setColumnAutoFit(colIndex: number): this;
    /**
     * Hide a column
     * @param colIndex Column index
     */
    hideColumn(colIndex: number): this;
    /**
     * Hide a row
     * @param rowIndex Row index
     */
    hideRow(rowIndex: number): this;
    /**
     * Set outline level for a row
     * @param rowIndex Row index
     * @param level Outline level (0-7)
     * @param collapsed Whether the outline is collapsed
     */
    setRowOutlineLevel(rowIndex: number, level: number, collapsed?: boolean): this;
    /**
     * Set outline level for a column
     * @param colIndex Column index
     * @param level Outline level (0-7)
     * @param collapsed Whether the outline is collapsed
     */
    setColumnOutlineLevel(colIndex: number, level: number, collapsed?: boolean): this;
    /**
     * Create an outline group for rows
     * @param startRow Start row index
     * @param endRow End row index
     * @param level Outline level
     * @param collapsed Whether the group is collapsed
     */
    groupRows(startRow: number, endRow: number, level?: number, collapsed?: boolean): this;
    /**
     * Create an outline group for columns
     * @param startCol Start column index
     * @param endCol End column index
     * @param level Outline level
     * @param collapsed Whether the group is collapsed
     */
    groupColumns(startCol: number, endCol: number, level?: number, collapsed?: boolean): this;
    /**
     * Merge cells
     * @param startRow Start row
     * @param startCol Start column
     * @param endRow End row
     * @param endCol End column
     */
    mergeCells(startRow: number, startCol: number, endRow: number, endCol: number): this;
    /**
     * Freeze panes
     * @param rows Number of rows to freeze
     * @param columns Number of columns to freeze
     */
    freezePanes(rows?: number, columns?: number): this;
    /**
     * Set print options
     * @param options Print options
     */
    setPrintOptions(options: PrintOptions): this;
    /**
     * Set header and footer
     * @param headerFooter Header/footer configuration
     */
    setHeaderFooter(headerFooter: HeaderFooter): this;
    /**
     * Add auto-filter
     * @param startRow Start row
     * @param startCol Start column
     * @param endRow End row
     * @param endCol End column
     */
    addAutoFilter(startRow: number, startCol: number, endRow: number, endCol: number): this;
    /**
     * Add a table
     * @param config Table configuration
     */
    addTable(config: TableConfig): this;
    /**
     * Add data validation to a cell or range
     * @param range Cell range (e.g., 'A1:B10')
     * @param validation Data validation rules
     */
    addDataValidation(range: string, validation: DataValidation): this;
    /**
     * Add conditional formatting
     * @param range Cell range
     * @param rules Conditional formatting rules
     */
    addConditionalFormatting(range: string, rules: ConditionalFormatRule[]): this;
    /**
     * Add a chart
     * @param config Chart configuration
     */
    addChart(config: ChartConfig): this;
    /**
     * Add an image or drawing
     * @param drawing Drawing configuration
     */
    addDrawing(drawing: Drawing): this;
    /**
     * Set cell value with style
     * @param row Row index
     * @param col Column index
     * @param value Cell value
     * @param style Cell style
     */
    setCell(row: number, col: number, value: any, style?: CellStyle): this;
    /**
     * Get cell value
     * @param row Row index
     * @param col Column index
     */
    getCell(row: number, col: number): CellData | undefined;
    /**
     * Add a comment to a cell
     * @param row Row index
     * @param col Column index
     * @param comment Comment text
     * @param author Comment author
     */
    addComment(row: number, col: number, comment: string, author?: string): this;
    /**
     * Add a hyperlink to a cell
     * @param row Row index
     * @param col Column index
     * @param url Hyperlink URL
     * @param displayText Display text (optional)
     */
    addHyperlink(row: number, col: number, url: string, displayText?: string): this;
    /**
     * Apply a style to a range
     * @param startRow Start row
     * @param startCol Start column
     * @param endRow End row
     * @param endCol End column
     * @param style Style to apply
     */
    applyStyleToRange(startRow: number, startCol: number, endRow: number, endCol: number, style: CellStyle): this;
    /**
     * Insert a blank row
     * @param count Number of blank rows to insert
     */
    insertBlankRows(count?: number): this;
    /**
     * Create a new row
     */
    private createRow;
    /**
     * Get or create a column
     */
    private getOrCreateColumn;
    /**
     * Get nested value from object using dot notation
     */
    private getNestedValue;
    /**
     * Format field name for display
     */
    private formatFieldName;
    /**
     * Group data by field
     */
    private groupData;
    /**
     * Convert column index to letter (A, B, C, ...)
     */
    private columnToLetter;
    /**
     * Get column range for formula (e.g., A:A)
     */
    private getColumnRange;
    /**
     * Build and return the worksheet
     */
    build(): Worksheet;
    /**
     * Reset the builder
     */
    reset(): this;
    /**
     * Create a new SheetBuilder instance
     */
    static create(name?: string): SheetBuilder;
    /**
     * Create from existing worksheet
     */
    static fromWorksheet(worksheet: Worksheet): SheetBuilder;
}
declare module '../types/cell.types' {
    interface CellStyle {
        borderTop?: BorderStyleType | BorderEdge;
        borderBottom?: BorderStyleType | BorderEdge;
        borderLeft?: BorderStyleType | BorderEdge;
        borderRight?: BorderStyleType | BorderEdge;
    }
}
export declare function extendStyleBuilder(): void;
