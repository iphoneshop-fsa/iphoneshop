import Header from "@/components/Header";
import Footer, { WhatsAppFab } from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { getIPhones } from "@/lib/iphones";

export const revalidate = 60;

export default async function HomePage() {
  const phones = await getIPhones();

  return (
    <>
      <Header />
      <ProductGrid phones={phones} />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
