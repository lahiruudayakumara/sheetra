/**
 * Cell value types supported by Sheetra
 */
type CellValueType = 'string' | 'number' | 'date' | 'boolean' | 'formula' | 'error';
/**
 * Cell alignment options
 */
type HorizontalAlignment = 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed';
type VerticalAlignment = 'top' | 'middle' | 'bottom' | 'distributed' | 'justify';
/**
 * Border style options
 */
type BorderStyleType$1 = 'thin' | 'medium' | 'thick' | 'dotted' | 'dashed' | 'double' | 'hair' | 'mediumDashed' | 'dashDot' | 'mediumDashDot' | 'dashDotDot' | 'mediumDashDotDot' | 'slantDashDot';
/**
 * Font styling options
 */
interface FontStyle {
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
interface BorderEdge$1 {
    /** Border style */
    style?: BorderStyleType$1;
    /** Border color in hex or RGB */
    color?: string;
}
/**
 * Complete border configuration
 */
interface Border {
    /** Top border */
    top?: BorderEdge$1;
    /** Bottom border */
    bottom?: BorderEdge$1;
    /** Left border */
    left?: BorderEdge$1;
    /** Right border */
    right?: BorderEdge$1;
    /** Diagonal border (top-left to bottom-right) */
    diagonal?: BorderEdge$1;
    /** Diagonal border (bottom-left to top-right) */
    diagonalDown?: BorderEdge$1;
    /** Diagonal border (top-right to bottom-left) */
    diagonalUp?: BorderEdge$1;
    /** Diagonal border type */
    diagonalType?: 'both' | 'up' | 'down';
}
/**
 * Fill pattern types
 */
type FillPattern = 'none' | 'solid' | 'gray125' | 'gray0625' | 'gray75' | 'gray50' | 'gray25' | 'gray12' | 'gray6' | 'horizontalStripe' | 'verticalStripe' | 'reverseDiagonalStripe' | 'diagonalStripe' | 'diagonalCrosshatch' | 'thickDiagonalCrosshatch' | 'thinHorizontalStripe' | 'thinVerticalStripe' | 'thinReverseDiagonalStripe' | 'thinDiagonalStripe' | 'thinHorizontalCrosshatch' | 'thinDiagonalCrosshatch';
/**
 * Fill configuration for cell background
 */
interface Fill {
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
interface NumberFormat {
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
interface CellStyle {
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
        style: BorderStyleType$1;
        color?: string;
    };
}
/**
 * Cell data structure
 */
interface CellData {
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
interface CellAddress {
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
interface CellRange {
    /** Start cell */
    start: CellAddress;
    /** End cell */
    end: CellAddress;
}
/**
 * Data validation rules
 */
interface DataValidation {
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
interface ConditionalFormatRule {
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
interface BorderStyle {
    style: BorderStyleType$1;
    color?: string;
}

/**
 * Row properties
 */
interface RowProperties {
    /** Row height in points */
    height?: number;
    /** Hidden row */
    hidden?: boolean;
    /** Outline level (for grouping) */
    outlineLevel?: number;
    /** Collapsed state */
    collapsed?: boolean;
    /** Custom row style */
    style?: CellStyle;
    /** Row page break */
    pageBreak?: boolean;
    /** Phonetic (for Asian languages) */
    phonetic?: boolean;
}
/**
 * Row data structure
 */
interface RowData extends RowProperties {
    /** Cells in the row */
    cells: CellData[];
}
/**
 * Column properties
 */
interface ColumnProperties {
    /** Column width in characters */
    width?: number;
    /** Hidden column */
    hidden?: boolean;
    /** Outline level (for grouping) */
    outlineLevel?: number;
    /** Collapsed state */
    collapsed?: boolean;
    /** Custom column style */
    style?: CellStyle;
    /** Column page break */
    pageBreak?: boolean;
    /** Best fit width */
    bestFit?: boolean;
    /** Phonetic (for Asian languages) */
    phonetic?: boolean;
}
/**
 * Column data structure
 */
interface ColumnData extends ColumnProperties {
    /** Column index */
    index?: number;
}
/**
 * Merged cell range
 */
interface MergeCell {
    /** Start row index (0-based) */
    startRow: number;
    /** Start column index (0-based) */
    startCol: number;
    /** End row index (0-based) */
    endRow: number;
    /** End column index (0-based) */
    endCol: number;
}
/**
 * Frozen pane configuration
 */
interface FreezePane {
    /** Number of frozen rows */
    rows?: number;
    /** Number of frozen columns */
    columns?: number;
    /** Active cell in the unfrozen area */
    activeCell?: string;
}
/**
 * Sheet view settings
 */
interface SheetView {
    /** Right-to-left mode */
    rightToLeft?: boolean;
    /** Show grid lines */
    showGridLines?: boolean;
    /** Show row and column headers */
    showRowColHeaders?: boolean;
    /** Show zero values */
    showZeros?: boolean;
    /** Zoom scale percentage */
    zoomScale?: number;
    /** Zoom scale for page layout view */
    zoomScaleNormal?: number;
    /** Zoom scale for page break preview */
    zoomScalePageBreakPreview?: number;
    /** Zoom scale for page layout view */
    zoomScaleSheetLayoutView?: number;
    /** View type */
    view?: 'normal' | 'pageBreakPreview' | 'pageLayout';
    /** Top-left visible cell */
    topLeftCell?: string;
    /** Split state */
    split?: {
        xSplit?: number;
        ySplit?: number;
        activePane?: 'bottomRight' | 'topRight' | 'bottomLeft' | 'topLeft';
    };
}
/**
 * Print options for worksheet
 */
interface PrintOptions {
    /** Orientation */
    orientation?: 'portrait' | 'landscape';
    /** Fit to page */
    fitToPage?: boolean;
    /** Fit to width (in pages) */
    fitToWidth?: number;
    /** Fit to height (in pages) */
    fitToHeight?: number;
    /** Paper size */
    paperSize?: string | number;
    /** Scale percentage */
    scale?: number;
    /** Print area range */
    printArea?: string;
    /** Print titles (rows to repeat) */
    printTitles?: {
        rows?: string;
        columns?: string;
    };
    /** Center on page */
    center?: {
        horizontal?: boolean;
        vertical?: boolean;
    };
    /** Print grid lines */
    printGridLines?: boolean;
    /** Print row and column headers */
    printHeadings?: boolean;
    /** Black and white */
    blackAndWhite?: boolean;
    /** Draft quality */
    draft?: boolean;
    /** Page order */
    pageOrder?: 'downThenOver' | 'overThenDown';
    /** Comments display */
    comments?: 'none' | 'asDisplayed' | 'atEnd';
    /** Errors display */
    errors?: 'displayed' | 'blank' | 'dash' | 'NA';
    /** First page number */
    firstPageNumber?: number;
    /** Horizontal DPI */
    horizontalDpi?: number;
    /** Vertical DPI */
    verticalDpi?: number;
    /** Header margin */
    headerMargin?: number;
    /** Footer margin */
    footerMargin?: number;
    /** Top margin */
    topMargin?: number;
    /** Bottom margin */
    bottomMargin?: number;
    /** Left margin */
    leftMargin?: number;
    /** Right margin */
    rightMargin?: number;
}
/**
 * Header/Footer configuration
 */
interface HeaderFooter {
    /** Different first page */
    differentFirst?: boolean;
    /** Different odd and even pages */
    differentOddEven?: boolean;
    /** Scale with document */
    scaleWithDoc?: boolean;
    /** Align with margins */
    alignWithMargins?: boolean;
    /** Odd page header */
    oddHeader?: string;
    /** Odd page footer */
    oddFooter?: string;
    /** Even page header */
    evenHeader?: string;
    /** Even page footer */
    evenFooter?: string;
    /** First page header */
    firstHeader?: string;
    /** First page footer */
    firstFooter?: string;
}
/**
 * Auto-filter configuration
 */
interface AutoFilter {
    /** Filter range */
    range: string;
    /** Filter columns */
    columns?: Record<number, {
        /** Filter criteria */
        criteria?: any;
        /** Custom filters */
        customFilters?: any[];
        /** Dynamic filter */
        dynamicFilter?: string;
        /** Top 10 filter */
        top10?: {
            top?: boolean;
            percent?: boolean;
            val?: number;
        };
        /** Color filter */
        colorFilter?: string;
        /** Icon filter */
        iconFilter?: string;
    }>;
}
/**
 * Table configuration
 */
interface TableConfig {
    /** Table name */
    name: string;
    /** Table range */
    range: string;
    /** Table style */
    style?: string;
    /** Header row */
    headerRow?: boolean;
    /** Total row */
    totalRow?: boolean;
    /** Banded rows */
    bandedRows?: boolean;
    /** Banded columns */
    bandedColumns?: boolean;
    /** First column */
    firstColumn?: boolean;
    /** Last column */
    lastColumn?: boolean;
    /** Show auto-filter */
    showFilter?: boolean;
    /** Table columns */
    columns?: Array<{
        name: string;
        totalsRowFunction?: 'none' | 'sum' | 'min' | 'max' | 'average' | 'count' | 'countNums' | 'stdDev' | 'var' | 'custom';
        totalsRowLabel?: string;
        totalsRowFormula?: string;
    }>;
}
/**
 * Pivot table configuration
 */
interface PivotTableConfig {
    /** Pivot table name */
    name: string;
    /** Source data range */
    source: string;
    /** Destination cell */
    destination: string;
    /** Row fields */
    rows?: Array<{
        name: string;
        axis?: 'row' | 'column' | 'page' | 'data';
        sort?: 'ascending' | 'descending' | 'manual';
        position?: number;
    }>;
    /** Column fields */
    columns?: Array<{
        name: string;
        axis?: 'row' | 'column' | 'page' | 'data';
        sort?: 'ascending' | 'descending' | 'manual';
        position?: number;
    }>;
    /** Data fields */
    data?: Array<{
        name: string;
        summarize?: 'sum' | 'count' | 'average' | 'max' | 'min' | 'product' | 'countNums' | 'stdDev' | 'stdDevp' | 'var' | 'varp';
        numberFormat?: string;
    }>;
    /** Page fields */
    pages?: Array<{
        name: string;
        axis?: 'row' | 'column' | 'page' | 'data';
        sort?: 'ascending' | 'descending' | 'manual';
        position?: number;
    }>;
    /** Filter fields */
    filters?: Array<{
        name: string;
        axis?: 'row' | 'column' | 'page' | 'data';
        sort?: 'ascending' | 'descending' | 'manual';
        position?: number;
    }>;
    /** Style */
    style?: string;
    /** Grand total columns */
    grandTotalColumns?: boolean;
    /** Grand total rows */
    grandTotalRows?: boolean;
    /** Show row headers */
    showRowHeaders?: boolean;
    /** Show column headers */
    showColumnHeaders?: boolean;
    /** Compact form */
    compact?: boolean;
    /** Outline form */
    outline?: boolean;
    /** Tabular form */
    tabular?: boolean;
}
/**
 * Chart configuration
 */
interface ChartConfig$1 {
    /** Chart title */
    title?: string;
    /** Chart type */
    type: 'area' | 'bar' | 'column' | 'line' | 'pie' | 'doughnut' | 'radar' | 'scatter' | 'stock' | 'surface' | 'bubble';
    /** Data range */
    dataRange: string;
    /** X-axis range (for scatter) */
    xAxisRange?: string;
    /** Legend position */
    legend?: 'top' | 'bottom' | 'left' | 'right' | 'corner' | 'none';
    /** Chart size */
    size?: {
        width: number;
        height: number;
    };
    /** Chart position */
    position?: {
        x: number;
        y: number;
    };
    /** Chart style */
    style?: number;
    /** Show data labels */
    showDataLabels?: boolean;
    /** Show gridlines */
    showGridlines?: boolean;
    /** 3D */
    threeD?: boolean;
}
/**
 * Complete worksheet data structure
 */
interface WorksheetData {
    /** Sheet name */
    name: string;
    /** Rows in the sheet */
    rows: RowData[];
    /** Column definitions */
    columns?: ColumnData[];
    /** Merged cells */
    mergeCells?: MergeCell[];
    /** Frozen panes */
    freezePane?: FreezePane;
    /** Print options */
    printOptions?: PrintOptions;
    /** Sheet view settings */
    sheetView?: SheetView;
    /** Header/Footer */
    headerFooter?: HeaderFooter;
    /** Auto-filter */
    autoFilter?: AutoFilter;
    /** Tables */
    tables?: TableConfig[];
    /** Pivot tables */
    pivotTables?: PivotTableConfig[];
    /** Charts */
    charts?: ChartConfig$1[];
    /** Data validations */
    dataValidations?: Record<string, DataValidation>;
    /** Conditional formatting */
    conditionalFormats?: Record<string, ConditionalFormatRule[]>;
    /** Sheet protection password */
    protection?: {
        password?: string;
        sheet?: boolean;
        objects?: boolean;
        scenarios?: boolean;
        formatCells?: boolean;
        formatColumns?: boolean;
        formatRows?: boolean;
        insertColumns?: boolean;
        insertRows?: boolean;
        insertHyperlinks?: boolean;
        deleteColumns?: boolean;
        deleteRows?: boolean;
        sort?: boolean;
        autoFilter?: boolean;
        pivotTables?: boolean;
    };
    /** Sheet tab color */
    tabColor?: string;
    /** Sheet state (visible, hidden, veryHidden) */
    state?: 'visible' | 'hidden' | 'veryHidden';
    /** Background image */
    background?: string;
}
/**
 * Workbook properties
 */
interface WorkbookProperties {
    /** Creator name */
    creator?: string;
    /** Last modified by */
    lastModifiedBy?: string;
    /** Creation date */
    created?: Date;
    /** Last modified date */
    modified?: Date;
    /** Company name */
    company?: string;
    /** Manager name */
    manager?: string;
    /** Title */
    title?: string;
    /** Subject */
    subject?: string;
    /** Keywords */
    keywords?: string;
    /** Category */
    category?: string;
    /** Description */
    description?: string;
    /** Status */
    status?: string;
    /** Custom properties */
    custom?: Record<string, string | number | boolean | Date>;
}
/**
 * Workbook calculation properties
 */
interface CalculationProperties {
    /** Calculation mode */
    calcMode?: 'auto' | 'autoNoTable' | 'manual';
    /** Full calculation on load */
    fullCalcOnLoad?: boolean;
    /** Force full calculation */
    forceFullCalc?: boolean;
    /** Iteration */
    iteration?: boolean;
    /** Max iterations */
    maxIterations?: number;
    /** Max change */
    maxChange?: number;
    /** Reference style (A1 or R1C1) */
    refMode?: 'A1' | 'R1C1';
}
/**
 * Complete workbook data structure
 */
interface WorkbookData {
    /** Worksheets in the workbook */
    sheets: WorksheetData[];
    /** Workbook properties */
    properties?: WorkbookProperties;
    /** Calculation properties */
    calculation?: CalculationProperties;
    /** Named ranges */
    namedRanges?: Record<string, {
        range: string;
        localSheet?: number;
        comment?: string;
        hidden?: boolean;
    }>;
    /** External references */
    externalReferences?: Array<{
        name: string;
        path: string;
        type: 'dde' | 'ole' | 'external';
    }>;
    /** Active sheet index */
    activeSheet?: number;
    /** Selected tabs */
    selectedTabs?: number[];
    /** Tab ratio */
    tabRatio?: number;
    /** First visible tab */
    firstVisibleTab?: number;
    /** Workbook views */
    views?: Array<{
        activeTab?: number;
        firstSheet?: number;
        showHorizontalScroll?: boolean;
        showVerticalScroll?: boolean;
        showSheetTabs?: boolean;
        xWindow?: number;
        yWindow?: number;
        windowWidth?: number;
        windowHeight?: number;
        tabRatio?: number;
    }>;
}

/**
 * Export options for exporting sheets, workbooks, etc.
 */
interface ExportOptions {
    /** Output file name (with extension) */
    filename?: string;
    /** File format: 'xlsx', 'csv', 'json', etc. */
    format?: 'xlsx' | 'csv' | 'json';
    /** Whether to include styles in export */
    includeStyles?: boolean;
    /** Whether to include hidden rows/columns */
    includeHidden?: boolean;
    /** Password for protected export (if supported) */
    password?: string;
    /** Sheet name (for single-sheet export) */
    sheetName?: string;
    /** Locale for formatting */
    locale?: string;
    /** Custom options for writers */
    [key: string]: any;
}
/**
 * Chart series data
 */
interface ChartSeries {
    /** Series name */
    name?: string;
    /** Categories (X-axis) */
    categories?: any[];
    /** Values (Y-axis) */
    values: any[];
    /** Series color */
    color?: string;
    /** Series style */
    style?: number;
    /** Marker style (for line charts) */
    marker?: {
        symbol?: 'circle' | 'diamond' | 'square' | 'triangle' | 'none';
        size?: number;
        fill?: string;
        stroke?: string;
    };
    /** Trendline */
    trendline?: {
        type: 'linear' | 'exponential' | 'logarithmic' | 'polynomial' | 'movingAverage';
        order?: number;
        period?: number;
        forward?: number;
        backward?: number;
        intercept?: number;
        displayEquation?: boolean;
        displayRSquared?: boolean;
        name?: string;
    };
    /** Error bars */
    errorBars?: {
        type: 'fixed' | 'percentage' | 'standardDeviation' | 'standardError' | 'custom';
        value?: number;
        plusValues?: any[];
        minusValues?: any[];
        direction?: 'both' | 'plus' | 'minus';
        endStyle?: 'cap' | 'noCap';
    };
}
/**
 * Chart axis configuration
 */
interface ChartAxis {
    /** Axis title */
    title?: string;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Major unit */
    majorUnit?: number;
    /** Minor unit */
    minorUnit?: number;
    /** Reverse order */
    reverse?: boolean;
    /** Logarithmic scale */
    logarithmic?: boolean;
    /** Base for logarithmic scale */
    logBase?: number;
    /** Format code */
    format?: string;
    /** Axis position */
    position?: 'bottom' | 'left' | 'right' | 'top';
    /** Crossing point */
    crosses?: 'auto' | 'min' | 'max' | number;
    /** Gridlines */
    gridlines?: {
        major?: boolean;
        minor?: boolean;
        color?: string;
    };
    /** Tick marks */
    tickMarks?: {
        major?: 'none' | 'inside' | 'outside' | 'cross';
        minor?: 'none' | 'inside' | 'outside' | 'cross';
    };
    /** Font */
    font?: {
        name?: string;
        size?: number;
        bold?: boolean;
        color?: string;
    };
}
/**
 * Complete chart configuration
 */
interface ChartConfig {
    /** Chart title */
    title?: string;
    /** Chart type */
    type: 'area' | 'bar' | 'column' | 'line' | 'pie' | 'doughnut' | 'radar' | 'scatter' | 'stock' | 'surface' | 'bubble' | 'radarArea' | 'radarLine' | 'radarFilled' | 'barStacked' | 'columnStacked' | 'barPercent' | 'columnPercent' | 'areaStacked' | 'areaPercent' | 'lineStacked' | 'linePercent' | 'pie3D' | 'bar3D' | 'column3D' | 'line3D' | 'area3D' | 'surface3D';
    /** Chart sub-type */
    subType?: 'clustered' | 'stacked' | 'percent' | '3D' | '3DClustered' | '3DStacked' | '3DPercent';
    /** Data range */
    dataRange?: string;
    /** Series data */
    series?: ChartSeries[];
    /** X-axis configuration */
    xAxis?: ChartAxis;
    /** Y-axis configuration */
    yAxis?: ChartAxis;
    /** Secondary X-axis */
    xAxis2?: ChartAxis;
    /** Secondary Y-axis */
    yAxis2?: ChartAxis;
    /** Legend */
    legend?: {
        position?: 'top' | 'bottom' | 'left' | 'right' | 'corner' | 'none';
        layout?: 'stack' | 'overlay';
        showSeriesName?: boolean;
        font?: {
            name?: string;
            size?: number;
            bold?: boolean;
            color?: string;
        };
    };
    /** Data labels */
    dataLabels?: {
        show?: boolean;
        position?: 'center' | 'insideEnd' | 'insideBase' | 'outsideEnd' | 'bestFit';
        format?: string;
        font?: {
            name?: string;
            size?: number;
            bold?: boolean;
            color?: string;
        };
        separator?: string;
        showSeriesName?: boolean;
        showCategoryName?: boolean;
        showValue?: boolean;
        showPercentage?: boolean;
        showLeaderLines?: boolean;
    };
    /** Chart size in pixels */
    size?: {
        width: number;
        height: number;
    };
    /** Chart position in pixels (from top-left of sheet) */
    position?: {
        x: number;
        y: number;
    };
    /** Chart style (1-48) */
    style?: number;
    /** Chart template */
    template?: string;
    /** Gap width (for bar/column) */
    gapWidth?: number;
    /** Overlap (for bar/column) */
    overlap?: number;
    /** Vary colors by point */
    varyColors?: boolean;
    /** Smooth lines */
    smooth?: boolean;
    /** Show data table */
    dataTable?: {
        show?: boolean;
        showLegendKeys?: boolean;
        border?: boolean;
        font?: {
            name?: string;
            size?: number;
            bold?: boolean;
            color?: string;
        };
    };
    /** 3D options */
    threeD?: {
        rotation?: number;
        perspective?: number;
        height?: number;
        depth?: number;
        rightAngleAxes?: boolean;
        lighting?: boolean;
    };
    /** Plot area */
    plotArea?: {
        border?: Border;
        fill?: Fill;
        transparency?: number;
    };
    /** Chart area */
    chartArea?: {
        border?: Border;
        fill?: Fill;
        transparency?: number;
    };
}
/**
 * Drawing object (image, shape, etc.)
 */
interface Drawing {
    /** Drawing type */
    type: 'image' | 'shape' | 'chart' | 'smartArt';
    /** Drawing position */
    from: {
        col: number;
        row: number;
        colOffset?: number;
        rowOffset?: number;
    };
    /** Drawing size */
    to?: {
        col: number;
        row: number;
        colOffset?: number;
        rowOffset?: number;
    };
    /** Image data (for images) */
    image?: {
        data: string | ArrayBuffer;
        format: 'png' | 'jpg' | 'gif' | 'bmp' | 'svg';
        name?: string;
        description?: string;
    };
    /** Shape data (for shapes) */
    shape?: {
        type: 'rectangle' | 'ellipse' | 'triangle' | 'line' | 'arrow' | 'callout' | 'flowchart' | 'star' | 'banner';
        text?: string;
        fill?: Fill;
        border?: Border;
        rotation?: number;
        flipHorizontal?: boolean;
        flipVertical?: boolean;
    };
    /** Chart reference */
    chart?: ChartConfig;
    /** Alternative text */
    altText?: string;
    /** Hyperlink */
    hyperlink?: string;
    /** Lock aspect ratio */
    lockAspect?: boolean;
    /** Lock position */
    lockPosition?: boolean;
    /** Print object */
    print?: boolean;
    /** Hidden */
    hidden?: boolean;
}
/**
 * Section configuration for export (e.g., for splitting sheets into sections)
 */
interface SectionConfig {
    /** Section title */
    title?: string;
    /** Section description */
    description?: string;
    /** Range of rows included in this section (e.g., "A1:D10") */
    range?: string;
    /** Whether the section is collapsible */
    collapsible?: boolean;
    /** Whether the section is initially collapsed */
    collapsed?: boolean;
    /** Custom styles for the section */
    style?: {
        backgroundColor?: string;
        fontColor?: string;
        fontSize?: number;
        bold?: boolean;
        italic?: boolean;
        border?: Border;
        fill?: Fill;
    };
    /** Additional custom options */
    [key: string]: any;
}
/**
 * Export filters
 */
interface ExportFilters {
    [key: string]: any;
}

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type Nullable<T> = T | null | undefined;
type Record$1 = {
    [key: string]: unknown;
};

declare class Cell {
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

declare class Row {
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

declare class Column {
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

declare class Worksheet {
    private name;
    private rows;
    private columns;
    private mergedCells;
    private freezePane?;
    private printOptions?;
    constructor(name: string);
    getName(): string;
    setName(name: string): this;
    addRow(row: Row): this;
    createRow(index?: number): Row;
    getRow(index: number): Row | undefined;
    getRows(): Row[];
    removeRow(index: number): boolean;
    addColumn(column: Column): this;
    createColumn(width?: number): Column;
    getColumn(index: number): Column | undefined;
    getColumns(): Column[];
    setCell(row: number, col: number, value: any, style?: any): this;
    getCell(row: number, col: number): CellData | undefined;
    mergeCells(startRow: number, startCol: number, endRow: number, endCol: number): this;
    setFreezePane(row?: number, col?: number): this;
    setPrintOptions(options: PrintOptions): this;
    setOutlineLevel(row: number, level: number, collapsed?: boolean): this;
    setColumnOutlineLevel(col: number, level: number, collapsed?: boolean): this;
    toData(): WorksheetData;
    static fromData(data: WorksheetData): Worksheet;
}

declare class Workbook {
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

declare class StyleBuilder {
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

declare class ExportBuilder {
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

/**
 * SheetBuilder provides a fluent API for building Excel worksheets
 */
declare class SheetBuilder {
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
    addChart(config: ChartConfig$1): this;
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

/**
 * Builder class for creating collapsible sections in worksheets
 * Supports nested sections, grouping, summaries, and conditional styling
 */
declare class SectionBuilder {
    private worksheet;
    private currentRow;
    private sections;
    private styles;
    private formatters;
    private conditionalFormats;
    constructor(worksheet: Worksheet);
    /**
     * Add a section to the worksheet
     */
    addSection(config: SectionConfig): this;
    /**
     * Add multiple sections at once
     */
    addSections(configs: SectionConfig[]): this;
    /**
     * Add a nested section (child of current section)
     */
    addNestedSection(parentTitle: string, config: SectionConfig): this;
    /**
     * Create a section from data with automatic grouping
     */
    createFromData<T>(data: T[], options: {
        title: string;
        groupBy?: keyof T | ((item: T) => string);
        fields?: Array<keyof T | string>;
        fieldLabels?: Record<string, string>;
        level?: number;
        collapsed?: boolean;
        summary?: {
            fields: Array<keyof T>;
            functions: Array<'sum' | 'average' | 'count' | 'min' | 'max'>;
        };
    }): this;
    /**
     * Add a summary section (totals, averages, etc.)
     */
    addSummarySection(data: any[], fields: string[], functions: Array<'sum' | 'average' | 'count' | 'min' | 'max'>, options?: {
        level?: number;
        style?: CellStyle;
        showPercentage?: boolean;
        label?: string;
    }): this;
    /**
     * Add a hierarchical section (tree structure)
     */
    addHierarchicalSection<T>(items: T[], childrenAccessor: (item: T) => T[], options?: {
        title?: string;
        level?: number;
        fields?: Array<keyof T>;
        collapsed?: boolean;
        showCount?: boolean;
    }): this;
    /**
     * Add a pivot-like section with multiple dimensions
     */
    addPivotSection(data: any[], dimensions: {
        rows: string[];
        columns: string[];
        values: Array<{
            field: string;
            aggregate: 'sum' | 'average' | 'count' | 'min' | 'max';
        }>;
    }, options?: {
        level?: number;
        showGrandTotals?: boolean;
        showSubTotals?: boolean;
    }): this;
    /**
     * Add a timeline section (grouped by date periods)
     */
    addTimelineSection(data: any[], dateField: string, period: 'day' | 'week' | 'month' | 'quarter' | 'year', options?: {
        fields?: string[];
        level?: number;
        showTrends?: boolean;
        format?: string;
    }): this;
    /**
     * Add a filtered section
     */
    addFilteredSection(config: SectionConfig, filters: ExportFilters): this;
    /**
     * Add conditional formatting to the current section
     */
    addConditionalFormat(rule: ConditionalFormatRule): this;
    /**
     * Add a custom formatter for a field
     */
    addFormatter(field: string, formatter: (value: any) => any): this;
    /**
     * Register a reusable style
     */
    registerStyle(name: string, style: CellStyle): this;
    /**
     * Apply a registered style
     */
    applyStyle(styleName: string): this;
    /**
     * Get the current row count
     */
    getCurrentRow(): number;
    /**
     * Reset the builder
     */
    reset(): this;
    private groupData;
    private groupMultiLevel;
    private groupByDate;
    private getWeekNumber;
    private getPreviousPeriod;
    private calculateTrend;
    private applyFilters;
    private getNestedValue;
}

declare class ExcelWriter {
    static write(workbook: Workbook, _options: ExportOptions): Promise<Blob>;
    private static generateExcelData;
    private static generateSheetData;
    private static getSheetRange;
    private static columnToLetter;
    private static createExcelFile;
    private static generateWorkbookXML;
}

declare class CSVWriter {
    static write(workbook: Workbook, _options: ExportOptions): Promise<Blob>;
    private static generateCSVData;
}

declare class JSONWriter {
    static write(workbook: Workbook, _options: ExportOptions): Promise<Blob>;
    private static generateJSONData;
}

declare class DateFormatter {
    static format(date: Date | string | number, format?: string): string;
    static toExcelDate(date: Date | string | number): number;
    private static parseDate;
    private static formatWithPattern;
    private static pad;
}

declare class NumberFormatter {
    static format(value: number, format?: string): string;
    private static formatWithPattern;
    private static formatCurrency;
    private static formatPercentage;
}

/**
 * Format currency values
 */
declare const formatCurrency: (value: number) => string;
/**
 * Format date values
 */
declare const formatDate: (date: string | Date) => string;
/**
 * Format number with commas
 */
declare const formatNumber: (num: number) => string;
/**
 * Truncate text with ellipsis
 */
declare const truncateText: (text: string, maxLength: number) => string;
/**
 * Generate random ID
 */
declare const generateId: () => string;
/**
 * Debounce function
 */
declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
/**
 * Group array by key
 */
declare const groupBy: <T>(array: T[], key: keyof T) => Record<string, T[]>;
/**
 * Calculate percentage
 */
declare const calculatePercentage: (value: number, total: number) => number;
/**
 * Download file
 */
declare const downloadFile: (content: string, filename: string, type: string) => void;

declare function exportToExcel(data: any[], options?: any): Workbook;
declare function exportToCSV(data: any[], options?: any): string;
declare const VERSION = "1.0.0";

export { AutoFilter, Border, BorderEdge$1 as BorderEdge, BorderStyle, BorderStyleType$1 as BorderStyleType, CSVWriter, CalculationProperties, Cell, CellAddress, CellData, CellRange, CellStyle, CellValueType, ChartConfig$1 as ChartConfig, Column, ColumnData, ColumnProperties, ConditionalFormatRule, DataValidation, DateFormatter, DeepPartial, Drawing, ExcelWriter, ExportBuilder, ExportFilters, ExportOptions, Fill, FillPattern, FontStyle, FreezePane, HeaderFooter, HorizontalAlignment, JSONWriter, MergeCell, Nullable, NumberFormat, NumberFormatter, PivotTableConfig, PrintOptions, Record$1 as Record, Row, RowData, RowProperties, SectionBuilder, SectionConfig, SheetBuilder, SheetView, StyleBuilder, TableConfig, VERSION, VerticalAlignment, Workbook, WorkbookData, WorkbookProperties, Worksheet, WorksheetData, calculatePercentage, debounce, downloadFile, exportToCSV, exportToExcel, formatCurrency, formatDate, formatNumber, generateId, groupBy, truncateText };
