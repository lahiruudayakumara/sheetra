export class NumberFormatter {
  static format(value: number, format?: string): string {
    if (value === null || value === undefined) return '';

    if (format) {
      return this.formatWithPattern(value, format);
    }

    return value.toString();
  }

  private static formatWithPattern(value: number, pattern: string): string {
    // Handle currency format
    if (pattern.includes('$')) {
      return this.formatCurrency(value, pattern);
    }

    // Handle percentage
    if (pattern.includes('%')) {
      return this.formatPercentage(value, pattern);
    }

    // Handle decimal places
    const decimalMatch = pattern.match(/\.(0+)/);
    if (decimalMatch) {
      const decimals = decimalMatch[1].length;
      return value.toFixed(decimals);
    }

    return value.toString();
  }

  private static formatCurrency(value: number, pattern: string): string {
    const symbol = pattern.includes('$') ? '$' : '';
    const decimals = pattern.includes('.00') ? 2 : 0;
    
    const formatted = value.toFixed(decimals);
    const parts = formatted.split('.');
    
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return symbol + parts.join('.');
  }

  private static formatPercentage(value: number, pattern: string): string {
    const percentValue = value * 100;
    const decimals = pattern.includes('.00') ? 2 : 0;
    
    return percentValue.toFixed(decimals) + '%';
  }
}