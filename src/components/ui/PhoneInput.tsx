"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  dial: string; // e.g. "+91"
  minDigits: number; // min digits after dial code
  maxDigits: number; // max digits after dial code
}

const COUNTRIES: Country[] = [
  // Primary markets
  { code: "IN", name: "India", dial: "+91", minDigits: 10, maxDigits: 10 },
  { code: "US", name: "United States", dial: "+1", minDigits: 10, maxDigits: 10 },
  { code: "GB", name: "United Kingdom", dial: "+44", minDigits: 10, maxDigits: 10 },
  { code: "TH", name: "Thailand", dial: "+66", minDigits: 9, maxDigits: 9 },
  { code: "KR", name: "South Korea", dial: "+82", minDigits: 9, maxDigits: 10 },
  { code: "SG", name: "Singapore", dial: "+65", minDigits: 8, maxDigits: 8 },
  { code: "AE", name: "UAE", dial: "+971", minDigits: 7, maxDigits: 9 },
  { code: "JP", name: "Japan", dial: "+81", minDigits: 9, maxDigits: 10 },
  { code: "AU", name: "Australia", dial: "+61", minDigits: 9, maxDigits: 9 },
  { code: "CA", name: "Canada", dial: "+1", minDigits: 10, maxDigits: 10 },
  { code: "BR", name: "Brazil", dial: "+55", minDigits: 10, maxDigits: 11 },
  { code: "MY", name: "Malaysia", dial: "+60", minDigits: 9, maxDigits: 10 },
  { code: "PH", name: "Philippines", dial: "+63", minDigits: 10, maxDigits: 10 },
  { code: "VN", name: "Vietnam", dial: "+84", minDigits: 9, maxDigits: 10 },
  { code: "ID", name: "Indonesia", dial: "+62", minDigits: 9, maxDigits: 12 },
  { code: "TW", name: "Taiwan", dial: "+886", minDigits: 9, maxDigits: 9 },
  { code: "HK", name: "Hong Kong", dial: "+852", minDigits: 8, maxDigits: 8 },
  { code: "CN", name: "China", dial: "+86", minDigits: 11, maxDigits: 11 },
  { code: "DE", name: "Germany", dial: "+49", minDigits: 10, maxDigits: 11 },
  { code: "FR", name: "France", dial: "+33", minDigits: 9, maxDigits: 9 },
  { code: "IT", name: "Italy", dial: "+39", minDigits: 9, maxDigits: 10 },
  { code: "ES", name: "Spain", dial: "+34", minDigits: 9, maxDigits: 9 },
  { code: "PT", name: "Portugal", dial: "+351", minDigits: 9, maxDigits: 9 },
  { code: "SA", name: "Saudi Arabia", dial: "+966", minDigits: 9, maxDigits: 9 },
  { code: "QA", name: "Qatar", dial: "+974", minDigits: 7, maxDigits: 8 },
  { code: "KW", name: "Kuwait", dial: "+965", minDigits: 8, maxDigits: 8 },
  { code: "TR", name: "Turkey", dial: "+90", minDigits: 10, maxDigits: 10 },
  { code: "NZ", name: "New Zealand", dial: "+64", minDigits: 8, maxDigits: 10 },
  { code: "ZA", name: "South Africa", dial: "+27", minDigits: 9, maxDigits: 9 },
  { code: "NL", name: "Netherlands", dial: "+31", minDigits: 9, maxDigits: 9 },
  { code: "CH", name: "Switzerland", dial: "+41", minDigits: 9, maxDigits: 9 },
  { code: "SE", name: "Sweden", dial: "+46", minDigits: 7, maxDigits: 13 },
  { code: "NO", name: "Norway", dial: "+47", minDigits: 8, maxDigits: 8 },
  { code: "MX", name: "Mexico", dial: "+52", minDigits: 10, maxDigits: 10 },
];

const FLAG_EMOJI: Record<string, string> = {};
for (const c of COUNTRIES) {
  FLAG_EMOJI[c.code] = String.fromCodePoint(
    ...c.code.split("").map((ch) => 0x1f1e6 - 65 + ch.charCodeAt(0))
  );
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function fitDigits(digits: string, country: Country): string {
  let d = digits;
  if (d.length > country.maxDigits) {
    const dial = country.dial.slice(1);
    const prefix = [`00${dial}`, dial, "0"].find((p) => d.startsWith(p));
    if (prefix) d = d.slice(prefix.length);
  }
  return d.slice(0, country.maxDigits);
}

export function validatePhone(
  digits: string,
  country: Country
): { valid: boolean; error?: string } {
  if (!digits) return { valid: false, error: "Phone number is required" };
  const d = digitsOnly(digits);
  if (d.length < country.minDigits) {
    return {
      valid: false,
      error: `Phone number must be at least ${country.minDigits} digits for ${country.name}`,
    };
  }
  if (d.length > country.maxDigits) {
    return {
      valid: false,
      error: `Phone number must be at most ${country.maxDigits} digits for ${country.name}`,
    };
  }
  return { valid: true };
}

export function formatE164(digits: string, country: Country): string {
  const d = digitsOnly(digits);
  if (!d) return "";
  return `${country.dial}${d}`;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string, fullNumber: string, valid: boolean) => void;
  countryCode: string;
  onCountryChange: (code: string) => void;
  id?: string;
  placeholder?: string;
  error?: string | null;
  className?: string;
  disabled?: boolean;
  "aria-describedby"?: string;
}

export default function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
  id,
  placeholder,
  error,
  className = "",
  disabled = false,
  "aria-describedby": ariaDescribedBy,
}: PhoneInputProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen) {
      searchInputRef.current?.focus();
    }
  }, [dropdownOpen]);

  const handlePhoneChange = useCallback(
    (raw: string) => {
      const digits = fitDigits(digitsOnly(raw), country);
      onChange(digits, formatE164(digits, country), validatePhone(digits, country).valid);
    },
    [country, onChange]
  );

  const handleCountrySelect = useCallback(
    (code: string) => {
      onCountryChange(code);
      setDropdownOpen(false);
      setSearch("");
      const newCountry = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
      const validation = validatePhone(value, newCountry);
      onChange(value, formatE164(value, newCountry), validation.valid);
    },
    [value, onChange, onCountryChange]
  );

  const filteredCountries = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRIES;

  const hasError = !!error;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        className={`flex border rounded-lg transition-colors ${
          hasError
            ? "border-red-400 ring-2 ring-red-400/20"
            : "border-slate-200 focus-within:ring-2 focus-within:ring-sage/30 focus-within:border-sage"
        }`}
      >
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border-r border-slate-200 rounded-l-lg hover:bg-slate-100 transition-colors text-sm min-w-[90px] disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label={`Select country code, currently ${country.name} ${country.dial}`}
          aria-expanded={dropdownOpen}
          aria-haspopup="listbox"
        >
          <span className="text-base leading-none">{FLAG_EMOJI[country.code]}</span>
          <span className="text-xs text-slate-700 font-medium">{country.dial}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          onChange={(e) => handlePhoneChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder ?? "912 345 6789"}
          aria-invalid={hasError}
          aria-describedby={ariaDescribedBy}
          className="flex-1 px-3 py-2.5 text-sm text-slate-900 focus:outline-none bg-white rounded-r-lg min-w-0 disabled:opacity-60 placeholder:text-slate-300"
        />
      </div>

      {dropdownOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-64 max-h-60 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-2.5 py-1.5 text-xs text-slate-900 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sage/30"
            />
          </div>
          <ul role="listbox" className="overflow-y-auto max-h-44">
            {filteredCountries.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.code === countryCode}
                  onClick={() => handleCountrySelect(c.code)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-slate-50 transition-colors ${
                    c.code === countryCode
                      ? "bg-sage/5 text-sage font-semibold"
                      : "text-slate-700"
                  }`}
                >
                  <span className="text-sm">{FLAG_EMOJI[c.code]}</span>
                  <span className="flex-1 text-left truncate">{c.name}</span>
                  <span className="text-slate-400 font-mono">{c.dial}</span>
                </button>
              </li>
            ))}
            {filteredCountries.length === 0 && (
              <li className="px-3 py-4 text-xs text-slate-400 text-center">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { COUNTRIES };
export type { Country };

