import { useState } from "react";
import type { MenuItem } from "@shared/schema";

import fallbackImg from "@assets/coming_soon_imagev2_1766811809828.jpg";
import soupManchowImg from "@assets/image_1776791999539.png";
import soupSweetcornImg from "@assets/image_1776791301049.png";
import soupHotSourImg from "@assets/image_1776791407057.png";
import soupLemonCorianderImg from "@assets/image_1776791332518.png";
import soupClearImg from "@assets/image_1776792098937.png";
import soupTomatoCreamImg from "@assets/image_1776792056827.png";
import soupTomatoBowlImg from "@assets/image_1776791355739.png";
import soupMushroomCreamImg from "@assets/image_1776791265999.png";

import mocktailBloodOrangeImg from "@assets/image_1776833599330.png";
import mocktailCherryBombImg from "@assets/image_1776833653883.png";
import mocktailCocoDelightImg from "@assets/image_1776833705934.png";
import mocktailGrapeRickeyImg from "@assets/image_1776833773881.png";
import mocktailKiwiDaiquiriImg from "@assets/image_1776833800599.png";
import mocktailPassionFruitImg from "@assets/image_1776833845254.png";
import mocktailSpicyGuavaImg from "@assets/image_1776833896892.png";
import mocktailVirginMojitoImg from "@assets/image_1776833965352.png";
import mocktailVirginPinacoladaImg from "@assets/image_1776833999860.png";
import mocktailWinterPunchImg from "@assets/image_1776834027249.png";

import dessertIceCreamImg from "@assets/image_1776837853758.png";
import dessertGulabJamunImg from "@assets/image_1776837905531.png";
import dessertSizzlingBrownieImg from "@assets/image_1776837922629.png";

import bhajiyaImg from "@assets/image_1776839581786.png";
import butterCornImg from "@assets/image_1776839719203.png";
import kheechaPapadImg from "@assets/image_1776843231024.png";
import papadFryImg from "@assets/image_1776843288193.png";
import masalaPapadImg from "@assets/image_1776843309315.png";
import saltedPeanutImg from "@assets/image_1776843326947.png";

import cheeseCherryPineappleImg from "@assets/image_1776843660207.png";
import cheeseChillyToastImg from "@assets/image_1776844265977.png";
import cheeseCornBallsImg from "@assets/image_1776844292137.png";
import cheeseFriesImg from "@assets/image_1776844439010.png";
import classicFriesImg from "@assets/image_1776844464072.png";
import cornChatImg from "@assets/image_1776844605215.png";
import freshCornTacosImg from "@assets/image_1776844660397.png";
import garlicBreadCheeseImg from "@assets/image_1776844685250.png";
import mexicanNachosImg from "@assets/image_1776844703446.png";
import vegBruschettaImg from "@assets/image_1776844725711.png";
import vegCigarRollImg from "@assets/image_1776844758488.png";

const NAME_IMAGE_OVERRIDES: { match: (n: string) => boolean; image: string }[] = [
  { match: (n) => n.includes("cheese") && n.includes("cherry") && n.includes("pineapple"), image: cheeseCherryPineappleImg },
  { match: (n) => n.includes("cheese") && n.includes("chilly") && n.includes("toast"), image: cheeseChillyToastImg },
  { match: (n) => n.includes("cheese") && n.includes("corn") && n.includes("ball"), image: cheeseCornBallsImg },
  { match: (n) => n.includes("cheese") && n.includes("fries"), image: cheeseFriesImg },
  { match: (n) => n.includes("classic") && n.includes("fries"), image: classicFriesImg },
  { match: (n) => n.includes("corn") && n.includes("chat"), image: cornChatImg },
  { match: (n) => n.includes("corn") && n.includes("taco"), image: freshCornTacosImg },
  { match: (n) => n.includes("garlic") && n.includes("bread"), image: garlicBreadCheeseImg },
  { match: (n) => n.includes("nacho"), image: mexicanNachosImg },
  { match: (n) => n.includes("bruschetta"), image: vegBruschettaImg },
  { match: (n) => n.includes("cigar") && n.includes("roll"), image: vegCigarRollImg },
  { match: (n) => n.includes("bhajiya") || n.includes("pakoda") || n.includes("pakora"), image: bhajiyaImg },
  { match: (n) => n.includes("butter corn") || n.includes("boiled chana"), image: butterCornImg },
  { match: (n) => n.includes("masala") && n.includes("kheecha"), image: kheechaPapadImg },
  { match: (n) => n.includes("kheecha"), image: kheechaPapadImg },
  { match: (n) => n.includes("masala") && n.includes("papad"), image: masalaPapadImg },
  { match: (n) => n.includes("papad"), image: papadFryImg },
  { match: (n) => n.includes("salted peanut") || n.includes("peanut"), image: saltedPeanutImg },
  { match: (n) => n.includes("ice cream") && n.includes("choice"), image: dessertIceCreamImg },
  { match: (n) => n.includes("gulab") && n.includes("jamun"), image: dessertGulabJamunImg },
  { match: (n) => n.includes("sizzling") && n.includes("brownie"), image: dessertSizzlingBrownieImg },
  { match: (n) => n.includes("blood") && n.includes("orange"), image: mocktailBloodOrangeImg },
  { match: (n) => n.includes("cherry") && n.includes("bomb"), image: mocktailCherryBombImg },
  { match: (n) => n.includes("coco") && n.includes("delight"), image: mocktailCocoDelightImg },
  { match: (n) => n.includes("grape") && n.includes("rickey"), image: mocktailGrapeRickeyImg },
  { match: (n) => n.includes("kiwi") && n.includes("daiquiri"), image: mocktailKiwiDaiquiriImg },
  { match: (n) => n.includes("passion") && n.includes("fruit"), image: mocktailPassionFruitImg },
  { match: (n) => n.includes("spicy") && n.includes("guava"), image: mocktailSpicyGuavaImg },
  { match: (n) => n.includes("virgin") && n.includes("mojito"), image: mocktailVirginMojitoImg },
  { match: (n) => n.includes("virgin") && (n.includes("pinacolada") || n.includes("pina colada") || n.includes("piña colada")), image: mocktailVirginPinacoladaImg },
  { match: (n) => n.includes("winter") && n.includes("punch"), image: mocktailWinterPunchImg },
  { match: (n) => n.includes("manchow"), image: soupManchowImg },
  { match: (n) => n.includes("sweet") && n.includes("corn"), image: soupSweetcornImg },
  { match: (n) => n.includes("hot") && n.includes("sour"), image: soupHotSourImg },
  { match: (n) => n.includes("lemon") && n.includes("coriander"), image: soupLemonCorianderImg },
  { match: (n) => n.includes("broccoli"), image: soupLemonCorianderImg },
  { match: (n) => n.includes("burnt") && n.includes("garlic") && n.includes("soup"), image: soupMushroomCreamImg },
  { match: (n) => n.includes("cream") && n.includes("mushroom"), image: soupMushroomCreamImg },
  { match: (n) => n.includes("cream") && n.includes("tomato"), image: soupTomatoCreamImg },
  { match: (n) => n.includes("mushroom") && n.includes("tomato"), image: soupMushroomCreamImg },
  { match: (n) => n.includes("tomato") && n.includes("soup"), image: soupTomatoBowlImg },
  { match: (n) => n.includes("tamatar") || n.includes("shorbha") || n.includes("shorba"), image: soupTomatoBowlImg },
  { match: (n) => n.includes("tom") && n.includes("yum"), image: soupClearImg },
  { match: (n) => n.includes("clear") && n.includes("soup"), image: soupClearImg },
];

function getOverrideImage(name: string): string | null {
  const n = (name || "").toLowerCase();
  for (const o of NAME_IMAGE_OVERRIDES) {
    if (o.match(n)) return o.image;
  }
  return null;
}

interface ProductCardProps {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
}

export default function ProductCard({ item, onClick }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const override = getOverrideImage(item.name);
  const isBrokenImage = imgError || !item.image ||
    item.image.includes("example.com") ||
    item.image.includes("via.placeholder.com") ||
    item.image.includes("placeholder.com");
  const imageUrl = isBrokenImage ? (override ?? fallbackImg) : item.image;

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
      {/* Image — square */}
      <div className="relative w-full overflow-hidden" style={{ borderRadius: "10px 10px 0 0", aspectRatio: "1 / 1" }}>
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
          className="text-xs sm:text-sm mt-0 mb-2 truncate"
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
