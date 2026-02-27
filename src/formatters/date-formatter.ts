export class DateFormatter {
  static format(date: Date | string | number, format?: string): string {
    const d = this.parseDate(date);
    if (!d) return '';

    if (format) {
      return this.formatWithPattern(d, format);
    }

    // Default format: YYYY-MM-DD
    return d.toISOString().split('T')[0];
  }

  static toExcelDate(date: Date | string | number): number {
    const d = this.parseDate(date);
    if (!d) return 0;

    // Excel date starts from 1900-01-01
    const excelEpoch = new Date(1900, 0, 1);
    const diffTime = d.getTime() - excelEpoch.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // Add 1 because Excel thinks 1900-01-01 is day 1
    // Subtract 1 for the 1900 leap year bug
    return diffDays + 1;
  }

  private static parseDate(date: Date | string | number): Date | null {
    if (date instanceof Date) {
      return date;
    }
    
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        return d;
      }
    }
    
    return null;
  }

  private static formatWithPattern(date: Date, pattern: string): string {
    const map: Record<string, string> = {
      'YYYY': date.getFullYear().toString(),
      'YY': date.getFullYear().toString().slice(-2),
      'MM': this.pad(date.getMonth() + 1),
      'M': (date.getMonth() + 1).toString(),
      'DD': this.pad(date.getDate()),
      'D': date.getDate().toString(),
      'HH': this.pad(date.getHours()),
      'H': date.getHours().toString(),
      'mm': this.pad(date.getMinutes()),
      'm': date.getMinutes().toString(),
      'ss': this.pad(date.getSeconds()),
      's': date.getSeconds().toString()
    };

    return pattern.replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g, match => map[match] || match);
  }

  private static pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}