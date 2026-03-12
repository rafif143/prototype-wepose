import Navbar from "@/shared/layout/Navbar";
import Footer from "@/shared/layout/Footer";
import { ContactContent } from "@/features/contact/components/ContactContent";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  );
}