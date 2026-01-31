import fs from "fs";
import { parse } from "csv-parse";

export async function parseCsv(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const records: any[] =[];

    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, trim: true}))
      .on("data", (row) =>  records.push(row))
      .on("end", (end) => resolve(records))
      .on("error", reject);
  });
}