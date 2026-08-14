function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function inferCondicion(
  bateria: string,
  color: string,
  descripcion: string
): "nuevo" | "usado" {
  const text = `${color} ${descripcion}`.toLowerCase();
  if (
    !bateria ||
    bateria === "-" ||
    text.includes("sellado") ||
    text.includes("nuevo")
  ) {
    return "nuevo";
  }
  return "usado";
}

function formatPrecio(precio: string): string {
  const trimmed = precio.trim();
  if (!trimmed) return "Consultar precio";

  const lower = trimmed.toLowerCase();
  if (lower.includes("consultar")) return "Consultar precio";

  if (lower.includes("usd") || lower.includes("u$s")) {
    const num = trimmed.replace(/[^\d.,]/g, "");
    return num ? `$${num} USD` : trimmed;
  }

  if (lower.includes("ars") || lower.includes("$")) {
    const num = trimmed.replace(/[^\d.,]/g, "");
    return num ? `$${num} ARS` : trimmed;
  }

  const num = trimmed.replace(/[^\d.,]/g, "");
  if (num) return `$${num} ARS`;
  return trimmed;
}

function formatStorage(storage: string): string {
  const s = storage.trim();
  if (!s) return "";
  return s.toUpperCase().includes("GB") ? s : `${s} GB`;
}

function parseBatteryPercent(bateria: string): number | null {
  if (!bateria || bateria === "-") return null;
  const match = bateria.match(/(\d+)/);
  return match ? Math.min(100, parseInt(match[1], 10)) : null;
}

export function getBatteryLevel(
  percent: number | null
): "high" | "medium" | null {
  if (percent === null) return null;
  return percent >= 90 ? "high" : "medium";
}

export { parseBatteryPercent, formatPrecio, formatStorage, inferCondicion };

export function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map(normalizeHeader);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.every((v) => !v)) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx]?.trim() ?? "";
    });
    rows.push(row);
  }

  return rows;
}
