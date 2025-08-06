import { ReactNode } from "react";
import { Logo } from "@/components/Logo";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-3 pb-4 px-6 flex items-center gap-4">
        <Logo />
      </div>
      {children}
    </div>
  );
}
