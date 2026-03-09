import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.55),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.85),_transparent_65%),#020008]">
      <div className="relative w-full max-w-6xl mx-auto rounded-[32px] border border-white/12 bg-[rgba(5,5,10,0.88)] backdrop-blur-[32px] shadow-[0_40px_140px_rgba(0,0,0,0.95)] overflow-hidden">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
