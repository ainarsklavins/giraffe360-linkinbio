"use client";

import { Home } from "lucide-react";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/data/mock-data";

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  if (properties.length === 0) return null;

  return (
    <div className="px-4 pb-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Home size={18} className="text-[var(--g360-accent)]" />
        <h2 className="text-sm font-semibold text-[var(--g360-accent)] uppercase tracking-wider">
          My Listings
        </h2>
        <span className="ml-auto text-[var(--g360-gray)] text-xs">
          {properties.length} {properties.length === 1 ? "property" : "properties"}
        </span>
      </div>

      {/* Stacked Property Cards */}
      <div className="flex flex-col gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
