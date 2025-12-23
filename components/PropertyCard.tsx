"use client";

import { Bed, Bath, Square, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Property } from "@/data/mock-data";

interface PropertyCardProps {
  property: Property;
}

const statusColors = {
  "For Sale": "bg-green-500/20 text-green-400",
  "Open House": "bg-[var(--g360-accent)]/20 text-[var(--g360-accent)]",
  "Coming Soon": "bg-blue-500/20 text-blue-400",
  "Under Contract": "bg-purple-500/20 text-purple-400",
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <a
      href={property.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block g360-card overflow-hidden group"
    >
      {/* Property Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[property.status]}`}>
            {property.status}
          </span>
        </div>

        {/* View Property Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--g360-accent)] text-[var(--g360-darker)] rounded-lg font-medium text-sm">
            View Property
            <ExternalLink size={14} />
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-semibold text-base mb-1 group-hover:text-[var(--g360-accent)] transition-colors">
          {property.title}
        </h3>

        {/* Address */}
        <p className="text-[var(--g360-gray)] text-sm mb-3">
          {property.address}
        </p>

        {/* Price and Specs */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <span className="text-[var(--g360-accent)] font-bold text-lg">
            {property.price}
          </span>

          {/* Specs */}
          <div className="flex items-center gap-3 text-[var(--g360-gray)] text-sm">
            <span className="inline-flex items-center gap-1">
              <Bed size={14} />
              {property.beds}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath size={14} />
              {property.baths}
            </span>
            <span className="inline-flex items-center gap-1">
              <Square size={14} />
              {property.sqft.toLocaleString()} ft²
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
