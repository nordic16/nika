import "@/app/ui/global.css"
import { montserrat } from "./ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-nika-primary antialised">
        <div className={`${montserrat.className} bg-nika-secondary py-2 m-2 rounded-full flex justify-between mb-20`}>
          <div className="font-bold md:text-2xl text-lg">
            <a href="#" className="mx-4 hover:text-nika-selected-primary">Home</a>
          </div>

          <div className="font-bold md:text-2xl text-lg">
            <a href="#" className="mx-4 hover:text-nika-selected-primary">Search</a>  
            <a href="#" className="mx-4 hover:text-nika-selected-primary">Settings</a>
            <a href="#" className="mx-4 text-nika-selected-primary">X</a> 
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
