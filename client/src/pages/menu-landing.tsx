import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Coupon, CarouselImage, MenuCategory } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Menu as MenuIcon,
  X,
  Tag,
  Calendar,
} from "lucide-react";

import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "@/components/hamburger-menu";
import FloatingButtons from "@/components/floating-buttons";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

import premiumFoodImg from "@assets/image_1765866040643.png";
import premiumBarImg from "@assets/stock_images/premium_whisky_cockt_68b3295e.jpg";
import premiumDessertsImg from "@assets/image_1776752566455.png";
import premiumMocktailsImg from "@assets/stock_images/premium_colorful_moc_1a15dee9.jpg";
import cocktailsImg from "@assets/COCKTAILS_1766751289781.jpg";
import craftedBeerImg from "@assets/CRAFTED_BEER_1766750491358.jpg";
import fallbackImg from "@assets/coming_soon_imagev2_1766811809828.jpg";
import type { Logo } from "@shared/schema";


const categoryImages: Record<string, string> = {
  food: premiumFoodImg,
  "crafted-beer": craftedBeerImg,
  cocktails: cocktailsImg,
  bar: premiumBarImg,
  desserts: premiumDessertsImg,
  mocktails: premiumMocktailsImg,
};


function CouponCard({
  coupon,
  onClick,
}: {
  coupon: Coupon;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex-shrink-0 focus:outline-none active:scale-95 transition-transform duration-150"
      style={{ width: "78vw", maxWidth: "340px", minWidth: "260px" }}
      data-testid={`coupon-card-${coupon.code}`}
    >
      {/* Card body — two-section horizontal layout */}
      <div
        className="flex rounded-2xl overflow-hidden relative"
        style={{
          border: "1.5px solid #E49B1D",
          minHeight: "96px",
          boxShadow: "0 4px 20px rgba(228,155,29,0.18)",
        }}
      >
        {/* LEFT — gold gradient discount panel */}
        <div
          className="flex flex-col items-center justify-center px-4 py-3 flex-shrink-0"
          style={{
            width: "37%",
            background: "linear-gradient(90deg, #E49B1D, #E6C55A)",
            borderRight: "1.5px dashed rgba(61,49,0,0.35)",
          }}
        >
          <Tag
            className="w-4 h-4 mb-1"
            style={{ color: "#3D3100", opacity: 0.8 }}
          />
          <p
            className="text-xl font-black leading-none text-center"
            style={{
              color: "#3D3100",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            {coupon.title}
          </p>
          <p
            className="text-[9px] uppercase tracking-widest mt-1.5 text-center font-semibold"
            style={{ color: "#3D3100", opacity: 0.75 }}
          >
            {coupon.tag}
          </p>
        </div>

        {/* RIGHT — code + condition on dark background */}
        <div
          className="flex flex-col justify-center px-4 py-3 text-left flex-1 min-w-0"
          style={{ background: "var(--bb-card)" }}
        >
          <p
            className="text-sm font-black tracking-widest leading-none uppercase"
            style={{ color: "var(--bb-gold)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {coupon.code}
          </p>
          <p
            className="text-[11px] mt-1.5 leading-snug tracking-wide"
            style={{ color: "var(--bb-gold-2)", opacity: 0.9 }}
          >
            {coupon.subtitle}
          </p>
          <p
            className="text-[10px] mt-1 leading-snug tracking-wide"
            style={{ color: "var(--bb-text)", opacity: 0.55 }}
          >
            {coupon.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function CouponsFullScreen({
  open,
  onClose,
  coupons,
}: {
  open: boolean;
  onClose: () => void;
  coupons: Coupon[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bb-bg fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
        >
          {/* Top gold shimmer bar */}
          <div
            className="h-[3px] w-full flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, #E49B1D, #F0CC60, #E49B1D, transparent)",
            }}
          />

          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(228,155,29,0.18)" }}
          >
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.3em] font-light mb-0.5"
                style={{ color: "var(--bb-gold)" }}
              >
                Exclusive Offers
              </p>
              <h2
                className="text-2xl font-black leading-none uppercase tracking-widest"
                style={{
                  color: "var(--bb-gold)",
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "0.18em",
                }}
              >
                Coupons &amp; Deals
              </h2>
            </div>

            {/* Gold close button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{
                background: "rgba(228,155,29,0.12)",
                border: "1.5px solid rgba(228,155,29,0.45)",
                color: "var(--bb-gold)",
              }}
              data-testid="button-close-coupons-fullscreen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable coupon list */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                {/* Full-width coupon card — same design as CouponCard */}
                <div
                  className="flex rounded-2xl overflow-hidden relative w-full"
                  style={{
                    border: "1.5px solid #E49B1D",
                    minHeight: "104px",
                    boxShadow: "0 4px 20px rgba(228,155,29,0.18)",
                  }}
                >
                  {/* LEFT — gold gradient panel */}
                  <div
                    className="flex flex-col items-center justify-center px-5 py-4 flex-shrink-0"
                    style={{
                      width: "36%",
                      background: "linear-gradient(135deg, #E49B1D, #E6C55A)",
                      borderRight: "1.5px dashed rgba(61,49,0,0.35)",
                    }}
                  >
                    <Tag
                      className="w-4 h-4 mb-1"
                      style={{ color: "#3D3100", opacity: 0.8 }}
                    />
                    <p
                      className="text-xl font-black leading-none text-center"
                      style={{
                        color: "#3D3100",
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {coupon.title}
                    </p>
                    <p
                      className="text-[9px] uppercase tracking-widest mt-1.5 text-center font-semibold"
                      style={{ color: "#3D3100", opacity: 0.75 }}
                    >
                      {coupon.tag}
                    </p>
                  </div>

                  {/* RIGHT — details on dark background */}
                  <div
                    className="flex flex-col justify-center px-4 py-3 text-left flex-1 min-w-0"
                    style={{ background: "var(--bb-card)" }}
                  >
                    <p
                      className="text-sm font-black tracking-widest leading-none uppercase"
                      style={{
                        color: "var(--bb-gold)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {coupon.code}
                    </p>
                    <p
                      className="text-[11px] mt-1.5 leading-snug tracking-wide"
                      style={{ color: "var(--bb-gold-2)", opacity: 0.9 }}
                    >
                      {coupon.subtitle}
                    </p>
                    <p
                      className="text-[10px] mt-1 leading-snug tracking-wide"
                      style={{ color: "var(--bb-text)", opacity: 0.55 }}
                    >
                      {coupon.description}
                    </p>
                    {/* Validity */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <Calendar
                        className="w-3 h-3 flex-shrink-0"
                        style={{ color: "var(--bb-gold)", opacity: 0.7 }}
                      />
                      <p
                        className="text-[9px] uppercase tracking-wider"
                        style={{ color: "var(--bb-gold)", opacity: 0.7 }}
                      >
                        {coupon.validity}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom gold shimmer bar */}
          <div
            className="h-[2px] w-full flex-shrink-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, #E49B1D, transparent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function MenuLanding() {
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [showCoupons, setShowCoupons] = useState(false);

  const { data: coupons = [] } = useQuery<Coupon[]>({
    queryKey: ["/api/coupons"],
  });

  const { data: carouselImages = [] } = useQuery<CarouselImage[]>({
    queryKey: ["/api/carousel"],
  });

  const { data: menuCategories = [] } = useQuery<MenuCategory[]>({
    queryKey: ["/api/menu-categories"],
  });
  const { data: logoData } = useQuery<Logo>({
    queryKey: ["/api/logo"],
  });
  const logoUrl = logoData?.url || "";
  const [lightboxImage, setLightboxImage] = useState<CarouselImage | null>(null);
  const lightboxPaused = useRef(false);
  const swipeTouchX = useRef<number | null>(null);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer_info");
    const skipped = localStorage.getItem("customer_skipped");
    if (!savedCustomer && !skipped) {
      setShowPopup(true);
    }
  }, []);

  const handleSkip = () => {
    localStorage.setItem("customer_skipped", "true");
    setShowPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/customers", {
        name: customerName,
        contactNumber: customerPhone,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save");
      }

      const data = await res.json();
      localStorage.setItem("customer_info", JSON.stringify(data.customer));
      setShowPopup(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.error,
        description: t.failedToSave,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const len = carouselImages.length;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % len);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "mocktails") {
      setLocation(`/menu/mocktails/mocktails-drinks`);
      return;
    }
    if (categoryId === "desserts") {
      setLocation(`/menu/food/desserts`);
      return;
    }
    setLocation(`/menu/${categoryId}`);
  };

  return (
    <div className="bb-bg min-h-screen">
      <header
        className="bb-header sticky top-0 z-30 elegant-shadow"
      >
        <div className="container mx-auto px-2 sm:px-4 pt-1 pb-2.5">
          <div className="flex items-center w-full">
            <div className="flex items-center flex-shrink-0" style={{ width: "44px" }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/")}
                className="hover:bg-transparent flex-shrink-0"
                style={{ color: "#333333" }}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>

            <div className="flex-1 flex justify-center items-center overflow-visible">
              <img
                src="/tarang-logo-circle.png"
                alt="Tarang Kitchen & Bar"
                style={{ height: "68px", width: "68px", objectFit: "contain", display: "block", transform: "scale(1.45)", transformOrigin: "center", marginTop: "8px" }}
                data-testid="img-logo"
              />
            </div>

            <div className="flex justify-end items-center flex-shrink-0" style={{ width: "44px" }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
                className="hover:bg-transparent"
                style={{ color: "#333333" }}
                data-testid="button-menu-toggle"
              >
                {showHamburgerMenu ? (
                  <X className="h-7 w-7 sm:h-8 sm:w-8 md:h-6 md:w-6" />
                ) : (
                  <MenuIcon className="h-7 w-7 sm:h-8 sm:w-8 md:h-6 md:w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <HamburgerMenu
          isOpen={showHamburgerMenu}
          onClose={() => setShowHamburgerMenu(false)}
          onCategoryClick={handleCategoryClick}
        />
      </header>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(10,8,0,0.82)", backdropFilter: "blur(6px)" }}
              onClick={handleSkip}
            />

            {/* Card */}
            <motion.div
              className="relative w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: "#030101",
                border: isDark ? "5px solid #E49B1D" : "5px solid #c4722a",
                boxShadow: "0 0 60px rgba(228,155,29,0.18), 0 24px 64px rgba(0,0,0,0.7)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              initial={{ scale: 0.88, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
            >
              {/* Gold shimmer top bar */}
              <div
                className="h-[3px] w-full"
                style={{ background: "linear-gradient(90deg, transparent, #E49B1D, #C4722A, #E49B1D, transparent)" }}
              />

              {/* Close button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "#E49B1D", color: "#030101", border: "none" }}
                data-testid="button-close-popup"
              >
                <X className="w-4 h-4" strokeWidth={3} />
              </button>

              <div className="px-7 pt-6 pb-7 flex flex-col items-center">
                {/* Logo */}
                <img
                  src="/tarang-logo-circle.png"
                  alt="Tarang Kitchen & Bar"
                  className="mb-1"
                  style={{ width: "200px", height: "200px", objectFit: "contain", borderRadius: "50%" }}
                />

                {/* Ornamental divider */}
                <div className="flex items-center gap-3 w-full mb-4">
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #E49B1D)" }} />
                  <span className="text-[10px] tracking-[0.3em] font-medium" style={{ color: "#E49B1D", fontFamily: "'DM Sans', sans-serif" }}>WELCOME</span>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #E49B1D)" }} />
                </div>

                {/* Headline */}
                <h2
                  className="text-center font-bold mb-5 leading-none uppercase whitespace-nowrap"
                  style={{ color: "#E49B1D", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", letterSpacing: "0.12em" }}
                >
                  Please Enter Your Details
                </h2>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[13px] tracking-[0.15em] font-semibold uppercase" style={{ color: "#E49B1D", fontFamily: "'DM Sans', sans-serif" }}>
                      Your Name
                    </label>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="customer-form-input w-full bg-transparent outline-none text-sm font-medium py-2"
                      style={{
                        borderBottom: "2px solid #E49B1D",
                        color: "#E49B1D",
                        caretColor: "#E49B1D",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      data-testid="input-customer-name"
                    />
                  </div>

                  {/* Phone — underline input */}
                  <div className="space-y-1">
                    <label className="text-[13px] tracking-[0.15em] font-semibold uppercase" style={{ color: "#E49B1D", fontFamily: "'DM Sans', sans-serif" }}>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setCustomerPhone(val);
                      }}
                      placeholder="Enter contact number"
                      className="customer-form-input w-full bg-transparent outline-none text-sm font-medium py-2"
                      style={{
                        borderBottom: "2px solid #E49B1D",
                        color: "#E49B1D",
                        caretColor: "#E49B1D",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      data-testid="input-customer-phone"
                    />
                    {customerPhone.length > 0 && customerPhone.length < 10 && (
                      <p className="text-[10px]" style={{ color: "#E49B1D", opacity: 0.7, fontFamily: "'DM Sans', sans-serif" }}>
                        {10 - customerPhone.length} digit{10 - customerPhone.length !== 1 ? "s" : ""} remaining
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || customerName.length === 0 || customerPhone.length !== 10}
                    className="w-full h-12 rounded-full font-bold tracking-widest text-sm transition-all active:scale-95 disabled:opacity-40 mt-2"
                    style={{
                      background: "linear-gradient(90deg, #E49B1D, #C4722A)",
                      color: "#030101",
                      letterSpacing: "0.15em",
                      boxShadow: "0 4px 20px rgba(228,155,29,0.35)",
                    }}
                    data-testid="button-submit-customer"
                  >
                    {isSubmitting ? "SAVING..." : "CONFIRM & PROCEED"}
                  </button>

                  {/* Skip option */}
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full text-center text-xs py-1 transition-opacity hover:opacity-70"
                    style={{ color: "#E49B1D", letterSpacing: "0.08em", opacity: 0.7, fontFamily: "'DM Sans', sans-serif" }}
                    data-testid="button-skip-popup"
                  >
                    Continue without entering details →
                  </button>
                </form>
              </div>

              {/* Gold shimmer bottom bar */}
              <div
                className="h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, transparent, #E49B1D, transparent)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-3 sm:px-4 pt-5 pb-24">
        {/* Gold gradient border wrapper for carousel — only shown when images exist */}
        {carouselImages.length > 0 && (
          <div
            className="rounded-xl p-[2px] mb-3"
            style={{ background: "linear-gradient(90deg, #E49B1D, #E6C55A)" }}
          >
            <div
              className="relative rounded-[10px] overflow-hidden cursor-pointer group"
              style={{ height: "280px", width: "100%", flexShrink: 0 }}
              onClick={() => setLightboxImage(carouselImages[currentImageIndex])}
              data-testid="banner-image-carousel"
            >
              {carouselImages.map((image, index) => (
                <motion.div
                  key={String(image._id)}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}

              <div
                className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(21,21,21,0.6), transparent)",
                }}
              />
            </div>
          </div>
        )}

        {/* Coupon Auto-Scroll Carousel — only rendered when at least 1 coupon is visible */}
        {coupons.length > 0 && (
          <div className="py-3 mb-3 overflow-hidden">
            <div
              className="coupon-track flex gap-4"
              style={{ width: "max-content" }}
            >
              {/* Repeat enough times to always fill the viewport smoothly */}
              {Array.from({ length: Math.max(2, Math.ceil(6 / coupons.length)) })
                .flatMap(() => coupons)
                .map((coupon, index) => (
                  <CouponCard
                    key={`${coupon.code}-${index}`}
                    coupon={coupon}
                    onClick={() => setShowCoupons(true)}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {[
            ...menuCategories,
            { id: "desserts", title: "Desserts", image: "", order: 99, visible: true, subcategories: [] } as MenuCategory,
          ].map((category, index) => {
              const label = category.title;
              const imgSrc = failedImages.has(category.id)
                ? fallbackImg
                : (category.image || categoryImages[category.id] || fallbackImg);
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: "linear-gradient(90deg, #E49B1D, #E6C55A)",
                    padding: "2px",
                    borderRadius: "10px",
                  }}
                >
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="group overflow-hidden"
                    style={{
                      borderRadius: "8px",
                      display: "block",
                      width: "100%",
                      aspectRatio: "1 / 1.05",
                      position: "relative",
                    }}
                    data-testid={`tile-${category.id}`}
                  >
                    <img
                      src={imgSrc}
                      alt={label as string}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-110"
                      onError={() => {
                        setFailedImages((prev) => new Set(prev).add(category.id));
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-2 pb-3">
                      <h3
                        className="text-sm sm:text-base md:text-lg font-semibold tracking-widest uppercase text-center"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "#FFFFFF",
                          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {label}
                      </h3>
                    </div>
                  </button>
                </motion.div>
              );
            })}
        </div>
      </div>

      <CouponsFullScreen
        open={showCoupons}
        onClose={() => setShowCoupons(false)}
        coupons={coupons}
      />

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={() => setLightboxImage(null)}
              data-testid="button-close-lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Navigation arrows */}
            <button
              className="absolute left-3 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                const prev =
                  (currentImageIndex - 1 + carouselImages.length) %
                  carouselImages.length;
                setCurrentImageIndex(prev);
                setLightboxImage(carouselImages[prev]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                const next = (currentImageIndex + 1) % carouselImages.length;
                setCurrentImageIndex(next);
                setLightboxImage(carouselImages[next]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              className="relative z-[1] w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                className="w-full rounded-xl object-contain"
                style={{ maxHeight: "80vh" }}
              />
              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5 mt-4">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                      setLightboxImage(carouselImages[idx]);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? "bg-white w-5"
                        : "bg-white/40 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingButtons isMenuOpen={showHamburgerMenu} />
    </div>
  );
}
