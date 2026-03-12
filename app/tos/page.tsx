import Navbar from "@/shared/layout/Navbar";
import Footer from "@/shared/layout/Footer";
import { ToSContent } from "@/features/legal/components/ToSContent";

export default function ToSPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ToSContent />
      <Footer />
    </main>
  );
}