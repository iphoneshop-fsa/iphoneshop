"use client";

import { useState } from "react";
import Image from "next/image";
import type { IPhone } from "@/lib/constants";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { getBatteryLevel, parseBatteryPercent } from "@/lib/csv";

interface ProductDetailProps {
  phone: IPhone;
}

export default function ProductDetail({ phone }: ProductDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const batteryPercent = parseBatteryPercent(phone.bateria);
  const batteryLevel = getBatteryLevel(batteryPercent);
  const details = [phone.storage, phone.color].filter(Boolean).join(" • ");

  const waMessage = encodeURIComponent(
    `Hola, me interesa el ${phone.modelo}${phone.color ? ` ${phone.color}` : ""}${phone.storage ? ` ${phone.storage}` : ""}`
  );

  return (
    <>
      <div className="container product-page">
        <div className="gallery">
          <div className="main-photo">
            {phone.foto_url ? (
              <Image
                src={phone.foto_url}
                alt={`${phone.modelo} ${phone.storage} - ${phone.color}`}
                width={700}
                height={300}
                className="product-image"
                onClick={() => setLightboxOpen(true)}
                priority
              />
            ) : (
              <span>Sin foto</span>
            )}
          </div>
        </div>

        <div className="product-info">
          <div className="model">{phone.modelo}</div>
          <div className="details">{details}</div>

          {phone.condicion === "usado" && batteryPercent !== null && batteryLevel && (
            <div className={`battery ${batteryLevel}`}>
              🔋 {phone.bateria} de batería
            </div>
          )}

          {phone.condicion === "nuevo" && (
            <div className="battery nuevo">✨ Equipo nuevo / sellado</div>
          )}

          <div className="prices">
            <div className="price-consult">{phone.precio}</div>
          </div>

          <div className="description">
            <h3>Descripción</h3>
            <p>{phone.descripcion || `${phone.modelo} en excelente estado.`}</p>
            <ul className="specs">
              {phone.storage && (
                <li>
                  <span>Almacenamiento</span> <span>{phone.storage}</span>
                </li>
              )}
              {phone.color && (
                <li>
                  <span>Color</span> <span>{phone.color}</span>
                </li>
              )}
              <li>
                <span>Estado</span>
                <span>
                  {phone.condicion === "nuevo" ? "Nuevo" : "Usado - Excelente"}
                </span>
              </li>
              {phone.condicion === "usado" && phone.bateria && (
                <li>
                  <span>Batería</span> <span>{phone.bateria}</span>
                </li>
              )}
              <li>
                <span>Garantía</span> <span>30 días</span>
              </li>
            </ul>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            className="whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      {lightboxOpen && phone.foto_url && (
        <div
          className="lightbox open"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="lightbox-close"
            aria-label="Cerrar"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
          >
            ✕
          </button>
          <Image
            src={phone.foto_url}
            alt={`${phone.modelo} - foto completa`}
            width={1200}
            height={1200}
            className="lightbox-image"
          />
        </div>
      )}
    </>
  );
}
