import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <Hero />
      <HowItWorks />
      <Stats />
      <Footer />
    </main>
  );
}
