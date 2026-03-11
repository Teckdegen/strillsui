import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-6 pb-10">
        {/* Header bar */}
        <div className="rounded-2xl border border-green-500/[0.10] bg-[rgba(8,8,8,0.92)] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <Navbar />
        </div>

        {/* Main hero content */}
        <div className="mt-6 flex-1 rounded-[32px] border border-green-500/[0.08] bg-[rgba(8,10,8,0.85)] backdrop-blur-[26px] shadow-[0_32px_120px_rgba(0,0,0,0.95)]">
          <Hero />
        </div>
      </div>

      {/* How it works */}
      <HowItWorks />

      {/* Live stats */}
      <Stats />

      {/* Footer */}
      <Footer />
    </main>
  );
}
