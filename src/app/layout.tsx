import "@/app/ui/global.css"
import { montserrat } from "./ui/fonts";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-nika-primary antialised">
        <div className={`${montserrat.className} bg-nika-secondary py-2 m-2 rounded-3xl flex justify-between mb-20`}>
          <div className="font-bold md:text-xl text-lg">
            <Link href="/" className="mx-4 hover:text-nika-selected-primary transition ease-in-out">Home</Link>
          </div>

          <div className="font-bold md:text-xl text-lg">
            <Link href="/search/" className="mx-4 transition ease-in-out hover:text-nika-selected-primary">Search</Link>  
            <Link href="#" className="mx-4 transition ease-in-out hover:text-nika-selected-primary">Settings</Link>
            <Link href="#" className="mx-4 transition ease-in-out text-nika-selected-primary">X</Link> 
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
