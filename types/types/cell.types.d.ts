/**
 * Cell value types supported by Sheetra
 */
export type CellValueType = 'string' | 'number' | 'date' | 'boolean' | 'formula' | 'error';
/**
 * Cell alignment options
 */
export type HorizontalAlignment = 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed';
export type VerticalAlignment = 'top' | 'middle' | 'bottom' | 'distributed' | 'justify';
/**
 * Border style options
 */
export type BorderStyleType = 'thin' | 'medium' | 'thick' | 'dotted' | 'dashed' | 'double' | 'hair' | 'mediumDashed' | 'dashDot' | 'mediumDashDot' | 'dashDotDot' | 'mediumDashDotDot' | 'slantDashDot';
/**
 * Font styling options
 */
export interface FontStyle {
    /** Font name (e.g., 'Arial', 'Calibri') */
    name?: string;
    /** Font size in points */
    size?: number;
    /** Bold text */
    bold?: boolean;
    /** Italic text */
    italic?: boolean;
    /** Underline style */
    underline?: boolean | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting';
    /** Strikethrough text */
    strike?: boolean;
    /** Font color in hex or RGB */
    color?: string;
    /** Font family */
    family?: number;
    /** Font scheme */
    scheme?: 'major' | 'minor' | 'none';
    /** Character set */
    charset?: number;
    /** Outline font */
    outline?: boolean;
    /** Shadow font */
    shadow?: boolean;
    /** Condense font */
    condense?: boolean;
    /** Extend font */
    extend?: boolean;
    /** Vertical alignment text */
    verticalAlign?: 'superscript' | 'subscript' | 'baseline';
}
/**
 * Border definition for a single side
 */
export interface BorderEdge {
    /** Border style */
    style?: BorderStyleType;
    /** Border color in hex or RGB */
    color?: string;
}
/**
 * Complete border configuration
 */
export interface Border {
    /** Top border */
    top?: BorderEdge;
    /** Bottom border */
    bottom?: BorderEdge;
    /** Left border */
    left?: BorderEdge;
    /** Right border */
    right?: BorderEdge;
    /** Diagonal border (top-left to bottom-right) */
    diagonal?: BorderEdge;
    /** Diagonal border (bottom-left to top-right) */
    diagonalDown?: BorderEdge;
    /** Diagonal border (top-right to bottom-left) */
    diagonalUp?: BorderEdge;
    /** Diagonal border type */
    diagonalType?: 'both' | 'up' | 'down';
}
/**
 * Fill pattern types
 */
export type FillPattern = 'none' | 'solid' | 'gray125' | 'gray0625' | 'gray75' | 'gray50' | 'gray25' | 'gray12' | 'gray6' | 'horizontalStripe' | 'verticalStripe' | 'reverseDiagonalStripe' | 'diagonalStripe' | 'diagonalCrosshatch' | 'thickDiagonalCrosshatch' | 'thinHorizontalStripe' | 'thinVerticalStripe' | 'thinReverseDiagonalStripe' | 'thinDiagonalStripe' | 'thinHorizontalCrosshatch' | 'thinDiagonalCrosshatch';
/**
 * Fill configuration for cell background
 */
export interface Fill {
    /** Fill pattern type */
    patternType?: FillPattern;
    /** Foreground color (pattern color) */
    fgColor?: string;
    /** Background color */
    bgColor?: string;
}
/**
 * Number format configuration
 */
export interface NumberFormat {
    /** Format code (e.g., '#,##0.00', '0%', 'm/d/yyyy') */
    format: string;
    /** Number of decimal places */
    decimals?: number;
    /** Thousands separator */
    thousandsSeparator?: boolean;
    /** Currency symbol */
    currencySymbol?: string;
    /** Negative number format */
    negativeFormat?: 'parentheses' | 'minus' | 'red';
}
/**
 * Complete cell style configuration
 */
export interface CellStyle {
    /** Font styling */
    font?: FontStyle;
    /** Border configuration */
    border?: Border;
    /** Fill configuration */
    fill?: Fill;
    /** Number format */
    numberFormat?: string | NumberFormat;
    /** Horizontal alignment */
    alignment?: HorizontalAlignment;
    /** Vertical alignment */
    verticalAlignment?: VerticalAlignment;
    /** Text wrapping */
    wrapText?: boolean;
    /** Text rotation in degrees */
    textRotation?: number;
    /** Indentation level */
    indent?: number;
    /** Shrink to fit */
    shrinkToFit?: boolean;
    /** Reading order */
    readingOrder?: 'context' | 'leftToRight' | 'rightToLeft';
    /** Hidden cell */
    hidden?: boolean;
    /** Locked cell (for protection) */
    locked?: boolean;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting';
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    borderAll?: {
        style: BorderStyleType;
        color?: string;
    };
}
/**
 * Cell data structure
 */
export interface CellData {
    /** Cell value */
    value: string | number | boolean | Date | null;
    /** Cell style */
    style?: CellStyle;
    /** Cell formula (if any) */
    formula?: string;
    /** Cell value type */
    type?: CellValueType;
    /** Cell comment */
    comment?: string;
    /** Hyperlink */
    hyperlink?: string;
    /** Tooltip */
    tooltip?: string;
    /** Cell error value */
    error?: string;
    /** Shared formula reference */
    sharedFormula?: string;
    /** Array formula */
    arrayFormula?: {
        formula: string;
        range: string;
    };
    /** Rich text (array of formatted text runs) */
    richText?: Array<{
        text: string;
        font?: FontStyle;
    }>;
}
/**
 * Cell address (A1 notation)
 */
export interface CellAddress {
    /** Column name (A, B, C, etc.) */
    column: string;
    /** Row number (1-based) */
    row: number;
    /** Absolute column ($A) */
    absoluteColumn?: boolean;
    /** Absolute row ($1) */
    absoluteRow?: boolean;
}
/**
 * Cell range (A1:B2 notation)
 */
export interface CellRange {
    /** Start cell */
    start: CellAddress;
    /** End cell */
    end: CellAddress;
}
/**
 * Data validation rules
 */
export interface DataValidation {
    /** Validation type */
    type: 'whole' | 'decimal' | 'list' | 'date' | 'time' | 'textLength' | 'custom';
    /** Operator for comparison */
    operator?: 'between' | 'notBetween' | 'equal' | 'notEqual' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual';
    /** Formula 1 (value or range) */
    formula1?: string | number;
    /** Formula 2 (for between operators) */
    formula2?: string | number;
    /** Allow blank */
    allowBlank?: boolean;
    /** Show input message */
    showInputMessage?: boolean;
    /** Show error message */
    showErrorMessage?: boolean;
    /** Input title */
    inputTitle?: string;
    /** Input message */
    inputMessage?: string;
    /** Error title */
    errorTitle?: string;
    /** Error message */
    errorMessage?: string;
    /** Error style */
    errorStyle?: 'stop' | 'warning' | 'information';
    /** List of values (for list type) */
    values?: any[];
    /** Reference to list range */
    listRange?: string;
}
/**
 * Conditional formatting rule
 */
export interface ConditionalFormatRule {
    /** Rule type */
    type: 'expression' | 'cellIs' | 'colorScale' | 'dataBar' | 'iconSet' | 'top10' | 'uniqueValues' | 'duplicateValues' | 'containsText' | 'notContainsText' | 'beginsWith' | 'endsWith' | 'containsBlanks' | 'notContainsBlanks' | 'containsErrors' | 'notContainsErrors' | 'timePeriod' | 'aboveAverage';
    /** Priority of rule */
    priority: number;
    /** Stop if true */
    stopIfTrue?: boolean;
    /** Formula for expression type */
    formula?: string;
    /** Operator for cellIs type */
    operator?: string;
    /** Value for comparison */
    value?: any;
    /** Style to apply */
    style?: CellStyle;
    /** Format for data bars */
    dataBar?: {
        minLength?: number;
        maxLength?: number;
        showValue?: boolean;
        gradient?: boolean;
        border?: boolean;
        negativeBarColor?: string;
        axisColor?: string;
        direction?: 'context' | 'leftToRight' | 'rightToLeft';
    };
    /** Format for color scales */
    colorScale?: {
        minColor?: string;
        midColor?: string;
        maxColor?: string;
    };
    /** Format for icon sets */
    iconSet?: {
        iconSet?: '3Arrows' | '3ArrowsGray' | '3Flags' | '3TrafficLights1' | '3TrafficLights2' | '3Signs' | '3Symbols' | '3Symbols2' | '4Arrows' | '4ArrowsGray' | '4RedToBlack' | '4Rating' | '4TrafficLights' | '5Arrows' | '5ArrowsGray' | '5Rating' | '5Quarters';
        showValue?: boolean;
        percent?: boolean;
        reverse?: boolean;
    };
}
/**
 * Border style
 */
export interface BorderStyle {
    style: BorderStyleType;
    color?: string;
}
