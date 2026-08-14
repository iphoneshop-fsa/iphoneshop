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
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEbAVdg4xrjaGXFfxxoOb56GxRA5_myqltQnbhHpqNYhf1XBxeHqAMu7SWxsx15A9ZFE8GFymQ-V9U/pub?output=csv";

export const WHATSAPP_NUMBER = "5493704281082";
export const INSTAGRAM_URL =
  "https://www.instagram.com/iphoneshopformosa?igsh=MTg4eGE0ZjUxejRmNQ==";
