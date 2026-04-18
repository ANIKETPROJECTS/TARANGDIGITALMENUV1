import { useState } from "react";
import type { MenuItem } from "@shared/schema";

import fallbackImg from "@assets/coming_soon_imagev2_1766811809828.jpg";

interface ProductCardProps {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
}

export default function ProductCard({ item, onClick }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const isBrokenImage = imgError || !item.image ||
    item.image.includes("example.com") ||
    item.image.includes("via.placeholder.com") ||
    item.image.includes("placeholder.com");
  const imageUrl = isBrokenImage ? fallbackImg : item.image;

  return (
    <div
      className="flex flex-col overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        borderRadius: "10px",
        backgroundColor: "var(--bb-card)",
        border: "1px solid var(--bb-border)",
      }}
      onClick={() => onClick?.(item)}
      data-testid={`card-dish-${item._id?.toString()}`}
    >
      {/* Image */}
      <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ borderRadius: "10px 10px 0 0", height: "190px" }}>
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        <div
          className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 shadow-sm ${
            item.isVeg ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-300'
          }`}
        />
      </div>

      {/* Text content — fixed-height rows so all cards align */}
      <div className="flex flex-col p-2 md:p-3">

        {/* Name — always exactly 2 lines tall */}
        <div
          style={{
            height: "2.6em",
            lineHeight: "1.3em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          <h3
            className="text-sm sm:text-base font-semibold tracking-wide uppercase"
            style={{
              color: "var(--bb-gold)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: "1.3em",
            }}
          >
            {item.name}
          </h3>
        </div>

        {/* Description — single line, truncated with ellipsis */}
        <p
          className="text-xs sm:text-sm mt-1 mb-2 truncate"
          style={{
            color: "var(--bb-text)",
            fontFamily: "'DM Sans', sans-serif",
            opacity: 0.8,
          }}
        >
          {item.description || "No description available"}
        </p>

        {/* Price */}
        <div className="pt-2" style={{ borderTop: "1px solid var(--bb-border)" }}>
          <span
            className="text-sm sm:text-base font-bold block tracking-wide"
            style={{
              color: "var(--bb-gold-2)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: "1.2",
            }}
          >
            {typeof item.price === "string" && item.price.includes("|")
              ? item.price.split("|").map(p => `₹${p.trim()}`).join(" | ")
              : `₹${item.price}`}
          </span>
        </div>
      </div>
    </div>
  );
}
