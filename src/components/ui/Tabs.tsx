"use client";

import { useState, useId, useRef } from "react";

export interface TabItem {
    id: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}

export interface TabsProps {
    tabs: TabItem[];
    /** Controlled active tab id */
    activeTab?: string;
    /** Default active tab id (uncontrolled) */
    defaultTab?: string;
    onChange?: (tabId: string) => void;
    className?: string;
    tabListClassName?: string;
    tabClassName?: string;
    activeTabClassName?: string;
    panelClassName?: string;
    /** Orientation of the tab list */
    orientation?: "horizontal" | "vertical";
    /** Renders every panel, hiding the inactive ones, so all content is in the HTML. */
    keepMounted?: boolean;
    /** "pill": a rounded segmented bar that scrolls sideways when the labels overflow. */
    variant?: "plain" | "pill";
}

const PILL = {
    list: "w-full gap-1 overflow-x-auto rounded-full [scrollbar-width:none] border border-mist bg-cream p-1 md:inline-flex md:w-auto",
    tab: "min-h-11 shrink-0 grow whitespace-nowrap rounded-full px-2 text-xs leading-tight font-semibold text-slate-hp md:flex-none md:px-5 md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2",
    active: "bg-sage text-white",
};

export default function Tabs({
    tabs,
    activeTab: controlledTab,
    defaultTab,
    onChange,
    className = "",
    tabListClassName = "",
    tabClassName = "",
    activeTabClassName = "",
    panelClassName = "",
    orientation = "horizontal",
    keepMounted = false,
    variant = "plain",
}: TabsProps) {
    const pill = variant === "pill";
    const baseId = useId();
    const isControlled = controlledTab !== undefined;
    const [internalTab, setInternalTab] = useState<string>(
        defaultTab ?? tabs[0]?.id ?? ""
    );

    const currentTab = isControlled ? controlledTab : internalTab;

    const tabListRef = useRef<HTMLDivElement>(null);

    function selectTab(id: string) {
        if (!isControlled) setInternalTab(id);
        onChange?.(id);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        const enabledTabs = tabs.filter((t) => !t.disabled);
        const currentEnabledIndex = enabledTabs.findIndex((t) => t.id === tabs[index].id);

        const isHorizontal = orientation === "horizontal";
        const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
        const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";

        let targetIndex: number | null = null;

        if (e.key === nextKey) {
            targetIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        } else if (e.key === prevKey) {
            targetIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        } else if (e.key === "Home") {
            targetIndex = 0;
        } else if (e.key === "End") {
            targetIndex = enabledTabs.length - 1;
        }

        if (targetIndex !== null) {
            e.preventDefault();
            const targetTab = enabledTabs[targetIndex];
            selectTab(targetTab.id);
            // Move DOM focus to the newly selected tab button
            const btn = tabListRef.current?.querySelector<HTMLButtonElement>(
                `[data-tab-id="${targetTab.id}"]`
            );
            btn?.focus();
        }
    }

    const panels = keepMounted ? tabs : tabs.filter((t) => t.id === currentTab);

    return (
        <div
            className={`${orientation === "vertical" ? "flex gap-4" : ""} ${className}`}
            data-testid="tabs"
        >
            {/* Tab list */}
            <div
                ref={tabListRef}
                role="tablist"
                aria-orientation={orientation}
                className={`flex ${
                    orientation === "vertical" ? "flex-col" : "flex-row"
                } ${pill ? PILL.list : ""} ${tabListClassName}`}
            >
                {tabs.map((tab, i) => {
                    const isActive = tab.id === currentTab;
                    const tabId = `${baseId}-tab-${tab.id}`;
                    const panelId = `${baseId}-panel-${tab.id}`;

                    return (
                        <button
                            key={tab.id}
                            id={tabId}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={panelId}
                            aria-disabled={tab.disabled}
                            disabled={tab.disabled}
                            tabIndex={isActive ? 0 : -1}
                            data-tab-id={tab.id}
                            onClick={() => !tab.disabled && selectTab(tab.id)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className={[
                                pill ? PILL.tab : "",
                                tabClassName,
                                isActive && pill ? PILL.active : "",
                                isActive ? activeTabClassName : "",
                                tab.disabled ? "cursor-not-allowed opacity-50" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {panels.map((tab) => (
                <div
                    key={tab.id}
                    id={`${baseId}-panel-${tab.id}`}
                    role="tabpanel"
                    aria-labelledby={`${baseId}-tab-${tab.id}`}
                    tabIndex={0}
                    hidden={tab.id !== currentTab}
                    className={panelClassName}
                    data-testid="tab-panel"
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
}
