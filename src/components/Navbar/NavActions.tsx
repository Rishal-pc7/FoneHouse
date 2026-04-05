import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navlinks({ classes, className }: { classes?: string; className?: string }) {
  return (
    <nav className={cn(classes, className)}>
      <Link href='/' className="hover:text-brandBlue transition-colors">Home</Link>
      <Link href='/shop' className="hover:text-brandBlue transition-colors">Shop</Link>
      <Link href='/about' className="hover:text-brandBlue transition-colors">About</Link>
      <Link href='/contact' className="hover:text-brandBlue transition-colors">Contact</Link>
    </nav>
  )
}
