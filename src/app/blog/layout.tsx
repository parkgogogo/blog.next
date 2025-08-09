import { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-3 pb-4 px-6 flex items-center gap-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {children}
    </div>
  );
}
