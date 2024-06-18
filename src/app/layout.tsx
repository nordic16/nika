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
        <div className={`${montserrat.className} bg-nika-secondary py-2 m-2 rounded-3xl flex justify-between mb-8`}>
          <div className="font-bold md:text-xl text-lg">
            <Link href="/" className="mx-4 hover:text-nika-blue-primary transition ease-in-out">Home</Link>
          </div>

          <div className="font-bold md:text-xl text-lg">
            <Link href="/search/" className="mx-4 transition ease-in-out hover:text-nika-blue-primary">Search</Link>  
            <Link href="#" className="mx-4 transition ease-in-out hover:text-nika-blue-primary">Settings</Link>
            <Link href="#" className="mx-4 transition ease-in-out text-nika-blue-primary">X</Link> 
          </div>
        </div>
        <div className="mx-12">
        {children}
        </div>
      </body>
    </html>
  );
}
