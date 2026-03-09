import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.55),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_transparent_65%),#020008] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-6 pb-10">
        {/* Header bar only */}
        <div className="rounded-2xl border border-white/10 bg-[rgba(5,5,10,0.9)]/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <Navbar />
        </div>

        {/* Main hero content */}
        <div className="mt-6 flex-1 rounded-[32px] border border-white/8 bg-[rgba(5,5,10,0.82)] backdrop-blur-[26px] shadow-[0_32px_120px_rgba(0,0,0,0.95)]">
          <Hero />
        </div>

        {/* Footer aligned to width, no extra wrap */}
        <div className="mt-4">
          <Footer />
        </div>
      </div>
    </main>
  );
}
