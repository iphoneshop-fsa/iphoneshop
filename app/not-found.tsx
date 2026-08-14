import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <header>
        <Link href="/" className="back">
          ← Volver
        </Link>
      </header>
      <div className="container product-page" style={{ textAlign: "center" }}>
        <h1 className="model">Producto no encontrado</h1>
        <p className="details" style={{ marginBottom: 24 }}>
          Este iPhone ya no está disponible o el enlace es incorrecto.
        </p>
        <Link href="/" className="btn" style={{ maxWidth: 280, margin: "0 auto" }}>
          Ver todos los equipos
        </Link>
      </div>
    </>
  );
}
