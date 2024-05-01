import { FormEvent } from "react";
import { montserrat } from "../ui/fonts";

export default function Search() {
    function handle_change(event: FormEvent<HTMLInputElement>): void {
        throw new Error("Function not implemented.");
    }

    return(
      <div className="md:container mx-auto">
        <p className={`${montserrat.className} text-5xl font-bold mb-10`}>Nika - Search Page</p> 
        <div className="ml-2 w-full text-center">
          <input id="search-box" onInput={handle_change} className="bg-nika-secondary w-10/12 text-center rounded-3xl py-4 text-2xl w-full" placeholder="Search Comics..."></input>
        </div>
      </div>
      )
  }