import Sidebar from "@/components/docs/Sidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06030f]">
      <Navbar />

      {/*
        Sidebar renders two things:
          1. <aside> desktop sidebar — hidden on mobile, shows on lg+
          2. MobileSidebar — sticky bar + slide drawer, hidden on lg+
        Both live inside Sidebar, so we place it once inside the flex row.
        On mobile the aside disappears (display:none) and the sticky bar takes over.
      */}
      <div className="mx-auto max-w-6xl px-4 lg:px-8 pt-0 lg:pt-16 pb-24 flex gap-0">
        <Sidebar />

        {/* divider — desktop only */}
        <div className="hidden lg:block w-px bg-white/[0.04] mx-8 shrink-0" />

        {/* main content */}
        <main className="flex-1 min-w-0 pt-4 lg:pt-12 pb-12">
          <div className="max-w-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
