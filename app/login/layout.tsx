import "../globals.css";
import { inter } from "@/app/ui/fonts";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
