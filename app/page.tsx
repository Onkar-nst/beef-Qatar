"use client";
import LandingPage from "@/components/ui/LandingPage";
import { getDefaultBrand } from "@/lib/brands";

export default function Home() {
  const brand = getDefaultBrand();
  return <LandingPage brand={brand} />;
}
