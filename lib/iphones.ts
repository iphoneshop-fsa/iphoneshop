import { SHEET_CSV_URL, type IPhone } from "./constants";
import {
  formatPrecio,
  formatStorage,
  inferCondicion,
  parseCSV,
} from "./csv";
import { ensureUniqueSlugs, generateSlug } from "./slug";

export const REVALIDATE_SECONDS = 30;

function formatModelo(raw: string): string {
  let name = raw.trim();
  if (/^ip\s/i.test(name)) {
    name = name.replace(/^ip\s/i, "iPhone ");
  } else if (!/^iphone/i.test(name)) {
    name = `iPhone ${name}`;
  }
  return name
    .replace(/\bpro max\b/gi, "Pro Max")
    .replace(/\bpromax\b/gi, "Pro Max")
    .replace(/\bpro\b/gi, "Pro")
    .replace(/\bplus\b/gi, "Plus")
    .replace(/\bmini\b/gi, "Mini");
}

export async function getIPhones(): Promise<IPhone[]> {
  const res = await fetch(SHEET_CSV_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Error al cargar la Google Sheet: ${res.status}`);
  }

  const csv = await res.text();
  const rows = parseCSV(csv);

  const iphones: IPhone[] = rows
    .filter((row) => {
      const stock = (row.stock ?? "").toLowerCase();
      const modelo = row.modelo ?? "";
      return modelo && stock !== "no" && stock !== "0";
    })
    .map((row, index) => {
      const modelo = row.modelo ?? "";
      const storage = formatStorage(row.storage ?? "");
      const color = row.color ?? "";
      const bateria = row.bateria ?? "";
      const descripcion = row.descripcion ?? "";

      return {
        id: String(index),
        slug: generateSlug(modelo, storage, color, index),
        modelo: formatModelo(modelo),
        precio: formatPrecio(row.precio ?? ""),
        storage,
        color,
        foto_url: row.foto_url ?? "",
        descripcion,
        stock: row.stock ?? "",
        bateria,
        condicion: inferCondicion(bateria, color, descripcion),
      };
    });

  return ensureUniqueSlugs(iphones);
}

export async function getIPhoneBySlug(slug: string): Promise<IPhone | undefined> {
  const iphones = await getIPhones();
  return iphones.find((phone) => phone.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const iphones = await getIPhones();
  return iphones.map((phone) => phone.slug);
}
