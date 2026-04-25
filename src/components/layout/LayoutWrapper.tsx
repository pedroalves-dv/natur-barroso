import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import CookieBanner from "@/components/ui/CookieBanner";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsAppButton />
      <CookieBanner />
    </>
  );
}
