/**
 * String formatting options
 */
export interface StringFormatOptions {
    /** Maximum length */
    maxLength?: number;
    /** Truncation indicator */
    truncationIndicator?: string;
    /** Case transformation */
    case?: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab';
    /** Padding configuration */
    padding?: {
        /** Total width */
        width: number;
        /** Pad character */
        char?: string;
        /** Pad side */
        side?: 'left' | 'right' | 'both';
    };
    /** Trim whitespace */
    trim?: boolean;
    /** Replace patterns */
    replace?: Array<{
        pattern: RegExp | string;
        replacement: string;
    }>;
    /** Prefix to add */
    prefix?: string;
    /** Suffix to add */
    suffix?: string;
    /** Escape special characters */
    escape?: boolean;
    /** Remove accents/diacritics */
    normalize?: boolean;
    /** Format as currency */
    currency?: {
        symbol?: string;
        position?: 'before' | 'after';
        thousandsSeparator?: boolean;
        decimalPlaces?: number;
    };
    /** Format as phone number */
    phone?: {
        format: 'international' | 'national' | 'e164';
        countryCode?: string;
        separator?: string;
    };
    /** Format as credit card */
    creditCard?: {
        mask?: boolean;
        separator?: 'space' | 'dash' | 'none';
        maskChar?: string;
    };
    /** Format as email */
    email?: {
        lowercase?: boolean;
        trim?: boolean;
    };
    /** Format as URL */
    url?: {
        protocol?: boolean;
        www?: boolean;
        lowercase?: boolean;
    };
    /** Format as file path */
    filePath?: {
        separator?: 'forward' | 'backward';
        normalize?: boolean;
        extension?: string;
    };
}
/**
 * String manipulation utilities
 */
export declare class StringFormatter {
    /**
     * Format a string with options
     */
    static format(value: unknown, options?: StringFormatOptions): string;
    /**
     * Transform string case
     */
    static transformCase(str: string, type: StringFormatOptions['case']): string;
    /**
     * Pad a string to a specific width
     */
    static pad(str: string, options: NonNullable<StringFormatOptions['padding']>): string;
    /**
     * Truncate string to maximum length
     */
    static truncate(str: string, maxLength: number, indicator?: string): string;
    /**
     * Escape HTML special characters
     */
    static escapeHtml(str: string): string;
    /**
     * Unescape HTML special characters
     */
    static unescapeHtml(str: string): string;
    /**
     * Escape regex special characters
     */
    static escapeRegex(str: string): string;
    /**
     * Escape CSV special characters
     */
    static escapeCsv(str: string, delimiter?: string): string;
    /**
     * Remove accents/diacritics
     */
    static normalize(str: string): string;
    /**
     * Reverse a string
     */
    static reverse(str: string): string;
    /**
     * Check if string contains only ASCII characters
     */
    static isAscii(str: string): boolean;
    /**
     * Convert to ASCII (remove non-ASCII)
     */
    static toAscii(str: string): string;
    /**
     * Extract numbers from string
     */
    static extractNumbers(str: string): string;
    /**
     * Extract letters from string
     */
    static extractLetters(str: string): string;
    /**
     * Extract alphanumeric characters
     */
    static extractAlphanumeric(str: string): string;
    /**
     * Format as currency
     */
    static formatAsCurrency(str: string, options: NonNullable<StringFormatOptions['currency']>): string;
    /**
     * Format as phone number
     */
    static formatAsPhone(str: string, options: NonNullable<StringFormatOptions['phone']>): string;
    /**
     * Format as credit card
     */
    static formatAsCreditCard(str: string, options: NonNullable<StringFormatOptions['creditCard']>): string;
    /**
     * Format as email
     */
    static formatAsEmail(str: string, options: NonNullable<StringFormatOptions['email']>): string;
    /**
     * Format as URL
     */
    static formatAsUrl(str: string, options: NonNullable<StringFormatOptions['url']>): string;
    /**
     * Format as file path
     */
    static formatAsFilePath(str: string, options: NonNullable<StringFormatOptions['filePath']>): string;
    /**
     * Pluralize a word
     */
    static pluralize(word: string, count: number, plural?: string): string;
    /**
     * Convert to slug (URL-friendly)
     */
    static slugify(str: string, separator?: string): string;
    /**
     * Convert to camelCase
     */
    static camelCase(str: string): string;
    /**
     * Convert to PascalCase
     */
    static pascalCase(str: string): string;
    /**
     * Convert to snake_case
     */
    static snakeCase(str: string): string;
    /**
     * Convert to kebab-case
     */
    static kebabCase(str: string): string;
    /**
     * Capitalize first letter
     */
    static capitalize(str: string): string;
    /**
     * Capitalize each word
     */
    static capitalizeWords(str: string): string;
    /**
     * Check if string starts with any of the provided prefixes
     */
    static startsWithAny(str: string, prefixes: string[]): boolean;
    /**
     * Check if string ends with any of the provided suffixes
     */
    static endsWithAny(str: string, suffixes: string[]): boolean;
    /**
     * Remove all whitespace
     */
    static removeWhitespace(str: string): string;
    /**
     * Normalize whitespace (replace multiple spaces with single)
     */
    static normalizeWhitespace(str: string): string;
    /**
     * Get word count
     */
    static wordCount(str: string): number;
    /**
     * Get character count (excluding optional spaces)
     */
    static charCount(str: string, excludeSpaces?: boolean): number;
    /**
     * Mask a string (show only first and last characters)
     */
    static mask(str: string, visibleStart?: number, visibleEnd?: number, maskChar?: string): string;
    /**
     * Generate random string
     */
    static random(length: number, charset?: string): string;
    /**
     * Check if string is palindrome
     */
    static isPalindrome(str: string): boolean;
    /**
     * Levenshtein distance between two strings
     */
    static levenshteinDistance(a: string, b: string): number;
    /**
     * Calculate similarity percentage between two strings
     */
    static similarity(a: string, b: string): number;
    /**
     * Highlight matching text
     */
    static highlight(text: string, search: string, tag?: string): string;
    /**
     * Indent text
     */
    static indent(str: string, level?: number, char?: string): string;
    /**
     * Wrap text to specified width
     */
    static wrap(str: string, width: number, indent?: string): string[];
}
/**
 * Template string utilities
 */
export declare class TemplateFormatter {
    /**
     * Simple template interpolation
     */
    static interpolate(template: string, data: Record<string, any>, pattern?: RegExp): string;
    /**
     * Template with conditions
     */
    static conditional(template: string, data: Record<string, any>): string;
    /**
     * Template with loops
     */
    static loop(template: string, data: Record<string, any>): string;
    /**
     * Evaluate expression safely
     */
    private static evaluateExpression;
}
/**
 * Byte size formatter
 */
export declare class ByteFormatter {
    static readonly UNITS: string[];
    /**
     * Format bytes to human readable string
     */
    static format(bytes: number, decimals?: number): string;
    /**
     * Parse human readable size to bytes
     */
    static parse(size: string): number;
}
/**
 * Duration formatter
 */
export declare class DurationFormatter {
    /**
     * Format milliseconds to human readable duration
     */
    static format(ms: number, options?: {
        includeMs?: boolean;
        maxUnits?: number;
        separator?: string;
    }): string;
    /**
     * Parse duration string to milliseconds
     */
    static parse(duration: string): number;
}
/**
 * Export all formatters
 */
declare const _default: {
    StringFormatter: typeof StringFormatter;
    TemplateFormatter: typeof TemplateFormatter;
    ByteFormatter: typeof ByteFormatter;
    DurationFormatter: typeof DurationFormatter;
};
export default _default;
