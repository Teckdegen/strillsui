import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Transactions from "@/components/Transactions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-[radial-gradient(circle_at_top,_rgba(148,163,253,0.26),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(76,29,149,0.6),_transparent_60%),#02010a]">
      <div className="relative w-full max-w-6xl mx-auto rounded-[32px] border border-white/10 bg-black/75 backdrop-blur-3xl shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Transactions />
        <Footer />
      </div>
    </main>
  );
}
