import { montserrat } from "./ui/fonts"

export default function Home() {
  return (
  <div className="md:container">
    <p className={`${montserrat.className} md:text-5xl text-3xl font-bold mb-6`}>Nika - Main Page!</p>
    <div className="ml-4">
      <p className={`${montserrat.className} text-2xl font-semibold`}>Comics</p>
    </div>
  </div>
  )
}
