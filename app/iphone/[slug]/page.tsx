import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import {
  getAllSlugs,
  getIPhoneBySlug,
  REVALIDATE_SECONDS,
} from "@/lib/iphones";

export const revalidate = REVALIDATE_SECONDS;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const phone = await getIPhoneBySlug(slug);

  if (!phone) {
    return { title: "Producto no encontrado | iPhoneShop" };
  }

  return {
    title: `${phone.modelo} | iPhoneShop`,
    description: phone.descripcion || `${phone.modelo} disponible en iPhoneShop`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const phone = await getIPhoneBySlug(slug);

  if (!phone) {
    notFound();
  }

  return (
    <>
      <Header showBack />
      <ProductDetail phone={phone} />
      <Footer />
    </>
  );
}
