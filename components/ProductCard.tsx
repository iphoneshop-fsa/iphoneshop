import Link from "next/link";
import type { IPhone } from "@/lib/constants";
import { getBatteryLevel, parseBatteryPercent } from "@/lib/csv";

interface ProductCardProps {
  phone: IPhone;
  index: number;
}

function PhoneGlyph() {
  return (
    <svg
      className="card-glyph"
      viewBox="0 0 24 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="1" y="1" width="22" height="38" rx="6" />
      <line x1="9" y1="5" x2="15" y2="5" />
      <line x1="6" y1="34" x2="18" y2="34" />
    </svg>
  );
}

export default function ProductCard({ phone, index }: ProductCardProps) {
  const batteryPercent = parseBatteryPercent(phone.bateria);
  const batteryLevel = getBatteryLevel(batteryPercent);
  const details = [phone.storage, phone.color].filter(Boolean).join(" · ");

  return (
    <div
      className="card"
      style={{ animationDelay: `${0.02 + index * 0.04}s` }}
      data-search={`${phone.modelo} ${details}`}
    >
      <div className="card-top">
        <span className={`badge ${phone.condicion === "nuevo" ? "nuevo" : "usado"}`}>
          {phone.condicion === "nuevo" ? "Nuevo" : "Usado"}
        </span>
        <PhoneGlyph />
      </div>
      <div className="card-body">
        <div className="model">{phone.modelo}</div>
        <div className="details">{details}</div>

        {phone.condicion === "usado" && batteryPercent !== null && batteryLevel && (
          <div className="battery-wrap">
            <div className={`battery-label ${batteryLevel}`}>
              <span>Batería</span>
              <span className="pct">{phone.bateria}</span>
            </div>
            <div className="battery-track">
              <div
                className={`battery-fill ${batteryLevel}`}
                style={{ width: `${batteryPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="prices">
          <div className="price-consult">{phone.precio}</div>
        </div>

        <Link href={`/iphone/${phone.slug}`} className="btn">
          Ver más{" "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
