"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorBannerProps {
    message: string | null;
    onDismiss?: () => void;
    variant?: "error" | "warning";
}

export default function ErrorBanner({ message, onDismiss, variant = "error" }: ErrorBannerProps) {
    useEffect(() => {
        if (!message || !onDismiss) return;
        const timer = setTimeout(onDismiss, 5000);
        return () => clearTimeout(timer);
    }, [message, onDismiss]);

    const colors = variant === "error"
        ? "bg-red-50 border-red-200 text-red-700"
        : "bg-amber-50 border-amber-200 text-amber-700";

    const iconColor = variant === "error" ? "text-red-500" : "text-amber-500";

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    role="alert"
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm ${colors}`}
                >
                    <AlertTriangle className={`w-4 h-4 shrink-0 ${iconColor}`} />
                    <span className="flex-1">{message}</span>
                    {onDismiss && (
                        <button
                            type="button"
                            onClick={onDismiss}
                            aria-label="Dismiss error"
                            className="p-0.5 rounded hover:bg-black/5 transition-colors shrink-0"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

