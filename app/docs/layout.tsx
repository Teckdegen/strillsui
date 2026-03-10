import Sidebar from "@/components/docs/Sidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06030f]">
      <Navbar />
      <div className="mx-auto flex max-w-6xl gap-0 px-6 pt-16 pb-24 lg:px-8">
        {/* Sidebar — fixed width, GitBook-style */}
        <Sidebar />

        {/* Divider */}
        <div className="hidden lg:block w-px bg-white/[0.04] mx-8 shrink-0" />

        {/* Main content */}
        <main className="flex-1 min-w-0 py-12">
          <div className="max-w-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
