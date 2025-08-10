"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroImage } from "@/assets";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");

  return (
    <section className="bg-base px-4 py-16 md:flex md:items-end justify-center">
      <div className="md:flex md:items-center justify-between w-full md:max-w-7xl">
        <div className="md:w-1/2 text-white">
          <h1 className="text-4xl font-bold">Are you starving?</h1>
          <p className="mt-2 text-lg text-white/90">
            Within a few clicks, find meals that are accessible near you
          </p>
          <Card className="mt-6 max-w-md">
            <CardContent className="p-6">
              <div className="flex space-x-2 bg-gray-100 rounded-full p-1 mb-4">
                {["delivery", "pickup"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMode(item as "delivery" | "pickup")}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium",
                      mode === item
                        ? "bg-white text-[#FF312F]"
                        : "text-gray-600"
                    )}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="flex">
                <Input
                  placeholder="What do you like to eat today?"
                  className="flex-1 border-none"
                />
                <Button className="bg-[#FF312F] hover:bg-red-600 text-white">
                  Find Meal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="justify-self-end">
          <Image
            src={HeroImage}
            alt="Food hero"
            className="rounded-lg w-[100px] h-[100px] md:w-[300px] md:h-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
