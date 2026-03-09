import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top,_rgba(148,163,253,0.26),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(76,29,149,0.7),_transparent_60%),#02000a]">
      <div className="relative w-full max-w-6xl mx-auto rounded-[32px] border border-white/10 bg-gradient-to-br from-[#050310] via-[#050111] to-[#020008] backdrop-blur-3xl shadow-[0_40px_140px_rgba(0,0,0,0.95)] overflow-hidden">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
