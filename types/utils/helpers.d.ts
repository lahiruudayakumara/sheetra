/**
 * Format currency values
 */
export declare const formatCurrency: (value: number) => string;
/**
 * Format date values
 */
export declare const formatDate: (date: string | Date) => string;
/**
 * Format number with commas
 */
export declare const formatNumber: (num: number) => string;
/**
 * Truncate text with ellipsis
 */
export declare const truncateText: (text: string, maxLength: number) => string;
/**
 * Generate random ID
 */
export declare const generateId: () => string;
/**
 * Debounce function
 */
export declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
/**
 * Group array by key
 */
export declare const groupBy: <T>(array: T[], key: keyof T) => Record<string, T[]>;
/**
 * Calculate percentage
 */
export declare const calculatePercentage: (value: number, total: number) => number;
/**
 * Download file
 */
export declare const downloadFile: (content: string, filename: string, type: string) => void;
