"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Download, MessageSquare, Share2, Heart, Users, CheckCircle2, Flame } from "lucide-react";

export default function Home() {
    const [topUsers, setTopUsers] = useState<any[]>([]);
    const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
    const [trendingType, setTrendingType] = useState<"likes" | "comments" | "shares">("shares");
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);

    const fetchTopUsers = async () => {
        try {
            setLoadingUsers(true);
            const res = await axios.get("/api/v1/user/memersStars");
            if (res.data.success) {
                setTopUsers(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch top users:", err);
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchTrendingPosts = async (type: string) => {
        try {
            setLoadingPosts(true);
            const res = await axios.get(`/api/v1/post/trending?type=${type}`);
            if (res.data.success) {
                setTrendingPosts(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch trending posts:", err);
        } finally {
            setLoadingPosts(false);
        }
    };

    useEffect(() => {
        fetchTopUsers();
    }, []);

    useEffect(() => {
        fetchTrendingPosts(trendingType);
    }, [trendingType]);

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-500/30 font-[family-name:var(--font-inter)]">

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20 px-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold font-[family-name:var(--font-outfit)] tracking-tight leading-tight">
                        The internet's front page for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            Trending Memes
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                        Join the fastest growing community of meme creators. Laugh, share, and rise to the top of the leaderboards.
                    </p>
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/assets/memers.apk"
                            download
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
                        >
                            <Download className="w-5 h-5" />
                            Download Memers App
                        </a>
                        <div className="flex items-center gap-2 text-sm text-[var(--muted)] px-4 py-2 bg-[var(--surface)] rounded-full border border-[var(--border)]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>v0.0.1 (Android)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top 20 Memers Stars (Horizontal Scroll) */}
            <section className="py-20 bg-[var(--surface)]/50 border-y border-[var(--border)]" id="stars">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Users className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-outfit)] font-bold text-[var(--foreground)]">Top 20 Memers Stars</h2>
                    </div>

                    {loadingUsers ? (
                        <div className="flex gap-6 overflow-hidden">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="min-w-[140px] h-[180px] bg-[var(--surface)] border border-[var(--border)] rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="flex gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar">
                            {topUsers.map((user, idx) => (
                                <div key={user._id} className="min-w-[140px] flex flex-col items-center p-6 bg-[var(--surface)] border border-[var(--border)] shadow-sm rounded-2xl snap-start hover:-translate-y-2 transition-transform duration-300">
                                    <div className="relative mb-4">
                                        <div className="absolute -top-2 -left-2 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 shadow-sm">
                                            #{idx + 1}
                                        </div>
                                        <img
                                            src={user.avatar === "guestImage" ? "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.username : user.avatar}
                                            alt={user.username}
                                            className="w-16 h-16 rounded-full ring-2 ring-blue-500/20 object-cover"
                                            onError={(e) => { (e.target as any).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.username }}
                                        />
                                    </div>
                                    <h3 className="font-bold text-sm text-[var(--foreground)] truncate w-full text-center">{user.username}</h3>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">{user.followersCount} Followers</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Trending Memes */}
            <section className="py-20 px-6 max-w-7xl mx-auto" id="trending">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-outfit)] font-bold text-[var(--foreground)] mb-4">Trending Memes</h2>
                        <p className="text-[var(--muted)]">Discover what's making the internet laugh today.</p>
                    </div>
                    {/* Filters */}
                    <div className="flex bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] shadow-sm text-sm font-medium">
                        <button
                            onClick={() => setTrendingType("shares")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all ${trendingType === "shares" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                        >
                            <Share2 className="w-4 h-4" /> Shares
                        </button>
                        <button
                            onClick={() => setTrendingType("likes")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all ${trendingType === "likes" ? "bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                        >
                            <Heart className="w-4 h-4" /> Likes
                        </button>
                        <button
                            onClick={() => setTrendingType("comments")}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all ${trendingType === "comments" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                        >
                            <MessageSquare className="w-4 h-4" /> Comments
                        </button>
                    </div>
                </div>


                {loadingPosts ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-[4/5] bg-[var(--surface)] rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trendingPosts.map((post) => (
                            <div key={post._id} className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-blue-500/50 shadow-sm hover:shadow-lg transition-all">
                                <div className="aspect-square w-full overflow-hidden bg-[var(--background)]/50">
                                    <img
                                        src={post.url}
                                        alt={post.text}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={post.user?.avatar === "guestImage" ? "https://api.dicebear.com/7.x/avataaars/svg?seed=" + post.user?.username : post.user?.avatar}
                                            alt={post.user?.username}
                                            className="w-8 h-8 rounded-full border border-[var(--border)] object-cover"
                                            onError={(e) => { (e.target as any).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + post.user?.username }}
                                        />
                                        <span className="text-sm font-semibold text-[var(--foreground)]">@{post.user?.username}</span>
                                    </div>
                                    <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4">{post.text}</p>

                                    <div className="flex items-center gap-4 text-sm font-medium text-[var(--muted)]">
                                        {trendingType === "shares" && (
                                            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
                                                <Share2 className="w-4 h-4" /> {post.sharesCount}
                                            </div>
                                        )}
                                        {trendingType === "likes" && (
                                            <div className="flex items-center gap-1.5 text-pink-600 dark:text-pink-400 bg-pink-500/10 px-2 py-1 rounded-md">
                                                <Heart className="w-4 h-4" /> {post.count}
                                            </div>
                                        )}
                                        {trendingType === "comments" && (
                                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                                                <MessageSquare className="w-4 h-4" /> {post.count}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </section>
        </main>
    );
}
