import { Logo } from "@/assets";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-2 bg-white">
      <div className="flex items-center gap-3">
        <Image src={Logo} alt="Logo" className="w-[28px]" />
        <div className="text-[20px] font-bold">
          Food<span>Wagen</span>
        </div>
      </div>
      <div>
        <Button>Add Meal</Button>
      </div>
    </nav>
  );
}
