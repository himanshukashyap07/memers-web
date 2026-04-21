"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Moon, Sun } from "lucide-react";

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Initial load
    useEffect(() => {
        setMounted(true);
        const theme = localStorage.getItem("theme");
        const bodyClass = document.documentElement.classList;
        
        if (theme === "dark") {
            bodyClass.add("dark");
            setIsDark(true);
        } else if (theme === "light") {
            bodyClass.remove("dark");
            setIsDark(false);
        } else {
            // Check system preference
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                bodyClass.add("dark");
                setIsDark(true);
            }
        }
    }, []);

    const toggleTheme = () => {
        const doc = document.documentElement;
        if (doc.classList.contains("dark")) {
            doc.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
            console.log("Theme changed to LIGHT");
        } else {
            doc.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
            console.log("Theme changed to DARK");
        }
    };

    if (!mounted) {
        return (
            <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 h-20">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/Logo.png" alt="Memers Logo" width={80} height={80} className="rounded-full ring-2 ring-blue-500/30 object-cover" />
                    </div>
                    <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse" />
                </div>
            </nav>
        );
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--background)]/80 border-b border-[var(--border)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/Logo.png" alt="Memers Logo" width={80} height={80} className="rounded-full ring-2 ring-blue-500/30 object-cover" />
                    <span className="text-2xl font-[family-name:var(--font-outfit)] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Memers
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--foreground)] opacity-80">
                    <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-[var(--primary)] transition-colors">About Us</Link>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] hover:bg-blue-500/10 transition-all active:scale-90 flex items-center justify-center"
                        aria-label="Toggle theme"
                        id="theme-toggle"
                    >
                        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
                    </button>
                    <a
                        href="/assets/memers.apk"
                        download
                        className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
                    >
                        <Download className="w-4 h-4" />
                        Get App
                    </a>
                </div>
            </div>
        </nav>
    );
}
