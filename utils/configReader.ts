import * as dotenv from 'dotenv';
import * as path from 'path';

// Load the .env property file that sits in the project root.
dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

/* Reads every setting from .env. No host or path is ever typed into a test. */
export class ConfigReader {
  static get(key: string, fallback?: string): string {
    const value = process.env[key] ?? fallback;
    if (value === undefined || value === '') {
      throw new Error(`ConfigReader.get: "${key}" is missing in the .env file`);
    }
    return value;
  }

  static get baseUrl(): string {
    return ConfigReader.get('BASE_URL');
  }

  static get siteHost(): string {
    return ConfigReader.get('SITE_HOST');
  }

  static get searchTerm(): string {
    return ConfigReader.get('SEARCH_TERM');
  }

  static get cataloguePath(): string {
    return ConfigReader.get('CATALOGUE_PATH');
  }

  static get footerPath(): string {
    return ConfigReader.get('FOOTER_PATH');
  }

  static get logLevel(): string {
    return ConfigReader.get('LOG_LEVEL', 'info');
  }

  static get logFile(): string {
    return ConfigReader.get('LOG_FILE', 'logs/execution.log');
  }

  static get evidenceDir(): string {
    return ConfigReader.get('EVIDENCE_DIR', 'screenshots');
  }
}
