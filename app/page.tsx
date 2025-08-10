import Feature from "@/components/RestaurantFeature";
import Footer from "@/components/RestaurantFooter";
import Hero from "@/components/RestaurantHero";
import Navbar from "@/components/RestaurantNavbar";
import React from "react";
import { fetchApi } from "@/lib/fetchApi";

export default async function page() {
  const meals = await fetchApi(
    "https://6852821e0594059b23cdd834.mockapi.io/Food",
    { method: "GET" }
  );
  return (
    <>
      <Navbar />
      <Hero />
      <Feature meals={meals} />
      <Footer />
    </>
  );
}
