import React from "react";
import { Flame, Users, Share2, Target, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-500/30 font-[family-name:var(--font-inter)] pt-10">
            <div className="max-w-6xl mx-auto px-6 py-20">
                
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-outfit)] font-bold mb-6 text-[var(--foreground)]">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Memers</span>
                    </h1>
                    <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto leading-relaxed">
                        Memers is more than just an app—it's the ultimate hub for internet culture. We've built a platform specifically designed for creators and fans of humor to share, discover, and laugh together!
                    </p>
                </div>

                {/* Features Highlights */}
                <div className="space-y-24">
                    {/* Feature 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20">
                                <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-3xl font-[family-name:var(--font-outfit)] font-bold mb-4 text-[var(--foreground)]">Discover Trending Content</h2>
                            <p className="text-[var(--muted)] text-lg leading-relaxed">
                                Our sophisticated algorithm consistently surfaces the most liked, shared, and debated memes. Experience the power of the internet's front page for humor where nothing good gets left behind.
                            </p>
                        </div>
                        <div className="md:w-1/2 aspect-video bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-sm flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Target className="w-20 h-20 text-[var(--foreground)] opacity-5" />
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-3xl font-[family-name:var(--font-outfit)] font-bold mb-4 text-[var(--foreground)]">Built for a Thriving Community</h2>
                            <p className="text-[var(--muted)] text-lg leading-relaxed">
                                Want to become internet famous? Connect directly with creators, build your own follower base, and try to establish your spot on our globally recognized "Top 20 Memers Stars" leaderboard.
                            </p>
                        </div>
                        <div className="md:w-1/2 aspect-video bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-sm flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Globe className="w-20 h-20 text-[var(--foreground)] opacity-5" />
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                                <Share2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-[family-name:var(--font-outfit)] font-bold mb-4 text-[var(--foreground)]">Frictionless Sharing</h2>
                            <p className="text-[var(--muted)] text-lg leading-relaxed">
                                See a meme so funny you have to show your friends? Our native share integrations allow you to share content instantly to Whatsapp, Instagram, or wherever your social circle is!
                            </p>
                        </div>
                        <div className="md:w-1/2 aspect-video bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-sm flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Share2 className="w-20 h-20 text-[var(--foreground)] opacity-5" />
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
