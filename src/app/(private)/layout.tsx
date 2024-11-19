import { ReactNode } from "react";

export const metadata = {
  title: "CE-UID",
  description: "UID",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="flex h-full w-full">{children}</div>;
}
