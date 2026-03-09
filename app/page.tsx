import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Transactions from "@/components/Transactions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#080808] min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Transactions />
      <Footer />
    </main>
  );
}
