import { Worksheet } from '../core/worksheet';
import { SectionConfig, CellStyle, ExportFilters, ConditionalFormatRule } from '../types';
/**
 * Builder class for creating collapsible sections in worksheets
 * Supports nested sections, grouping, summaries, and conditional styling
 */
export declare class SectionBuilder {
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
/**
 * Factory function to create a new SectionBuilder
 */
export declare function createSectionBuilder(worksheet: Worksheet): SectionBuilder;
/**
 * Pre-built section templates
 */
export declare const SectionTemplates: {
    /**
     * Create a financial summary section
     */
    financialSummary(data: any[], options?: any): SectionConfig;
    /**
     * Create an inventory section
     */
    inventorySection(parts: any[], instances?: any[]): SectionConfig;
    /**
     * Create a project timeline section
     */
    projectTimeline(tasks: any[]): SectionConfig;
};
