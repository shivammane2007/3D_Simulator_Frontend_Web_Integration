"use client";

import { useState, useEffect } from "react";
import DemoRequestForm from "./DemoRequestForm";

/**
 * Global modal wrapper that listens for the custom 'openDemoModal' event.
 * Any component can trigger it with: window.dispatchEvent(new CustomEvent('openDemoModal', { detail: { source: 'hero' } }))
 */
export default function DemoModalWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [source, setSource] = useState("modal");

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setSource(detail?.source || "modal");
            setIsOpen(true);
        };
        window.addEventListener("openDemoModal", handler);
        return () => window.removeEventListener("openDemoModal", handler);
    }, []);

    return <DemoRequestForm isOpen={isOpen} onClose={() => setIsOpen(false)} source={source} />;
}

