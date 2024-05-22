declare module 'csv-parser' {
    import { Writable } from 'stream';
  
    interface CsvParserOptions {
      separator?: string;
      newline?: string;
      quote?: string;
      escape?: string;
      headers?: boolean | string[];
      mapHeaders?: ({ header, index }: { header: string; index: number }) => string | null;
      mapValues?: ({ header, index, value }: { header: string; index: number; value: any }) => any;
      strict?: boolean;
    }
  
    function csvParser(options?: CsvParserOptions): Writable;
  
    export = csvParser;
  }
  