import { CellData, CellStyle, DataValidation, ConditionalFormatRule } from './cell.types';

/**
 * Row properties
 */
export interface RowProperties {
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
export interface RowData extends RowProperties {
  /** Cells in the row */
  cells: CellData[];
}

/**
 * Column properties
 */
export interface ColumnProperties {
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
export interface ColumnData extends ColumnProperties {
  /** Column index */
  index?: number;
}

/**
 * Merged cell range
 */
export interface MergeCell {
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
export interface FreezePane {
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
export interface SheetView {
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
export interface PrintOptions {
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
export interface HeaderFooter {
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
export interface AutoFilter {
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
export interface TableConfig {
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
export interface PivotTableConfig {
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
export interface ChartConfig {
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
export interface WorksheetData {
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
  charts?: ChartConfig[];
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
export interface WorkbookProperties {
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
export interface CalculationProperties {
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
export interface WorkbookData {
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