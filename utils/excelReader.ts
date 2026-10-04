import * as XLSX from 'xlsx';
import * as path from 'path';
import { DataRow } from './csvReader';
import { getLogger } from './logger';

const log = getLogger('ExcelReader');

/* Reads fixtures/testdata.xlsx, the source of truth for the test data. */
export class ExcelReader {
  static read(
    sheetName?: string,
    file: string = path.resolve(__dirname, '..', 'fixtures', 'testdata.xlsx')
  ): DataRow[] {
    const workbook = XLSX.readFile(file);
    const name = sheetName ?? workbook.SheetNames[0];
    const sheet = workbook.Sheets[name];
    if (!sheet) {
      throw new Error(`ExcelReader.read: sheet "${name}" not found in ${path.basename(file)}`);
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' }).map((raw) => {
      const row: DataRow = {};
      Object.keys(raw).forEach((key) => {
        row[key] = String(raw[key]).trim();
      });
      return row;
    });
    log.info('read', `Read ${rows.length} rows from sheet "${name}"`);
    return rows;
  }

  /* One column of a sheet as a plain list, e.g. every "term". */
  static column(columnName: string, sheetName?: string): string[] {
    return ExcelReader.read(sheetName).map((row) => row[columnName]);
  }
}
