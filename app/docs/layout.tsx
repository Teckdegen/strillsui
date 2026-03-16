import Sidebar, { MobileMenuBar } from "@/components/docs/Sidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      {/* Mobile bar - fixed, sits ABOVE the flex layout so it doesn't affect widths */}
      <MobileMenuBar />

      <div className="mx-auto max-w-6xl px-4 lg:px-8 pt-0 lg:pt-16 pb-24 flex gap-0">
        {/* Desktop sidebar only */}
        <Sidebar />

        {/* divider - desktop only */}
        <div className="hidden lg:block w-px bg-white/[0.04] mx-8 shrink-0" />

        {/* main content - add top padding on mobile to clear the fixed bar */}
        <main className="flex-1 min-w-0 pt-[100px] lg:pt-12 pb-12">
          <div className="max-w-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
