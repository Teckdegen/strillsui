import Sidebar from "@/components/docs/Sidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#05010a]">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-10 px-6 pt-20 pb-16 lg:px-10">
        {/* Left sidebar */}
        <Sidebar />

        {/* Content fills remaining width */}
        <section className="flex-1 min-w-0">
          <div className="docs-shell">
            <div className="max-w-3xl">{children}</div>
          </div>
        </section>

        {/* Right TOC placeholder — can wire up later */}
        <div className="hidden w-52 shrink-0 xl:block" />
      </div>
    </main>
  );
}
