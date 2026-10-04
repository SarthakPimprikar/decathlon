import * as fs from 'fs';
import * as path from 'path';
import { getLogger } from './logger';

const log = getLogger('CsvReader');

export type DataRow = Record<string, string>;

/* Reads fixtures/testdata.csv (it must agree with the workbook). */
export class CsvReader {
  static read(file: string = path.resolve(__dirname, '..', 'fixtures', 'testdata.csv')): DataRow[] {
    const lines = fs
      .readFileSync(file, 'utf8')
      .replace(/^\uFEFF/, '')
      .split(/\r?\n/)
      .filter((line) => line.trim() !== '');
    const headers = CsvReader.splitLine(lines[0]);

    const rows = lines.slice(1).map((line) => {
      const cells = CsvReader.splitLine(line);
      const row: DataRow = {};
      headers.forEach((header, i) => {
        row[header] = cells[i] ?? '';
      });
      return row;
    });
    log.info('read', `Read ${rows.length} rows from ${path.basename(file)}`);
    return rows;
  }

  /* Splits one line on commas, keeping commas inside "quotes". */
  private static splitLine(line: string): string[] {
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    cells.push(current.trim());
    return cells;
  }
}
