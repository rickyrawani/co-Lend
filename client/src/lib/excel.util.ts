import * as XLSX from "xlsx";

export async function readExcelSheet(url: string, sheetName: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Excel fetch failed");
  }

  const buffer = await res.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`);
  }

  const rawData = XLSX.utils.sheet_to_json<any>(sheet, {
    defval: null,
    raw: false,
  });

  return rawData.map((row) => {
    const cleaned: any = {};

    Object.keys(row).forEach((key) => {
      const value = row[key];

      if (
        typeof value === "string" &&
        value.trim() !== "" &&
        !isNaN(Number(value))
      ) {
        cleaned[key] = Number(value);
      } else {
        cleaned[key] = value;
      }
    });

    return cleaned;
  });
}
