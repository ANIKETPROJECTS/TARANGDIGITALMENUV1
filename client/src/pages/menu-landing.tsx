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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import premiumFoodImg from "@assets/image_1765866040643.png";
import premiumBarImg from "@assets/stock_images/premium_whisky_cockt_68b3295e.jpg";
import premiumDessertsImg from "@assets/image_1765866710467.png";
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
          border: "1.5px solid #D4AF37",
          minHeight: "96px",
          boxShadow: "0 4px 20px rgba(212,175,55,0.18)",
        }}
      >
        {/* LEFT — gold gradient discount panel */}
        <div
          className="flex flex-col items-center justify-center px-4 py-3 flex-shrink-0"
          style={{
            width: "37%",
            background: "linear-gradient(90deg, #D4AF37, #E6C55A)",
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
                "linear-gradient(90deg, transparent, #D4AF37, #F0CC60, #D4AF37, transparent)",
            }}
          />

          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(212,175,55,0.18)" }}
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
                background: "rgba(212,175,55,0.12)",
                border: "1.5px solid rgba(212,175,55,0.45)",
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
                    border: "1.5px solid #D4AF37",
                    minHeight: "104px",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.18)",
                  }}
                >
                  {/* LEFT — gold gradient panel */}
                  <div
                    className="flex flex-col items-center justify-center px-5 py-4 flex-shrink-0"
                    style={{
                      width: "36%",
                      background: "linear-gradient(135deg, #D4AF37, #E6C55A)",
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
                "linear-gradient(90deg, transparent, #D4AF37, transparent)",
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
    setLocation(`/menu/${categoryId}`);
  };

  return (
    <div className="bb-bg min-h-screen">
      <header
        className="bb-bg sticky top-0 z-30 elegant-shadow"
      >
        <div className="container mx-auto px-2 sm:px-4 py-2">
          <div className="grid grid-cols-3 items-center w-full">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/")}
                className="hover:bg-transparent flex-shrink-0"
                style={{ color: "var(--bb-text)" }}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>

            <div className="flex justify-center items-center">
              <img
                src={logoUrl}
                alt="AT Digital Menu Logo"
                style={{ width: "96px", height: "96px", objectFit: "contain", display: "block" }}
                data-testid="img-logo"
              />
            </div>

            <div className="flex justify-end items-center space-x-1 sm:space-x-2 md:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
                className="hover:bg-transparent"
                style={{ color: "var(--bb-text)" }}
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
                background: isDark ? "linear-gradient(160deg, #1C1500 0%, #0F0C00 100%)" : "#FFFFFF",
                border: isDark ? "1.5px solid #D4AF37" : "1.5px solid rgba(212,175,55,0.5)",
                boxShadow: isDark ? "0 0 60px rgba(212,175,55,0.18), 0 24px 64px rgba(0,0,0,0.7)" : "0 0 40px rgba(212,175,55,0.12), 0 24px 64px rgba(0,0,0,0.15)",
              }}
              initial={{ scale: 0.88, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
            >
              {/* Gold shimmer top bar */}
              <div
                className="h-[3px] w-full"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF37, #F0CC60, #D4AF37, transparent)" }}
              />

              {/* Close button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: isDark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.1)", color: "var(--bb-gold)", border: "1px solid var(--bb-search-br)" }}
                data-testid="button-close-popup"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-7 pt-6 pb-7 flex flex-col items-center">
                {/* Logo */}
                <img
                  src={logoUrl}
                  alt="AT Digital Menu"
                  className="mb-1"
                  style={{ filter: "drop-shadow(0 0 12px rgba(212,175,55,0.35))", width: "208px", height: "208px", objectFit: "contain" }}
                />

                {/* Ornamental divider */}
                <div className="flex items-center gap-3 w-full mb-4">
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #D4AF37)" }} />
                  <span className="text-[10px] tracking-[0.3em] font-light" style={{ color: "var(--bb-gold)" }}>WELCOME</span>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #D4AF37)" }} />
                </div>

                {/* Headline */}
                <h2
                  className="text-center font-black mb-1 leading-tight uppercase tracking-widest"
                  style={{ color: "var(--bb-gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", letterSpacing: "0.18em" }}
                >
                  Please Enter Your Details
                </h2>
                <p className="text-center text-[11px] mb-5 font-light uppercase tracking-widest" style={{ color: "#6A5A3A", letterSpacing: "0.12em" }}>
                  To Proceed To Our Menu
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-[0.2em] font-medium uppercase" style={{ color: "#B8986A" }}>
                      Your Name
                    </label>
                    <div
                      className="flex items-center rounded-xl px-4 py-0 h-12 transition-all"
                      style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.35)" }}
                    >
                      <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-transparent outline-none text-sm font-light placeholder:opacity-40"
                        style={{ color: isDark ? "var(--bb-input-text)" : "#1a1a1a", caretColor: "#D4AF37" }}
                        data-testid="input-customer-name"
                      />
                    </div>
                  </div>

                  {/* Phone — 10 OTP digit boxes */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] font-medium uppercase" style={{ color: "#B8986A" }}>
                      Contact Number
                    </label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={10}
                        value={customerPhone}
                        onChange={(val) => setCustomerPhone(val)}
                        pattern={REGEXP_ONLY_DIGITS}
                        inputMode="numeric"
                        data-testid="input-customer-phone"
                      >
                        <InputOTPGroup className="gap-[5px]">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="h-10 w-[27px] rounded-lg text-sm font-bold first:rounded-l-lg first:border-l last:rounded-r-lg transition-all"
                              style={{
                                background: isDark ? "rgba(212,175,55,0.14)" : "rgba(212,175,55,0.08)",
                                border: "1.5px solid rgba(212,175,55,0.6)",
                                color: isDark ? "#F0E080" : "#1a1a1a",
                                borderRadius: "8px",
                              }}
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {customerPhone.length > 0 && customerPhone.length < 10 && (
                      <p className="text-center text-[10px]" style={{ color: "#B8986A" }}>
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
                      background: "linear-gradient(90deg, #D4AF37, #E6C55A)",
                      color: "#1C1500",
                      letterSpacing: "0.15em",
                      boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
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
                    style={{ color: "#6A5A3A", letterSpacing: "0.08em" }}
                    data-testid="button-skip-popup"
                  >
                    Continue without entering details →
                  </button>
                </form>
              </div>

              {/* Gold shimmer bottom bar */}
              <div
                className="h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
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
            style={{ background: "linear-gradient(90deg, #D4AF37, #E6C55A)" }}
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
          {menuCategories.map((category, index) => {
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
                    background: "linear-gradient(90deg, #D4AF37, #E6C55A)",
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
