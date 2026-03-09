import Sidebar from "@/components/docs/Sidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#080808] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-20 flex gap-12">
        {/* Left sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 min-w-0 py-10 lg:py-12">
          <div className="max-w-3xl">{children}</div>
        </main>

        {/* Right TOC placeholder — can wire up later */}
        <div className="w-48 shrink-0 hidden xl:block" />
      </div>
    </div>
  );
}
