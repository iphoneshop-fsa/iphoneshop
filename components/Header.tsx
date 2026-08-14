import Link from "next/link";
import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/constants";

interface HeaderProps {
  showBack?: boolean;
}

export default function Header({ showBack = false }: HeaderProps) {
  return (
    <header>
      {showBack ? (
        <Link href="/" className="back">
          ← Volver
        </Link>
      ) : (
        <Link href="/" className="brand" aria-label="iPhoneShop">
          <Image
            src="/logo-tienda.jpeg"
            alt="Logo de iPhoneShop"
            className="store-logo"
            width={42}
            height={42}
          />
          <span className="brand-name">
            iPhone<span>Shop</span>
          </span>
        </Link>
      )}

      <div className="header-actions">
        {showBack && (
          <Link href="/" aria-label="iPhoneShop">
            <Image
              src="/logo-tienda.jpeg"
              alt="Logo de iPhoneShop"
              className="store-logo"
              width={46}
              height={46}
            />
          </Link>
        )}
        <a
          href={INSTAGRAM_URL}
          className="instagram-header"
          aria-label="Instagram de iPhoneShop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="2" width="20" height="20" rx="5.5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>
    </header>
  );
}
