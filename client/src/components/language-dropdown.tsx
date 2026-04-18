import { useState, useRef, useEffect } from "react";
import { ChevronDown, Loader2, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { supportedLanguages } from "@/lib/translationService";
import googleTranslateImg from "@assets/google_(1)_1773394431689.png";

interface LanguageDropdownProps {
  className?: string;
}

export default function LanguageDropdown({ className = "" }: LanguageDropdownProps) {
  const { language, setLanguage, isTranslating } = useLanguage();
  const { isDark } = useTheme();
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const current = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  const filtered = supportedLanguages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.native.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} data-testid="language-dropdown">
      <button
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        disabled={isTranslating}
        className="flex items-center gap-2 transition-all duration-200 hover:opacity-70 disabled:opacity-50"
        data-testid="button-language-toggle"
        aria-label="Select language"
      >
        {isTranslating ? (
          <Loader2 className="w-7 h-7 animate-spin" style={{ color: textColor }} />
        ) : (
          <img src={googleTranslateImg} alt="Translate" className="w-7 h-7 object-contain" />
        )}
        <span className="text-base font-semibold tracking-wide" style={{ color: textColor }}>
          {current.native}
        </span>
        <ChevronDown
          className="w-5 h-5 transition-transform duration-200"
          style={{ color: textColor, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 rounded-lg overflow-hidden z-50 shadow-xl"
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #B8986A",
            width: "180px",
          }}
        >
          {/* Search box */}
          <div className="p-2 border-b" style={{ borderColor: "rgba(184,152,106,0.3)" }}>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
              <Search className="w-3 h-3 flex-shrink-0" style={{ color: "#B8986A" }} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-xs outline-none w-full"
                style={{ color: "#dcd4c8" }}
                autoFocus
              />
            </div>
          </div>

          {/* Language list */}
          <div className="overflow-y-auto" style={{ maxHeight: "220px" }}>
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-xs text-center" style={{ color: "rgba(220,212,200,0.5)" }}>
                No language found
              </div>
            ) : (
              filtered.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
                  style={{
                    backgroundColor: language === lang.code ? "rgba(184,152,106,0.2)" : "transparent",
                    color: language === lang.code ? "#B8986A" : "#dcd4c8",
                    fontWeight: language === lang.code ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (language !== lang.code) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== lang.code) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }
                  }}
                  data-testid={`button-lang-${lang.code}`}
                >
                  <span className="w-8 text-xs font-bold flex-shrink-0" style={{ color: "#B8986A" }}>
                    {lang.native}
                  </span>
                  <span className="text-xs truncate">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-xs" style={{ color: "#B8986A" }}>✓</span>
                  )}
                </button>
              ))
            )}
          </div>

          {/* Footer note */}
          <div
            className="px-3 py-1.5 text-center border-t"
            style={{ borderColor: "rgba(184,152,106,0.3)", color: "rgba(220,212,200,0.4)", fontSize: "10px" }}
          >
            Powered by MyMemory
          </div>
        </div>
      )}
    </div>
  );
}
