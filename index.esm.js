class DateFormatter {
    static format(date, format) {
        const d = this.parseDate(date);
        if (!d)
            return '';
        if (format) {
            return this.formatWithPattern(d, format);
        }
        // Default format: YYYY-MM-DD
        return d.toISOString().split('T')[0];
    }
    static toExcelDate(date) {
        const d = this.parseDate(date);
        if (!d)
            return 0;
        // Excel date starts from 1900-01-01
        const excelEpoch = new Date(1900, 0, 1);
        const diffTime = d.getTime() - excelEpoch.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        // Add 1 because Excel thinks 1900-01-01 is day 1
        // Subtract 1 for the 1900 leap year bug
        return diffDays + 1;
    }
    static parseDate(date) {
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
    static formatWithPattern(date, pattern) {
        const map = {
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
    static pad(num) {
        return num.toString().padStart(2, '0');
    }
}

class NumberFormatter {
    static format(value, format) {
        if (value === null || value === undefined)
            return '';
        if (format) {
            return this.formatWithPattern(value, format);
        }
        return value.toString();
    }
    static formatWithPattern(value, pattern) {
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
    static formatCurrency(value, pattern) {
        const symbol = pattern.includes('$') ? '$' : '';
        const decimals = pattern.includes('.00') ? 2 : 0;
        const formatted = value.toFixed(decimals);
        const parts = formatted.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return symbol + parts.join('.');
    }
    static formatPercentage(value, pattern) {
        const percentValue = value * 100;
        const decimals = pattern.includes('.00') ? 2 : 0;
        return percentValue.toFixed(decimals) + '%';
    }
}

class Cell {
    constructor(value, style) {
        this.value = null;
        this.type = 'string';
        if (value !== undefined) {
            this.setValue(value);
        }
        if (style) {
            this.setStyle(style);
        }
    }
    setValue(value) {
        this.value = value;
        this.inferType();
        return this;
    }
    setStyle(style) {
        this.style = style;
        return this;
    }
    setFormula(formula) {
        this.formula = formula;
        this.type = 'formula';
        return this;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    inferType() {
        if (this.value instanceof Date) {
            this.type = 'date';
        }
        else if (typeof this.value === 'number') {
            this.type = 'number';
        }
        else if (typeof this.value === 'boolean') {
            this.type = 'boolean';
        }
        else {
            this.type = 'string';
        }
    }
    getFormattedValue() {
        var _a, _b, _c, _d, _e, _f;
        if (this.value === null || this.value === undefined) {
            return '';
        }
        switch (this.type) {
            case 'date': {
                const dateFormat = typeof ((_a = this.style) === null || _a === void 0 ? void 0 : _a.numberFormat) === 'string'
                    ? this.style.numberFormat
                    : (_c = (_b = this.style) === null || _b === void 0 ? void 0 : _b.numberFormat) === null || _c === void 0 ? void 0 : _c.format;
                return DateFormatter.format(this.value, dateFormat);
            }
            case 'number': {
                const numberFormat = typeof ((_d = this.style) === null || _d === void 0 ? void 0 : _d.numberFormat) === 'string'
                    ? this.style.numberFormat
                    : (_f = (_e = this.style) === null || _e === void 0 ? void 0 : _e.numberFormat) === null || _f === void 0 ? void 0 : _f.format;
                return NumberFormatter.format(this.value, numberFormat);
            }
            case 'boolean':
                return this.value ? 'TRUE' : 'FALSE';
            case 'formula':
                return this.formula || '';
            default:
                return String(this.value);
        }
    }
    toData() {
        return {
            value: this.value,
            style: this.style,
            formula: this.formula,
            type: this.type
        };
    }
    static fromData(data) {
        const cell = new Cell();
        cell.value = data.value;
        cell.style = data.style;
        cell.formula = data.formula;
        const validTypes = ['string', 'number', 'boolean', 'date', 'formula'];
        cell.type = validTypes.includes(data.type) ? data.type : 'string';
        if (cell.value && !cell.type) {
            cell.inferType();
        }
        return cell;
    }
}

class Row {
    constructor(cells) {
        this.cells = [];
        this.hidden = false;
        this.outlineLevel = 0;
        this.collapsed = false;
        if (cells) {
            this.cells = cells;
        }
    }
    addCell(cell) {
        this.cells.push(cell);
        return this;
    }
    createCell(value, style) {
        const cell = new Cell(value, style);
        this.cells.push(cell);
        return cell;
    }
    setCell(index, value, style) {
        while (this.cells.length <= index) {
            this.cells.push(new Cell());
        }
        this.cells[index].setValue(value).setStyle(style);
        return this;
    }
    getCell(index) {
        var _a;
        return (_a = this.cells[index]) === null || _a === void 0 ? void 0 : _a.toData();
    }
    getCells() {
        return this.cells;
    }
    setHeight(height) {
        this.height = height;
        return this;
    }
    setHidden(hidden) {
        this.hidden = hidden;
        return this;
    }
    setOutlineLevel(level, collapsed = false) {
        this.outlineLevel = level;
        this.collapsed = collapsed;
        return this;
    }
    toData() {
        return {
            cells: this.cells.map(cell => cell.toData()),
            height: this.height,
            hidden: this.hidden,
            outlineLevel: this.outlineLevel,
            collapsed: this.collapsed
        };
    }
    static fromData(data) {
        const row = new Row(data.cells.map(cellData => Cell.fromData(cellData)));
        row.height = data.height;
        row.hidden = data.hidden || false;
        row.outlineLevel = data.outlineLevel || 0;
        row.collapsed = data.collapsed || false;
        return row;
    }
}

class Column {
    constructor(width) {
        this.hidden = false;
        this.outlineLevel = 0;
        this.collapsed = false;
        this.width = width;
    }
    setWidth(width) {
        this.width = width;
        return this;
    }
    setHidden(hidden) {
        this.hidden = hidden;
        return this;
    }
    setOutlineLevel(level, collapsed = false) {
        this.outlineLevel = level;
        this.collapsed = collapsed;
        return this;
    }
    toData() {
        return {
            width: this.width,
            hidden: this.hidden,
            outlineLevel: this.outlineLevel,
            collapsed: this.collapsed
        };
    }
    static fromData(data) {
        const column = new Column(data.width);
        column.hidden = data.hidden || false;
        column.outlineLevel = data.outlineLevel || 0;
        column.collapsed = data.collapsed || false;
        return column;
    }
}

class Worksheet {
    constructor(name) {
        this.rows = [];
        this.columns = [];
        this.mergedCells = [];
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    addRow(row) {
        this.rows.push(row);
        return this;
    }
    createRow(index) {
        const row = new Row();
        if (index !== undefined) {
            this.rows.splice(index, 0, row);
        }
        else {
            this.rows.push(row);
        }
        return row;
    }
    getRow(index) {
        return this.rows[index];
    }
    getRows() {
        return this.rows;
    }
    removeRow(index) {
        if (index >= 0 && index < this.rows.length) {
            this.rows.splice(index, 1);
            return true;
        }
        return false;
    }
    addColumn(column) {
        this.columns.push(column);
        return this;
    }
    createColumn(width) {
        const column = new Column(width);
        this.columns.push(column);
        return column;
    }
    getColumn(index) {
        return this.columns[index];
    }
    getColumns() {
        return this.columns;
    }
    setCell(row, col, value, style) {
        while (this.rows.length <= row) {
            this.rows.push(new Row());
        }
        this.rows[row].setCell(col, value, style);
        return this;
    }
    getCell(row, col) {
        const rowObj = this.rows[row];
        return rowObj === null || rowObj === void 0 ? void 0 : rowObj.getCell(col);
    }
    mergeCells(startRow, startCol, endRow, endCol) {
        this.mergedCells.push({ startRow, startCol, endRow, endCol });
        return this;
    }
    setFreezePane(row, col) {
        this.freezePane = { rows: row, columns: col };
        return this;
    }
    setPrintOptions(options) {
        this.printOptions = options;
        return this;
    }
    setOutlineLevel(row, level, collapsed = false) {
        if (this.rows[row]) {
            this.rows[row].setOutlineLevel(level, collapsed);
        }
        return this;
    }
    setColumnOutlineLevel(col, level, collapsed = false) {
        while (this.columns.length <= col) {
            this.columns.push(new Column());
        }
        this.columns[col].setOutlineLevel(level, collapsed);
        return this;
    }
    toData() {
        return {
            name: this.name,
            rows: this.rows.map(row => row.toData()),
            columns: this.columns.map(col => col.toData()),
            mergeCells: this.mergedCells,
            freezePane: this.freezePane,
            printOptions: this.printOptions
        };
    }
    static fromData(data) {
        const sheet = new Worksheet(data.name);
        sheet.rows = data.rows.map(rowData => Row.fromData(rowData));
        sheet.columns = (data.columns || []).map(colData => Column.fromData(colData));
        sheet.mergedCells = data.mergeCells || [];
        sheet.freezePane = data.freezePane;
        sheet.printOptions = data.printOptions;
        return sheet;
    }
}

class CSVWriter {
    static async write(workbook, _options) {
        const sheets = workbook['sheets'];
        const csvData = this.generateCSVData(sheets[0]); // Use first sheet for CSV
        return new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    }
    static generateCSVData(sheet) {
        const rows = sheet.getRows();
        const csvRows = [];
        rows.forEach((row) => {
            const rowData = [];
            row.getCells().forEach(cell => {
                const cellData = cell.toData();
                let value = '';
                if (cellData.value !== null && cellData.value !== undefined) {
                    if (cellData.type === 'date' && cellData.value instanceof Date) {
                        value = cellData.value.toISOString().split('T')[0];
                    }
                    else {
                        value = String(cellData.value);
                    }
                }
                // Escape quotes and wrap in quotes if contains comma or quote
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                rowData.push(value);
            });
            csvRows.push(rowData.join(','));
        });
        return csvRows.join('\n');
    }
}

class JSONWriter {
    static async write(workbook, _options) {
        const sheets = workbook['sheets'];
        const jsonData = this.generateJSONData(sheets[0]); // Use first sheet for JSON
        return new Blob([JSON.stringify(jsonData, null, 2)], {
            type: 'application/json;charset=utf-8;'
        });
    }
    static generateJSONData(sheet) {
        const rows = sheet.getRows();
        if (rows.length === 0)
            return [];
        // Assume first row contains headers
        const headers = rows[0].getCells().map((cell) => {
            const value = cell.toData().value;
            return value ? String(value) : `Column${headers.length + 1}`;
        });
        const data = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const rowData = {};
            row.getCells().forEach((cell, index) => {
                if (index < headers.length) {
                    const cellData = cell.toData();
                    let value = cellData.value;
                    if (cellData.type === 'date' && value instanceof Date) {
                        value = value.toISOString();
                    }
                    rowData[headers[index]] = value;
                }
            });
            data.push(rowData);
        }
        return data;
    }
}

class ExcelWriter {
    static async write(workbook, _options) {
        const data = this.generateExcelData(workbook);
        const buffer = this.createExcelFile(data);
        const uint8Buffer = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
        const arrayBuffer = uint8Buffer.slice().buffer;
        return new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    }
    static generateExcelData(workbook) {
        const sheets = workbook['sheets'];
        return {
            Sheets: sheets.reduce((acc, sheet, index) => {
                const sheetName = sheet.getName() || `Sheet${index + 1}`;
                acc[sheetName] = this.generateSheetData(sheet);
                return acc;
            }, {}),
            SheetNames: sheets.map((sheet, index) => sheet.getName() || `Sheet${index + 1}`)
        };
    }
    static generateSheetData(sheet) {
        const rows = sheet.getRows();
        const data = [];
        rows.forEach((row) => {
            const rowData = [];
            row.getCells().forEach((cell) => {
                const cellData = cell.toData();
                if (cellData.formula) {
                    rowData.push({ f: cellData.formula });
                }
                else if (cellData.type === 'date' &&
                    (typeof cellData.value === 'string' ||
                        typeof cellData.value === 'number' ||
                        cellData.value instanceof Date)) {
                    rowData.push(DateFormatter.toExcelDate(cellData.value));
                }
                else {
                    rowData.push(cellData.value);
                }
            });
            data.push(rowData);
        });
        return {
            '!ref': this.getSheetRange(data),
            '!rows': rows.map(row => ({
                hpt: row['height'],
                hidden: row['hidden'],
                outlineLevel: row['outlineLevel'],
                collapsed: row['collapsed']
            })),
            '!cols': sheet.getColumns().map(col => ({
                wch: col['width'],
                hidden: col['hidden'],
                outlineLevel: col['outlineLevel'],
                collapsed: col['collapsed']
            })),
            '!merges': sheet['mergeCells'],
            '!freeze': sheet['freezePane']
        };
    }
    static getSheetRange(data) {
        if (data.length === 0)
            return 'A1:A1';
        const lastRow = data.length;
        const lastCol = Math.max(...data.map(row => row.length));
        return `A1:${this.columnToLetter(lastCol)}${lastRow}`;
    }
    static columnToLetter(column) {
        let letters = '';
        while (column > 0) {
            const temp = (column - 1) % 26;
            letters = String.fromCharCode(temp + 65) + letters;
            column = (column - temp - 1) / 26;
        }
        return letters || 'A';
    }
    static createExcelFile(data) {
        // This is a simplified Excel file generator
        // In a real implementation, you'd generate proper XLSX binary format
        // For now, we'll return a simple XML-based structure
        const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
        const workbook = this.generateWorkbookXML(data);
        const encoder = new TextEncoder();
        return encoder.encode(xmlHeader + workbook);
    }
    static generateWorkbookXML(data) {
        let xml = '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">';
        xml += '<sheets>';
        data.SheetNames.forEach((name, index) => {
            xml += `<sheet name="${name}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`;
        });
        xml += '</sheets>';
        xml += '</workbook>';
        return xml;
    }
}

class Workbook {
    constructor(data) {
        this.sheets = [];
        this.properties = {};
        if (data) {
            this.fromData(data);
        }
    }
    addSheet(sheet) {
        this.sheets.push(sheet);
        return this;
    }
    createSheet(name) {
        const sheet = new Worksheet(name);
        this.sheets.push(sheet);
        return sheet;
    }
    getSheet(index) {
        return this.sheets[index];
    }
    getSheetByName(name) {
        return this.sheets.find(s => s.getName() === name);
    }
    removeSheet(index) {
        if (index >= 0 && index < this.sheets.length) {
            this.sheets.splice(index, 1);
            return true;
        }
        return false;
    }
    setProperty(key, value) {
        this.properties[key] = value;
        return this;
    }
    toData() {
        return {
            sheets: this.sheets.map(sheet => sheet.toData()),
            properties: this.properties
        };
    }
    fromData(data) {
        this.sheets = data.sheets.map(sheetData => Worksheet.fromData(sheetData));
        this.properties = data.properties || {};
    }
    async export(options = {}) {
        const { format = 'xlsx' } = options;
        switch (format) {
            case 'csv':
                return CSVWriter.write(this, options);
            case 'json':
                return JSONWriter.write(this, options);
            case 'xlsx':
            default:
                return ExcelWriter.write(this, options);
        }
    }
    download(options = {}) {
        const { filename = 'workbook.xlsx' } = options;
        this.export(options).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }
    static create() {
        return new Workbook();
    }
    static fromData(data) {
        return new Workbook(data);
    }
}

class StyleBuilder {
    constructor() {
        this.style = {};
    }
    bold(bold = true) {
        this.style.bold = bold;
        return this;
    }
    italic(italic = true) {
        this.style.italic = italic;
        return this;
    }
    underline(underline = true) {
        this.style.underline = underline;
        return this;
    }
    fontSize(size) {
        this.style.fontSize = size;
        return this;
    }
    fontFamily(family) {
        this.style.fontFamily = family;
        return this;
    }
    color(color) {
        this.style.color = color;
        return this;
    }
    backgroundColor(color) {
        this.style.backgroundColor = color;
        return this;
    }
    align(alignment) {
        this.style.alignment = alignment;
        return this;
    }
    verticalAlign(alignment) {
        this.style.verticalAlignment = alignment;
        return this;
    }
    wrapText(wrap = true) {
        this.style.wrapText = wrap;
        return this;
    }
    border(border) {
        this.style.border = border;
        return this;
    }
    borderTop(style = 'thin', color) {
        if (!this.style.border)
            this.style.border = {};
        this.style.border.top = { style, color };
        return this;
    }
    borderRight(style = 'thin', color) {
        if (!this.style.border)
            this.style.border = {};
        this.style.border.right = { style, color };
        return this;
    }
    borderBottom(style = 'thin', color) {
        if (!this.style.border)
            this.style.border = {};
        this.style.border.bottom = { style, color };
        return this;
    }
    borderLeft(style = 'thin', color) {
        if (!this.style.border)
            this.style.border = {};
        this.style.border.left = { style, color };
        return this;
    }
    borderAll(style = 'thin', color) {
        const borderStyle = { style, color };
        this.style.border = {
            top: borderStyle,
            bottom: borderStyle,
            left: borderStyle,
            right: borderStyle
        };
        return this;
    }
    numberFormat(format) {
        this.style.numberFormat = format;
        return this;
    }
    build() {
        return { ...this.style };
    }
    static create() {
        return new StyleBuilder();
    }
}

class ExportBuilder {
    constructor(sheetName = 'Sheet1') {
        this.workbook = new Workbook();
        this.currentSheet = new Worksheet(sheetName);
        this.workbook.addSheet(this.currentSheet);
    }
    addHeaderRow(headers, style) {
        const row = this.currentSheet.createRow();
        headers.forEach(header => {
            row.createCell(header, style);
        });
        return this;
    }
    addDataRows(data, fields) {
        data.forEach(item => {
            const row = this.currentSheet.createRow();
            if (fields && fields.length > 0) {
                fields.forEach(field => {
                    const value = this.getNestedValue(item, field);
                    row.createCell(value);
                });
            }
            else if (Array.isArray(item)) {
                item.forEach(value => row.createCell(value));
            }
            else if (typeof item === 'object') {
                Object.values(item).forEach(value => row.createCell(value));
            }
            else {
                row.createCell(item);
            }
        });
        return this;
    }
    addSection(config) {
        // Add section header
        const headerRow = this.currentSheet.createRow();
        headerRow.setOutlineLevel(config.level);
        const headerCell = headerRow.createCell(config.title);
        headerCell.setStyle(StyleBuilder.create()
            .bold(true)
            .backgroundColor('#E0E0E0')
            .build());
        // Add section data
        if (config.data && config.data.length > 0) {
            if (config.groupBy && config.subSections) {
                // Handle grouped data
                const groupedData = this.groupData(config.data, config.groupBy);
                Object.entries(groupedData).forEach(([key, items]) => {
                    const subHeaderRow = this.currentSheet.createRow();
                    subHeaderRow.setOutlineLevel(config.level + 1);
                    subHeaderRow.createCell(`${config.groupBy}: ${key}`);
                    items.forEach((item) => {
                        const dataRow = this.currentSheet.createRow();
                        dataRow.setOutlineLevel(config.level + 2);
                        if (config.fields) {
                            config.fields.forEach((field) => {
                                dataRow.createCell(this.getNestedValue(item, field));
                            });
                        }
                    });
                });
            }
            else {
                // Add data rows with outline level
                config.data.forEach((item) => {
                    const row = this.currentSheet.createRow();
                    row.setOutlineLevel(config.level + 1);
                    if (config.fields) {
                        config.fields.forEach((field) => {
                            row.createCell(this.getNestedValue(item, field));
                        });
                    }
                });
            }
        }
        return this;
    }
    addSections(sections) {
        sections.forEach(section => this.addSection(section));
        return this;
    }
    setColumnWidths(widths) {
        widths.forEach((width) => {
            this.currentSheet.createColumn(width);
        });
        return this;
    }
    autoSizeColumns() {
        const rows = this.currentSheet.getRows();
        const maxLengths = [];
        rows.forEach(row => {
            row.getCells().forEach((cell, index) => {
                const value = cell.toData().value;
                const length = value ? String(value).length : 0;
                if (!maxLengths[index] || length > maxLengths[index]) {
                    maxLengths[index] = Math.min(length, 50); // Cap at 50 characters
                }
            });
        });
        maxLengths.forEach((length) => {
            this.currentSheet.createColumn(Math.max(length, 10)); // Minimum width 10
        });
        return this;
    }
    addStyle(style) {
        // Apply style to last row
        const rows = this.currentSheet.getRows();
        if (rows.length > 0) {
            const lastRow = rows[rows.length - 1];
            lastRow.getCells().forEach(cell => {
                cell.setStyle(style);
            });
        }
        return this;
    }
    groupData(data, field) {
        return data.reduce((groups, item) => {
            const key = this.getNestedValue(item, field);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }
    build() {
        return this.workbook;
    }
    async export(options) {
        return this.workbook.export(options);
    }
    download(options = {}) {
        const filename = options.filename || 'export.xlsx';
        const format = options.format || (filename.endsWith('.csv') ? 'csv' :
            filename.endsWith('.json') ? 'json' :
                'xlsx');
        let writer;
        if (format === 'xlsx')
            writer = ExcelWriter;
        else if (format === 'csv')
            writer = CSVWriter;
        else if (format === 'json')
            writer = JSONWriter;
        else
            throw new Error('Unsupported format');
        writer.write(this.workbook, options).then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        });
    }
    static create(sheetName) {
        return new ExportBuilder(sheetName);
    }
}

/**
 * SheetBuilder provides a fluent API for building Excel worksheets
 */
class SheetBuilder {
    /**
     * Create a new SheetBuilder instance
     * @param name Worksheet name
     */
    constructor(name = 'Sheet1') {
        this.currentRow = 0;
        this.worksheet = new Worksheet(name);
    }
    /**
     * Get the underlying worksheet
     */
    getWorksheet() {
        return this.worksheet;
    }
    /**
     * Set the worksheet name
     */
    setName(name) {
        this.worksheet.setName(name);
        return this;
    }
    /**
     * Add a header row with styling
     * @param headers Array of header text
     * @param style Optional style for all headers
     */
    addHeaderRow(headers, style) {
        const row = this.createRow();
        headers.forEach((header) => {
            const cellStyle = style || StyleBuilder.create()
                .bold(true)
                .backgroundColor('#F0F0F0')
                .borderAll('thin')
                .align('center')
                .build();
            row.createCell(header, cellStyle);
        });
        return this;
    }
    /**
     * Add a title row
     * @param title Title text
     * @param colSpan Number of columns to span
     */
    addTitle(title, colSpan = 1) {
        const row = this.createRow();
        const cell = row.createCell(title);
        cell.setStyle(StyleBuilder.create()
            .bold(true)
            .fontSize(14)
            .align('center')
            .build());
        if (colSpan > 1) {
            this.mergeCells(this.currentRow - 1, 0, this.currentRow - 1, colSpan - 1);
        }
        return this;
    }
    /**
     * Add a subtitle row
     * @param subtitle Subtitle text
     * @param colSpan Number of columns to span
     */
    addSubtitle(subtitle, colSpan = 1) {
        const row = this.createRow();
        const cell = row.createCell(subtitle);
        cell.setStyle(StyleBuilder.create()
            .italic(true)
            .color('#666666')
            .align('center')
            .build());
        if (colSpan > 1) {
            this.mergeCells(this.currentRow - 1, 0, this.currentRow - 1, colSpan - 1);
        }
        return this;
    }
    /**
     * Add a row of data
     * @param data Array of cell values
     * @param styles Optional array of styles per cell
     */
    addRow(data, styles) {
        const row = this.createRow();
        data.forEach((value, index) => {
            const style = styles && styles[index] ? styles[index] : undefined;
            row.createCell(value, style);
        });
        return this;
    }
    /**
     * Add multiple rows of data
     * @param rows Array of row data
     * @param styles Optional array of styles per row or per cell
     */
    addRows(rows, styles) {
        rows.forEach((rowData, rowIndex) => {
            const rowStyles = styles && styles[rowIndex];
            if (Array.isArray(rowStyles)) {
                this.addRow(rowData, rowStyles);
            }
            else {
                this.addRow(rowData, rowStyles ? [rowStyles] : undefined);
            }
        });
        return this;
    }
    /**
     * Add data from objects
     * @param data Array of objects
     * @param fields Fields to extract (keys or dot notation paths)
     * @param headers Optional header labels
     */
    addObjects(data, fields, headers) {
        // Add headers if provided
        if (headers) {
            this.addHeaderRow(headers);
        }
        // Add data rows
        data.forEach(item => {
            const rowData = fields.map(field => this.getNestedValue(item, field));
            this.addRow(rowData);
        });
        return this;
    }
    /**
     * Add a section with header and data
     * @param title Section title
     * @param data Section data
     * @param fields Fields to display
     * @param level Outline level
     */
    addSection(title, data, fields, level = 0) {
        // Add section header
        const headerRow = this.createRow();
        headerRow.setOutlineLevel(level);
        const headerCell = headerRow.createCell(title);
        headerCell.setStyle(StyleBuilder.create()
            .bold(true)
            .fontSize(12)
            .backgroundColor('#E0E0E0')
            .borderAll('thin')
            .build());
        // Merge header across all columns
        if (fields.length > 1) {
            this.mergeCells(this.currentRow - 1, 0, this.currentRow - 1, fields.length - 1);
        }
        // Add field headers
        const fieldRow = this.createRow();
        fieldRow.setOutlineLevel(level + 1);
        fields.forEach(field => {
            fieldRow.createCell(this.formatFieldName(field), StyleBuilder.create()
                .bold(true)
                .backgroundColor('#F5F5F5')
                .borderAll('thin')
                .build());
        });
        // Add data rows
        data.forEach(item => {
            const row = this.createRow();
            row.setOutlineLevel(level + 2);
            fields.forEach(field => {
                const value = this.getNestedValue(item, field);
                row.createCell(value);
            });
        });
        return this;
    }
    /**
     * Add grouped data with sub-sections
     * @param data Data to group
     * @param groupBy Field to group by
     * @param fields Fields to display
     * @param level Outline level
     */
    addGroupedData(data, groupBy, fields, level = 0) {
        const groups = this.groupData(data, groupBy);
        Object.entries(groups).forEach(([key, items]) => {
            // Add group header
            const groupRow = this.createRow();
            groupRow.setOutlineLevel(level);
            const groupCell = groupRow.createCell(`${groupBy}: ${key}`);
            groupCell.setStyle(StyleBuilder.create()
                .bold(true)
                .backgroundColor('#E8E8E8')
                .build());
            if (fields.length > 1) {
                this.mergeCells(this.currentRow - 1, 0, this.currentRow - 1, fields.length - 1);
            }
            // Add field headers
            const fieldRow = this.createRow();
            fieldRow.setOutlineLevel(level + 1);
            fields.forEach(field => {
                fieldRow.createCell(this.formatFieldName(field), StyleBuilder.create()
                    .bold(true)
                    .backgroundColor('#F5F5F5')
                    .build());
            });
            // Add items
            items.forEach((item) => {
                const row = this.createRow();
                row.setOutlineLevel(level + 2);
                fields.forEach(field => {
                    const value = this.getNestedValue(item, field);
                    row.createCell(value);
                });
            });
            // Add group summary
            this.addGroupSummary(items, fields, level + 1);
        });
        return this;
    }
    /**
     * Add summary row for a group
     */
    addGroupSummary(items, fields, level) {
        const summaryRow = this.createRow();
        summaryRow.setOutlineLevel(level + 1);
        // Create summary cells
        fields.forEach((_, index) => {
            if (index === 0) {
                summaryRow.createCell('Group Summary', StyleBuilder.create()
                    .italic(true)
                    .bold(true)
                    .build());
            }
            else {
                const numericValues = items
                    .map(item => this.getNestedValue(item, fields[index]))
                    .filter(val => typeof val === 'number');
                if (numericValues.length > 0) {
                    const sum = numericValues.reduce((a, b) => a + b, 0);
                    summaryRow.createCell(sum, StyleBuilder.create()
                        .bold(true)
                        .numberFormat('#,##0.00')
                        .build());
                }
                else {
                    summaryRow.createCell('');
                }
            }
        });
        return this;
    }
    /**
     * Add a summary row with totals
     * @param fields Fields to summarize
     * @param functions Summary functions (sum, average, count, min, max)
     * @param label Summary label
     */
    addSummaryRow(fields, functions, label = 'Total') {
        const row = this.createRow();
        fields.forEach((_, index) => {
            if (index === 0) {
                row.createCell(label, StyleBuilder.create()
                    .bold(true)
                    .borderTop('double')
                    .build());
            }
            else {
                const function_ = functions[index - 1] || 'sum';
                row.createCell(`=${function_.toUpperCase()}(${this.getColumnRange(index)})`, StyleBuilder.create()
                    .bold(true)
                    .borderTop('double')
                    .numberFormat('#,##0.00')
                    .build());
            }
        });
        return this;
    }
    /**
     * Set column widths
     * @param widths Array of column widths
     */
    setColumnWidths(widths) {
        widths.forEach((width, index) => {
            const column = this.getOrCreateColumn(index);
            column.setWidth(width);
        });
        return this;
    }
    /**
     * Auto-size columns based on content
     * @param maxWidth Maximum width in characters
     */
    autoSizeColumns(maxWidth = 50) {
        const rows = this.worksheet.getRows();
        const columnWidths = new Map();
        rows.forEach(row => {
            row.getCells().forEach((cell, index) => {
                const cellData = cell.toData();
                const value = cellData.value;
                const length = value ? String(value).length : 0;
                const currentMax = columnWidths.get(index) || 0;
                columnWidths.set(index, Math.min(Math.max(length, currentMax), maxWidth));
            });
        });
        columnWidths.forEach((width, index) => {
            const column = this.getOrCreateColumn(index);
            column.setWidth(Math.max(width + 2, 8)); // Add padding, minimum 8
        });
        return this;
    }
    /**
     * Set column to auto-fit
     * @param colIndex Column index
     */
    setColumnAutoFit(colIndex) {
        const column = this.getOrCreateColumn(colIndex);
        // Auto-fit will be applied during export
        column.setWidth(0); // 0 indicates auto-fit
        return this;
    }
    /**
     * Hide a column
     * @param colIndex Column index
     */
    hideColumn(colIndex) {
        const column = this.getOrCreateColumn(colIndex);
        column.setHidden(true);
        return this;
    }
    /**
     * Hide a row
     * @param rowIndex Row index
     */
    hideRow(rowIndex) {
        const row = this.worksheet.getRow(rowIndex);
        if (row) {
            row.setHidden(true);
        }
        return this;
    }
    /**
     * Set outline level for a row
     * @param rowIndex Row index
     * @param level Outline level (0-7)
     * @param collapsed Whether the outline is collapsed
     */
    setRowOutlineLevel(rowIndex, level, collapsed = false) {
        const row = this.worksheet.getRow(rowIndex);
        if (row) {
            row.setOutlineLevel(level, collapsed);
        }
        return this;
    }
    /**
     * Set outline level for a column
     * @param colIndex Column index
     * @param level Outline level (0-7)
     * @param collapsed Whether the outline is collapsed
     */
    setColumnOutlineLevel(colIndex, level, collapsed = false) {
        const column = this.getOrCreateColumn(colIndex);
        column.setOutlineLevel(level, collapsed);
        return this;
    }
    /**
     * Create an outline group for rows
     * @param startRow Start row index
     * @param endRow End row index
     * @param level Outline level
     * @param collapsed Whether the group is collapsed
     */
    groupRows(startRow, endRow, level = 1, collapsed = false) {
        for (let i = startRow; i <= endRow; i++) {
            const row = this.worksheet.getRow(i);
            if (row) {
                row.setOutlineLevel(level, collapsed && i === startRow);
            }
        }
        return this;
    }
    /**
     * Create an outline group for columns
     * @param startCol Start column index
     * @param endCol End column index
     * @param level Outline level
     * @param collapsed Whether the group is collapsed
     */
    groupColumns(startCol, endCol, level = 1, collapsed = false) {
        for (let i = startCol; i <= endCol; i++) {
            const column = this.getOrCreateColumn(i);
            column.setOutlineLevel(level, collapsed && i === startCol);
        }
        return this;
    }
    /**
     * Merge cells
     * @param startRow Start row
     * @param startCol Start column
     * @param endRow End row
     * @param endCol End column
     */
    mergeCells(startRow, startCol, endRow, endCol) {
        this.worksheet.mergeCells(startRow, startCol, endRow, endCol);
        return this;
    }
    /**
     * Freeze panes
     * @param rows Number of rows to freeze
     * @param columns Number of columns to freeze
     */
    freezePanes(rows = 0, columns = 0) {
        this.worksheet.setFreezePane(rows, columns);
        return this;
    }
    /**
     * Set print options
     * @param options Print options
     */
    setPrintOptions(options) {
        this.worksheet.setPrintOptions(options);
        return this;
    }
    /**
     * Set header and footer
     * @param headerFooter Header/footer configuration
     */
    setHeaderFooter(headerFooter) {
        // Store in worksheet (would be implemented in worksheet class)
        this.worksheet.headerFooter = headerFooter;
        return this;
    }
    /**
     * Add auto-filter
     * @param startRow Start row
     * @param startCol Start column
     * @param endRow End row
     * @param endCol End column
     */
    addAutoFilter(startRow, startCol, endRow, endCol) {
        const range = `${this.columnToLetter(startCol)}${startRow + 1}:${this.columnToLetter(endCol)}${endRow + 1}`;
        this.worksheet.autoFilter = { range };
        return this;
    }
    /**
     * Add a table
     * @param config Table configuration
     */
    addTable(config) {
        if (!this.worksheet.tables) {
            this.worksheet.tables = [];
        }
        this.worksheet.tables.push(config);
        return this;
    }
    /**
     * Add data validation to a cell or range
     * @param range Cell range (e.g., 'A1:B10')
     * @param validation Data validation rules
     */
    addDataValidation(range, validation) {
        if (!this.worksheet.dataValidations) {
            this.worksheet.dataValidations = {};
        }
        this.worksheet.dataValidations[range] = validation;
        return this;
    }
    /**
     * Add conditional formatting
     * @param range Cell range
     * @param rules Conditional formatting rules
     */
    addConditionalFormatting(range, rules) {
        if (!this.worksheet.conditionalFormats) {
            this.worksheet.conditionalFormats = {};
        }
        this.worksheet.conditionalFormats[range] = rules;
        return this;
    }
    /**
     * Add a chart
     * @param config Chart configuration
     */
    addChart(config) {
        if (!this.worksheet.charts) {
            this.worksheet.charts = [];
        }
        this.worksheet.charts.push(config);
        return this;
    }
    /**
     * Add an image or drawing
     * @param drawing Drawing configuration
     */
    addDrawing(drawing) {
        if (!this.worksheet.drawings) {
            this.worksheet.drawings = [];
        }
        this.worksheet.drawings.push(drawing);
        return this;
    }
    /**
     * Set cell value with style
     * @param row Row index
     * @param col Column index
     * @param value Cell value
     * @param style Cell style
     */
    setCell(row, col, value, style) {
        this.worksheet.setCell(row, col, value, style);
        return this;
    }
    /**
     * Get cell value
     * @param row Row index
     * @param col Column index
     */
    getCell(row, col) {
        return this.worksheet.getCell(row, col);
    }
    /**
     * Add a comment to a cell
     * @param row Row index
     * @param col Column index
     * @param comment Comment text
     * @param author Comment author
     */
    addComment(row, col, comment, author) {
        const cell = this.worksheet.getCell(row, col);
        if (cell) {
            // Would need to extend Cell class to support comments
            cell.comment = { text: comment, author };
        }
        return this;
    }
    /**
     * Add a hyperlink to a cell
     * @param row Row index
     * @param col Column index
     * @param url Hyperlink URL
     * @param displayText Display text (optional)
     */
    addHyperlink(row, col, url, displayText) {
        this.worksheet.setCell(row, col, displayText || url);
        const cell = this.worksheet.getCell(row, col);
        if (cell) {
            cell.hyperlink = url;
        }
        return this;
    }
    /**
     * Apply a style to a range
     * @param startRow Start row
     * @param startCol Start column
     * @param endRow End row
     * @param endCol End column
     * @param style Style to apply
     */
    applyStyleToRange(startRow, startCol, endRow, endCol, style) {
        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                const cell = this.worksheet.getCell(r, c);
                if (cell) {
                    // Would need to update cell style
                    cell.style = { ...cell.style, ...style };
                }
            }
        }
        return this;
    }
    /**
     * Insert a blank row
     * @param count Number of blank rows to insert
     */
    insertBlankRows(count = 1) {
        for (let i = 0; i < count; i++) {
            this.createRow();
        }
        return this;
    }
    /**
     * Create a new row
     */
    createRow() {
        const row = this.worksheet.createRow();
        this.currentRow++;
        return row;
    }
    /**
     * Get or create a column
     */
    getOrCreateColumn(index) {
        let column = this.worksheet.getColumn(index);
        if (!column) {
            column = this.worksheet.createColumn();
        }
        return column;
    }
    /**
     * Get nested value from object using dot notation
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }
    /**
     * Format field name for display
     */
    formatFieldName(field) {
        return field
            .split('.')
            .pop()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    /**
     * Group data by field
     */
    groupData(data, field) {
        return data.reduce((groups, item) => {
            const key = this.getNestedValue(item, field);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }
    /**
     * Convert column index to letter (A, B, C, ...)
     */
    columnToLetter(column) {
        let letters = '';
        while (column >= 0) {
            letters = String.fromCharCode((column % 26) + 65) + letters;
            column = Math.floor(column / 26) - 1;
        }
        return letters;
    }
    /**
     * Get column range for formula (e.g., A:A)
     */
    getColumnRange(colIndex) {
        const colLetter = this.columnToLetter(colIndex);
        return `${colLetter}:${colLetter}`;
    }
    /**
     * Build and return the worksheet
     */
    build() {
        return this.worksheet;
    }
    /**
     * Reset the builder
     */
    reset() {
        this.worksheet = new Worksheet(this.worksheet.getName());
        this.currentRow = 0;
        return this;
    }
    /**
     * Create a new SheetBuilder instance
     */
    static create(name) {
        return new SheetBuilder(name);
    }
    /**
     * Create from existing worksheet
     */
    static fromWorksheet(worksheet) {
        const builder = new SheetBuilder(worksheet.getName());
        builder.worksheet = worksheet;
        return builder;
    }
}

/**
 * Builder class for creating collapsible sections in worksheets
 * Supports nested sections, grouping, summaries, and conditional styling
 */
class SectionBuilder {
    constructor(worksheet) {
        this.currentRow = 0;
        this.sections = new Map();
        this.styles = new Map();
        this.formatters = new Map();
        this.conditionalFormats = [];
        this.worksheet = worksheet;
    }
    /**
     * Add a section to the worksheet
     */
    addSection(config) {
        const section = new Section(this.worksheet, config, this.currentRow);
        if (config.title !== undefined) {
            this.sections.set(config.title, section);
        }
        // Build the section
        this.currentRow = section.build();
        return this;
    }
    /**
     * Add multiple sections at once
     */
    addSections(configs) {
        configs.forEach(config => this.addSection(config));
        return this;
    }
    /**
     * Add a nested section (child of current section)
     */
    addNestedSection(parentTitle, config) {
        const parent = this.sections.get(parentTitle);
        if (parent) {
            parent.addSubSection(config);
        }
        return this;
    }
    /**
     * Create a section from data with automatic grouping
     */
    createFromData(data, options) {
        const { title, groupBy, fields = Object.keys(data[0] || {}), fieldLabels = {}, level = 0, collapsed = false, summary } = options;
        // If no grouping, create a simple section
        if (!groupBy) {
            return this.addSection({
                title,
                level,
                collapsed,
                data,
                fields: fields,
                fieldLabels,
                summary: summary ? {
                    fields: summary.fields,
                    function: summary.functions[0] || 'count',
                    label: 'Total'
                } : undefined
            });
        }
        // Group the data
        const groups = this.groupData(data, groupBy);
        // Create main section with groups as subsections
        const sectionConfig = {
            title,
            level,
            collapsed,
            data: [],
            subSections: Object.entries(groups).map(([key, items]) => ({
                title: `${String(groupBy)}: ${key}`,
                level: level + 1,
                collapsed: true,
                data: items,
                fields: fields,
                fieldLabels,
                summary: summary ? {
                    fields: summary.fields,
                    function: summary.functions[0] || 'count',
                    label: `Total for ${key}`
                } : undefined
            }))
        };
        return this.addSection(sectionConfig);
    }
    /**
     * Add a summary section (totals, averages, etc.)
     */
    addSummarySection(data, fields, functions, options) {
        const { level = 0, style, showPercentage = false, label = 'Summary' } = options || {};
        // Calculate summary values
        const summary = {};
        fields.forEach((field, index) => {
            const func = functions[index] || functions[0];
            const values = data.map(item => this.getNestedValue(item, field)).filter(v => v != null);
            switch (func) {
                case 'sum':
                    summary[field] = values.reduce((a, b) => a + b, 0);
                    break;
                case 'average':
                    summary[field] = values.reduce((a, b) => a + b, 0) / values.length;
                    break;
                case 'count':
                    summary[field] = values.length;
                    break;
                case 'min':
                    summary[field] = Math.min(...values);
                    break;
                case 'max':
                    summary[field] = Math.max(...values);
                    break;
            }
            // Add percentage if requested
            if (showPercentage && func === 'count') {
                const total = data.length;
                summary[`${field}_percentage`] = ((summary[field] / total) * 100).toFixed(1) + '%';
            }
        });
        // Add the summary row
        const summaryRow = this.worksheet.createRow();
        summaryRow.setOutlineLevel(level + 1);
        // Add label cell
        const labelCell = summaryRow.createCell(`${label}:`);
        labelCell.setStyle(StyleBuilder.create()
            .bold(true)
            .italic(true)
            .backgroundColor('#f0f0f0')
            .build());
        // Add summary values
        fields.forEach(field => {
            const value = summary[field];
            const cell = summaryRow.createCell(value);
            if (style) {
                cell.setStyle(style);
            }
            else {
                cell.setStyle(StyleBuilder.create()
                    .bold(true)
                    .numberFormat(functions[0] === 'count' ? '#,##0' : '#,##0.00')
                    .build());
            }
        });
        return this;
    }
    /**
     * Add a hierarchical section (tree structure)
     */
    addHierarchicalSection(items, childrenAccessor, options) {
        const { title = 'Hierarchy', level = 0, fields, collapsed = true, showCount = true } = options || {};
        const buildHierarchy = (items, currentLevel) => {
            return items.map(item => {
                const children = childrenAccessor(item);
                const hasChildren = children && children.length > 0;
                // Get display value for title
                const titleField = (fields === null || fields === void 0 ? void 0 : fields[0]) || 'name';
                const titleValue = this.getNestedValue(item, titleField);
                const count = hasChildren ? ` (${children.length})` : '';
                return {
                    title: `${titleValue}${showCount && hasChildren ? count : ''}`,
                    level: currentLevel,
                    collapsed,
                    data: [item],
                    fields: fields,
                    subSections: hasChildren ? buildHierarchy(children, currentLevel + 1) : undefined
                };
            });
        };
        const hierarchySections = buildHierarchy(items, level + 1);
        return this.addSection({
            title: title,
            level,
            collapsed,
            data: [],
            subSections: hierarchySections
        });
    }
    /**
     * Add a pivot-like section with multiple dimensions
     */
    addPivotSection(data, dimensions, options) {
        const { level = 0, showGrandTotals = true, showSubTotals = true } = options || {};
        // Group by row dimensions
        const rowGroups = this.groupMultiLevel(data, dimensions.rows);
        // Create sections for each row group
        Object.entries(rowGroups).forEach(([rowKey, rowItems]) => {
            const rowSection = {
                title: rowKey,
                level: level + 1,
                collapsed: true,
                data: [],
                subSections: []
            };
            // Group by column dimensions within each row
            if (dimensions.columns.length > 0) {
                const colGroups = this.groupMultiLevel(rowItems, dimensions.columns);
                Object.entries(colGroups).forEach(([colKey, colItems]) => {
                    // Calculate values for this cell
                    const values = {};
                    dimensions.values.forEach(v => {
                        const nums = colItems.map(item => item[v.field]).filter((n) => !isNaN(n));
                        switch (v.aggregate) {
                            case 'sum':
                                values[v.field] = nums.reduce((a, b) => a + b, 0);
                                break;
                            case 'average':
                                values[v.field] = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
                                break;
                            case 'count':
                                values[v.field] = colItems.length;
                                break;
                            case 'min':
                                values[v.field] = Math.min(...nums);
                                break;
                            case 'max':
                                values[v.field] = Math.max(...nums);
                                break;
                        }
                    });
                    rowSection.subSections.push({
                        title: colKey,
                        level: level + 2,
                        data: [values],
                        fields: dimensions.values.map(v => v.field)
                    });
                });
                // Add row subtotal
                if (showSubTotals) {
                    const subtotalValues = {};
                    dimensions.values.forEach(v => {
                        const nums = rowItems.map(item => item[v.field]).filter((n) => !isNaN(n));
                        switch (v.aggregate) {
                            case 'sum':
                                subtotalValues[v.field] = nums.reduce((a, b) => a + b, 0);
                                break;
                            case 'average':
                                subtotalValues[v.field] = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
                                break;
                            case 'count':
                                subtotalValues[v.field] = rowItems.length;
                                break;
                            case 'min':
                                subtotalValues[v.field] = Math.min(...nums);
                                break;
                            case 'max':
                                subtotalValues[v.field] = Math.max(...nums);
                                break;
                        }
                    });
                    rowSection.subSections.push({
                        title: `${rowKey} Subtotal`,
                        level: level + 2,
                        data: [subtotalValues],
                        fields: dimensions.values.map(v => v.field)
                    });
                }
            }
            this.addSection(rowSection);
        });
        // Add grand total
        if (showGrandTotals) {
            const grandTotalValues = {};
            dimensions.values.forEach(v => {
                const nums = data.map(item => item[v.field]).filter((n) => !isNaN(n));
                switch (v.aggregate) {
                    case 'sum':
                        grandTotalValues[v.field] = nums.reduce((a, b) => a + b, 0);
                        break;
                    case 'average':
                        grandTotalValues[v.field] = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
                        break;
                    case 'count':
                        grandTotalValues[v.field] = data.length;
                        break;
                    case 'min':
                        grandTotalValues[v.field] = Math.min(...nums);
                        break;
                    case 'max':
                        grandTotalValues[v.field] = Math.max(...nums);
                        break;
                }
            });
            this.addSection({
                title: 'Grand Total',
                level,
                data: [grandTotalValues],
                fields: dimensions.values.map(v => v.field)
            });
        }
        return this;
    }
    /**
     * Add a timeline section (grouped by date periods)
     */
    addTimelineSection(data, dateField, period, options) {
        const { fields, level = 0, showTrends = true, format } = options || {};
        // Group by date period
        const grouped = this.groupByDate(data, dateField, period, format);
        // Create sections for each period
        Object.entries(grouped).forEach(([periodKey, periodData]) => {
            const section = {
                title: periodKey,
                level: level + 1,
                collapsed: true,
                data: periodData,
                fields
            };
            // Add trend indicators if requested
            if (showTrends && periodData.length > 0) {
                const prevPeriod = this.getPreviousPeriod(periodKey, grouped);
                if (prevPeriod) {
                    const trend = this.calculateTrend(periodData, prevPeriod, (fields === null || fields === void 0 ? void 0 : fields[0]) || 'value');
                    section.summary = {
                        fields: [(fields === null || fields === void 0 ? void 0 : fields[0]) || 'value'],
                        function: 'sum',
                        label: `Trend: ${trend > 0 ? '↑' : '↓'} ${Math.abs(trend).toFixed(1)}%`
                    };
                }
            }
            this.addSection(section);
        });
        return this;
    }
    /**
     * Add a filtered section
     */
    addFilteredSection(config, filters) {
        const filteredData = this.applyFilters(config.data, filters);
        return this.addSection({
            ...config,
            data: filteredData,
            title: `${config.title} (Filtered)`
        });
    }
    /**
     * Add conditional formatting to the current section
     */
    addConditionalFormat(rule) {
        this.conditionalFormats.push(rule);
        return this;
    }
    /**
     * Add a custom formatter for a field
     */
    addFormatter(field, formatter) {
        this.formatters.set(field, formatter);
        return this;
    }
    /**
     * Register a reusable style
     */
    registerStyle(name, style) {
        this.styles.set(name, style);
        return this;
    }
    /**
     * Apply a registered style
     */
    applyStyle(styleName) {
        const style = this.styles.get(styleName);
        if (style) {
            const lastRow = this.worksheet.getRows().slice(-1)[0];
            if (lastRow) {
                lastRow.getCells().forEach(cell => cell.setStyle(style));
            }
        }
        return this;
    }
    /**
     * Get the current row count
     */
    getCurrentRow() {
        return this.currentRow;
    }
    /**
     * Reset the builder
     */
    reset() {
        this.currentRow = 0;
        this.sections.clear();
        return this;
    }
    // Private helper methods
    groupData(data, groupBy) {
        return data.reduce((groups, item) => {
            const key = typeof groupBy === 'function'
                ? groupBy(item)
                : String(item[groupBy]);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }
    groupMultiLevel(data, dimensions) {
        return data.reduce((groups, item) => {
            const key = dimensions.map(dim => this.getNestedValue(item, dim)).join(' › ');
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }
    groupByDate(data, dateField, period, format) {
        return data.reduce((groups, item) => {
            const date = new Date(this.getNestedValue(item, dateField));
            let key;
            switch (period) {
                case 'day':
                    key = format || date.toISOString().split('T')[0];
                    break;
                case 'week': {
                    const week = this.getWeekNumber(date);
                    key = format || `${date.getFullYear()}-W${week}`;
                    break;
                }
                case 'month':
                    key = format || `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    break;
                case 'quarter': {
                    const quarter = Math.floor(date.getMonth() / 3) + 1;
                    key = format || `${date.getFullYear()}-Q${quarter}`;
                    break;
                }
                case 'year':
                    key = format || String(date.getFullYear());
                    break;
            }
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    }
    getPreviousPeriod(currentKey, groups) {
        const keys = Object.keys(groups).sort();
        const currentIndex = keys.indexOf(currentKey);
        if (currentIndex > 0) {
            return groups[keys[currentIndex - 1]];
        }
        return null;
    }
    calculateTrend(current, previous, field) {
        const currentSum = current.reduce((sum, item) => sum + (item[field] || 0), 0);
        const previousSum = previous.reduce((sum, item) => sum + (item[field] || 0), 0);
        if (previousSum === 0)
            return 0;
        return ((currentSum - previousSum) / previousSum) * 100;
    }
    applyFilters(data, filters) {
        return data.filter(item => {
            // Date range filter
            if (filters.dateRange) {
                const dateValue = new Date(this.getNestedValue(item, filters.dateRange.field || 'date'));
                const start = new Date(filters.dateRange.start);
                const end = new Date(filters.dateRange.end);
                if (dateValue < start || dateValue > end) {
                    return false;
                }
            }
            // Field filters
            if (filters.filters) {
                for (const [field, values] of Object.entries(filters.filters)) {
                    const itemValue = this.getNestedValue(item, field);
                    const arrValues = values;
                    if (arrValues.length > 0 && !arrValues.includes(itemValue)) {
                        return false;
                    }
                }
            }
            // Search filter
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                const matches = Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm));
                if (!matches)
                    return false;
            }
            // Custom filter
            if (filters.customFilter && !filters.customFilter(item)) {
                return false;
            }
            return true;
        }).slice(filters.offset || 0, (filters.offset || 0) + (filters.limit || Infinity));
    }
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }
}
/**
 * Internal Section class for building collapsible sections
 */
class Section {
    constructor(worksheet, config, startRow) {
        this.subSections = [];
        this.worksheet = worksheet;
        this.config = config;
        this.startRow = startRow;
    }
    /**
     * Build the section in the worksheet
     */
    build() {
        let currentRow = this.startRow;
        // Add section header
        if (this.config.title) {
            const headerRow = this.worksheet.createRow();
            headerRow.setOutlineLevel(this.config.level);
            const headerCell = headerRow.createCell(this.config.title);
            // Apply header style
            const headerStyle = this.config.headerStyle ||
                StyleBuilder.create()
                    .bold(true)
                    .fontSize(12)
                    .backgroundColor(this.getHeaderColor(this.config.level))
                    .borderAll('thin')
                    .build();
            headerCell.setStyle(headerStyle);
            // Add collapse/expand indicator if section has data or subsections
            if (this.hasContent()) {
                const indicatorCell = headerRow.createCell(this.config.collapsed ? '▶' : '▼');
                indicatorCell.setStyle(StyleBuilder.create()
                    .bold(true)
                    .color('#666666')
                    .build());
            }
            currentRow++;
        }
        // Add section data if not collapsed
        if (!this.config.collapsed && this.config.data.length > 0) {
            // Add headers if fields are specified
            if (this.config.fields && this.config.fields.length > 0) {
                const headerRow = this.worksheet.createRow();
                headerRow.setOutlineLevel(this.config.level + 1);
                this.config.fields.forEach((field) => {
                    var _a;
                    const label = ((_a = this.config.fieldLabels) === null || _a === void 0 ? void 0 : _a[field]) || field;
                    const cell = headerRow.createCell(label);
                    cell.setStyle(StyleBuilder.create()
                        .bold(true)
                        .backgroundColor('#e6e6e6')
                        .borderAll('thin')
                        .build());
                });
                currentRow++;
            }
            // Add data rows
            this.config.data.forEach((item) => {
                const dataRow = this.worksheet.createRow();
                dataRow.setOutlineLevel(this.config.level + 1);
                const fields = this.config.fields || Object.keys(item);
                fields.forEach((field) => {
                    const value = this.getNestedValue(item, field);
                    const cell = dataRow.createCell(value);
                    // Apply conditional formatting if any
                    if (this.config.conditionalStyles) {
                        this.applyConditionalStyles(cell, item, field);
                    }
                    // Apply field-specific style
                    if (this.config.style) {
                        cell.setStyle(this.config.style);
                    }
                });
                currentRow++;
            });
            // Add summary row if configured
            if (this.config.summary) {
                this.addSummaryRow();
                currentRow++;
            }
        }
        // Build sub-sections
        if (this.config.subSections && !this.config.collapsed) {
            this.config.subSections.forEach((subConfig) => {
                const subSection = new Section(this.worksheet, subConfig, currentRow);
                this.subSections.push(subSection);
                currentRow = subSection.build();
            });
        }
        return currentRow;
    }
    /**
     * Add a sub-section
     */
    addSubSection(config) {
        if (!this.config.subSections) {
            this.config.subSections = [];
        }
        this.config.subSections.push(config);
    }
    /**
     * Check if section has any content
     */
    hasContent() {
        return this.config.data.length > 0 ||
            (this.config.subSections && this.config.subSections.length > 0);
    }
    /**
     * Get header color based on outline level
     */
    getHeaderColor(level) {
        const colors = [
            '#e6f2ff', // Level 0 - Light blue
            '#f0f0f0', // Level 1 - Light gray
            '#f9f9f9', // Level 2 - Lighter gray
            '#ffffff', // Level 3+ - White
        ];
        return colors[Math.min(level, colors.length - 1)];
    }
    /**
     * Add summary row (totals, averages, etc.)
     */
    addSummaryRow() {
        if (!this.config.summary)
            return;
        const summaryRow = this.worksheet.createRow();
        summaryRow.setOutlineLevel(this.config.level + 2);
        // Add label cell
        const labelCell = summaryRow.createCell(this.config.summary.label || 'Total');
        labelCell.setStyle(StyleBuilder.create()
            .bold(true)
            .italic(true)
            .backgroundColor('#f5f5f5')
            .build());
        // Calculate and add summary values
        const fields = this.config.fields || [];
        fields.forEach((field) => {
            if (this.config.summary.fields.includes(field)) {
                const values = this.config.data
                    .map((item) => this.getNestedValue(item, field))
                    .filter((v) => v != null && !isNaN(v));
                let result;
                switch (this.config.summary.function) {
                    case 'sum':
                        result = values.reduce((a, b) => a + b, 0);
                        break;
                    case 'average':
                        result = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
                        break;
                    case 'count':
                        result = values.length;
                        break;
                    case 'min':
                        result = Math.min(...values);
                        break;
                    case 'max':
                        result = Math.max(...values);
                        break;
                    default:
                        result = 0;
                }
                const cell = summaryRow.createCell(result);
                cell.setStyle(StyleBuilder.create()
                    .bold(true)
                    .numberFormat(this.config.summary.function === 'count' ? '#,##0' : '#,##0.00')
                    .build());
            }
            else {
                summaryRow.createCell('');
            }
        });
    }
    /**
     * Apply conditional formatting to a cell
     */
    applyConditionalStyles(cell, item, field) {
        if (!this.config.conditionalStyles)
            return;
        for (const rule of this.config.conditionalStyles) {
            if (rule.field === field && rule.condition(item)) {
                cell.setStyle(rule.style);
                break;
            }
        }
    }
    /**
     * Get nested value from object
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }
}

/**
 * Format currency values
 */
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};
/**
 * Format date values
 */
const formatDate = (date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(d);
};
/**
 * Format number with commas
 */
const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
};
/**
 * Truncate text with ellipsis
 */
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength) + '...';
};
/**
 * Generate random ID
 */
const generateId = () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
};
/**
 * Debounce function
 */
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
/**
 * Group array by key
 */
const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const groupKey = String(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
};
/**
 * Calculate percentage
 */
const calculatePercentage = (value, total) => {
    if (total === 0)
        return 0;
    return (value / total) * 100;
};
/**
 * Download file
 */
const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
};

// Core exports
function exportToExcel(data, options) {
    const builder = ExportBuilder.create((options === null || options === void 0 ? void 0 : options.sheetName) || 'Sheet1');
    if (options === null || options === void 0 ? void 0 : options.headers) {
        builder.addHeaderRow(options.headers);
    }
    builder.addDataRows(data, options === null || options === void 0 ? void 0 : options.fields);
    if (options === null || options === void 0 ? void 0 : options.columnWidths) {
        builder.setColumnWidths(options.columnWidths);
    }
    return builder.build();
}
function exportToCSV(data, options) {
    // Simplified CSV export
    const headers = (options === null || options === void 0 ? void 0 : options.headers) || Object.keys(data[0] || {});
    const rows = [headers];
    data.forEach(item => {
        const row = headers.map((header) => item[header] || '');
        rows.push(row);
    });
    return rows.map(row => row.map((cell) => String(cell).includes(',') ? `"${cell}"` : cell).join(',')).join('\n');
}
// Version
const VERSION = '1.0.0';

export { CSVWriter, Cell, Column, DateFormatter, ExcelWriter, ExportBuilder, JSONWriter, NumberFormatter, Row, SectionBuilder, SheetBuilder, StyleBuilder, VERSION, Workbook, Worksheet, calculatePercentage, debounce, downloadFile, exportToCSV, exportToExcel, formatCurrency, formatDate, formatNumber, generateId, groupBy, truncateText };
//# sourceMappingURL=index.esm.js.map
