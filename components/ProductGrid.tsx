"use client";

import { useMemo, useState } from "react";
import type { IPhone } from "@/lib/constants";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  phones: IPhone[];
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\biphone\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function ProductGrid({ phones }: ProductGridProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query);

  const filtered = useMemo(() => {
    if (!normalizedQuery) return phones;
    return phones.filter((phone) => {
      const text = normalize(`${phone.modelo} ${phone.storage} ${phone.color}`);
      return text.includes(normalizedQuery);
    });
  }, [phones, normalizedQuery]);

  return (
    <>
      <div className="search-wrap">
        <div className="search-bar">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por modelo o color (ej: iPhone 13, Pro Max, Azul)"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search-clear visible"
              aria-label="Limpiar búsqueda"
              onClick={() => setQuery("")}
            >
              ✕
            </button>
          )}
        </div>
        {normalizedQuery && (
          <div className="search-count">
            {filtered.length === 0
              ? ""
              : `${filtered.length} ${filtered.length === 1 ? "equipo encontrado" : "equipos encontrados"}`}
          </div>
        )}
      </div>

      <section className="hero">
        <span className="hero-eyebrow">Stock actualizado</span>
        <h1>
          Tu próximo iPhone,
          <br />
          verificado al detalle
        </h1>
        <p>
          Nuevos y usados, revisados y con estado real de batería. Precios en
          pesos argentinos.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <b>{phones.length}</b>
            <span>Equipos en stock</span>
          </div>
          <div className="hero-stat">
            <b>iPhone 11–17</b>
            <span>Rango de modelos</span>
          </div>
          <div className="hero-stat">
            <b>&lt; 2 hs</b>
            <span>Respuesta por WhatsApp</span>
          </div>
        </div>
      </section>

      <div className="info-bar">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="6" width="20" height="13" rx="2.5" />
                <circle cx="12" cy="12.5" r="3" />
                <path d="M2 9.5h20" />
              </svg>
            </div>
            <div>
              <h3>Efectivo o transferencia</h3>
              <p>
                Aceptamos solo estos dos medios de pago, en un único pago — sin
                cuotas ni tarjetas.
              </p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
              </svg>
            </div>
            <div>
              <h3>Local a la calle</h3>
              <p>
                Contamos con local físico — podés venir a ver y probar el equipo
                antes de llevártelo.
              </p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.4" />
              </svg>
            </div>
            <div>
              <h3>Ubicación por WhatsApp</h3>
              <p>Escribinos y te pasamos la dirección exacta del local al instante.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="products">
          {filtered.map((phone, index) => (
            <ProductCard key={phone.slug} phone={phone} index={index} />
          ))}
        </div>

        {normalizedQuery && filtered.length === 0 && (
          <div className="no-results visible">
            <svg
              className="no-results-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <h3>Sin stock por ahora</h3>
            <p>
              No tenemos &quot;{query.trim()}&quot; en stock por el momento.
              Escribinos y te avisamos apenas lo consigamos.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hola, busco un ${query.trim()}, ¿tienen o me avisan cuando llegue?`
              )}`}
              className="btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
