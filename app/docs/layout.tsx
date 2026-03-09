import Sidebar from "@/components/docs/Sidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-start justify-center px-4 py-8 bg-[radial-gradient(circle_at_top,_rgba(148,163,253,0.26),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(76,29,149,0.6),_transparent_60%),#02010a]">
      <div className="relative w-full max-w-6xl mx-auto rounded-[32px] border border-white/10 bg-black/80 backdrop-blur-3xl shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 pt-20 flex gap-10">
          {/* Left sidebar */}
          <Sidebar />

          {/* Content */}
          <section className="flex-1 min-w-0 py-10 lg:py-12">
            <div className="max-w-3xl">{children}</div>
          </section>

          {/* Right TOC placeholder — can wire up later */}
          <div className="w-48 shrink-0 hidden xl:block" />
        </div>
      </div>
    </main>
  );
}
