"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import PhoneInput, { COUNTRIES, formatE164 } from "@/components/ui/PhoneInput";

interface DemoRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
    source?: string;
}

export default function DemoRequestForm({ isOpen, onClose, source = "modal" }: DemoRequestFormProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        practiceName: "",
        role: "Surgeon",
        proceduresPerMonth: "",
        message: "",
    });

    const [phoneCountry, setPhoneCountry] = useState(() => {
        if (typeof window === "undefined") return "IN";
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
            const TZ_TO_COUNTRY: Record<string, string> = {
                "Asia/Kolkata": "IN",
                "Asia/Calcutta": "IN",
                "Asia/Bangkok": "TH",
                "Asia/Seoul": "KR",
                "Asia/Tokyo": "JP",
                "Asia/Singapore": "SG",
                "Asia/Kuala_Lumpur": "MY",
                "Asia/Jakarta": "ID",
                "Asia/Manila": "PH",
                "Asia/Dubai": "AE",
                "Europe/London": "GB",
                "America/New_York": "US",
                "America/Los_Angeles": "US",
                "America/Chicago": "US",
                "Australia/Sydney": "AU",
            };
            return TZ_TO_COUNTRY[tz] ?? "IN";
        } catch {
            return "IN";
        }
    });

    const [phoneValid, setPhoneValid] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const isValid =
        formData.fullName.trim() &&
        formData.email.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        formData.phone.trim() &&
        phoneValid;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!isValid) return;

        setStatus("loading");
        setErrorMessage("");

        const country = COUNTRIES.find((c) => c.code === phoneCountry) ?? COUNTRIES[0];
        const phoneE164 = formatE164(formData.phone, country);

        try {
            const res = await fetch("/api/demo-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, phone: phoneE164, source }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Submission failed");
            }

            setStatus("success");
            trackEvent("schedule_demo_click", { email: formData.email, source });
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
    };

    const handleClose = () => {
        if (status === "success") {
            setFormData({ fullName: "", email: "", phone: "", practiceName: "", role: "Surgeon", proceduresPerMonth: "", message: "" });
            setPhoneValid(false);
            setStatus("idle");
            setSubmitted(false);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 w-full max-w-lg"
                    >
                        <div
                            ref={dialogRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="demo-modal-title"
                            className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                <div>
                                    <h2 id="demo-modal-title" className="text-xl font-bold text-ink">Schedule a Demo</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">We&apos;ll be in touch within 24 hours</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    aria-label="Close demo request form"
                                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>

                            {status === "success" ? (
                                <div className="p-10 text-center">
                                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-ink mb-2">Demo Request Received</h3>
                                    <p className="text-sm text-slate-500 mb-6">
                                        Our clinical team will reach out to <span className="font-medium text-slate-700">{formData.email}</span> within 24 hours to schedule your personalized demo.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="w-full px-6 py-2.5 bg-sage hover:bg-sage-light text-white font-semibold rounded-lg transition-colors text-sm"
                                    >
                                        Done. We&apos;ll be in touch
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    {/* Full Name */}
                                    <div>
                                        <label htmlFor="demo-fullname" className="block text-xs font-bold text-slate-500 mb-1.5">
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="demo-fullname"
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData((d) => ({ ...d, fullName: e.target.value }))}
                                            placeholder="Dr. Jane Smith"
                                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                                        />
                                        {submitted && !formData.fullName.trim() && (
                                            <p className="mt-1 text-xs text-red-500">Full name is required</p>
                                        )}
                                    </div>

                                    {/* Professional Email */}
                                    <div>
                                        <label htmlFor="demo-req-email" className="block text-xs font-bold text-slate-500 mb-1.5">
                                            Professional Email <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="demo-req-email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                                            placeholder="dr.smith@clinic.com"
                                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                                        />
                                        {submitted && !formData.email.trim() && (
                                            <p className="mt-1 text-xs text-red-500">Professional email is required</p>
                                        )}
                                    </div>

                                    {/* Mobile / WhatsApp */}
                                    <div>
                                        <label htmlFor="demo-phone" className="block text-xs font-bold text-slate-500 mb-1.5">
                                            Mobile / WhatsApp <span className="text-red-400">*</span>
                                        </label>
                                        <PhoneInput
                                            id="demo-phone"
                                            countryCode={phoneCountry}
                                            onCountryChange={setPhoneCountry}
                                            value={formData.phone}
                                            onChange={(phone, _full, valid) => {
                                                setFormData((d) => ({ ...d, phone }));
                                                setPhoneValid(valid);
                                            }}
                                            placeholder="912 345 6789"
                                        />
                                        <p className="mt-1 text-[11px] text-slate-400">
                                            We use this to confirm the demo time, not for marketing.
                                        </p>
                                        {submitted && (!formData.phone.trim() || !phoneValid) && (
                                            <p className="mt-1 text-xs text-red-500">Valid phone number is required</p>
                                        )}
                                    </div>

                                    {/* Practice / Clinic Name */}
                                    <div>
                                        <label htmlFor="demo-practice" className="block text-xs font-bold text-slate-500 mb-1.5">
                                            Practice / Clinic Name
                                        </label>
                                        <input
                                            id="demo-practice"
                                            type="text"
                                            value={formData.practiceName}
                                            onChange={(e) => setFormData((d) => ({ ...d, practiceName: e.target.value }))}
                                            placeholder="Smith Aesthetics"
                                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                                        />
                                    </div>

                                    {/* Role & Procedures per month */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="demo-role" className="block text-xs font-bold text-slate-500 mb-1.5">
                                                Role
                                            </label>
                                            <select
                                                id="demo-role"
                                                value={formData.role}
                                                onChange={(e) => setFormData((d) => ({ ...d, role: e.target.value }))}
                                                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all bg-white"
                                            >
                                                <option value="Surgeon">Surgeon</option>
                                                <option value="Clinic Owner">Clinic Owner</option>
                                                <option value="Practice Manager">Practice Manager</option>
                                                <option value="Aesthetician">Aesthetician</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="demo-procedures" className="block text-xs font-bold text-slate-500 mb-1.5">
                                                # Procedures / Month
                                            </label>
                                            <select
                                                id="demo-procedures"
                                                value={formData.proceduresPerMonth}
                                                onChange={(e) => setFormData((d) => ({ ...d, proceduresPerMonth: e.target.value }))}
                                                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all appearance-none cursor-pointer bg-white"
                                            >
                                                <option value="">Select...</option>
                                                <option value="1-10">1 - 10</option>
                                                <option value="11-30">11 - 30</option>
                                                <option value="31-50">31 - 50</option>
                                                <option value="50+">50+</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="demo-message" className="block text-xs font-bold text-slate-500 mb-1.5">
                                            Message <span className="text-slate-400 font-normal">(optional)</span>
                                        </label>
                                        <textarea
                                            id="demo-message"
                                            rows={3}
                                            value={formData.message}
                                            onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                                            placeholder="Tell us about your practice or any specific procedures you're interested in..."
                                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all resize-none"
                                        />
                                    </div>

                                    {errorMessage && (
                                        <p role="alert" className="text-sm text-red-500 font-medium">
                                            {errorMessage}
                                        </p>
                                    )}

                                    {/* Submit */}
                                    <div className="relative group pt-2">
                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full py-3 bg-sage hover:bg-sage-light text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                                        >
                                            {status === "loading" ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    Schedule a Demo
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                        {!isValid && submitted && status !== "loading" && (
                                            <p className="mt-1.5 text-center text-xs text-red-500">
                                                Please fill out all required fields marked with *
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-center text-xs text-slate-400">
                                        No hardware required. Cancel anytime.
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

