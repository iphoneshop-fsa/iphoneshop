export interface IPhone {
  id: string;
  slug: string;
  modelo: string;
  precio: string;
  storage: string;
  color: string;
  foto_url: string;
  descripcion: string;
  stock: string;
  bateria: string;
  condicion: "nuevo" | "usado";
}

export const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5WoBaqQ6m3H2LZyHTPVRBEr-aEaM-s-bofsA6Ck_lz3_vYZ5pZnQn71WsmGd7sRYxx8dyG2NTh0Tz/pubhtml";

export const WHATSAPP_NUMBER = "5493704281082";
export const INSTAGRAM_URL =
  "https://www.instagram.com/iphoneshopformosa?igsh=MTg4eGE0ZjUxejRmNQ==";
