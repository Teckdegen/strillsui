import Sidebar from "@/components/docs/Sidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <Navbar />
      <div className="mx-auto flex max-w-6xl gap-8 px-6 pt-16 pb-16 lg:px-10">
        {/* Left sidebar */}
        <Sidebar />

        {/* Content */}
        <section className="flex-1 min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-white px-7 py-8 shadow-sm">
            <div className="max-w-3xl">{children}</div>
          </div>
        </section>

        {/* Right TOC placeholder — can wire up later */}
        <div className="hidden w-48 shrink-0 xl:block" />
      </div>
    </main>
  );
}
