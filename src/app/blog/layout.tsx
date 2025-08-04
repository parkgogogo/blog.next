import { ReactNode } from "react";
import Image from "next/image";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-3 pb-4 px-6">
        <Image src="/park.svg" width={68} height={32} alt="logo" />
      </div>
      {children}
    </div>
  );
}
