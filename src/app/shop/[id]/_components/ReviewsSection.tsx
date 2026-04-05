'use client'

import React, { useState, useEffect } from 'react';
import Star from 'lucide-react/dist/esm/icons/star';
import User from 'lucide-react/dist/esm/icons/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ReviewsSectionProps {
    productId: number;
    Review: Review[];
}

type Review = {
    id: number;
    rating: number;
    comment: string | null;
    productId: number;
    userId: number;
    username: string;
    createdAt: Date;
};

export default function ReviewsSection({ productId,Review }: ReviewsSectionProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const draft = localStorage.getItem(`review_draft_${productId}`);
        if (draft) {
            try {
                const data = JSON.parse(draft);
                if (data.rating) setRating(data.rating);
                if (data.comment) setComment(data.comment);
                setIsFormOpen(true);
            } catch (e) {}
            localStorage.removeItem(`review_draft_${productId}`);
        }
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user || session?.user?.role !== "USER") {
            localStorage.setItem(`review_draft_${productId}`, JSON.stringify({ rating, comment }));
            router.push(`/login?callbackUrl=${encodeURIComponent(`/shop/${productId}`)}`);
            return;
        }else{

            
            const res = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, rating, comment, userId: session.user.id, name: session.user.name }),
            });
            if (!res.ok) {
                throw new Error('Failed to submit review');
            }
            router.refresh()
            setSubmitted(true);
            setIsFormOpen(false);
            setSubmitted(false);
            setComment('');
            setRating(0);
        }
    };
    const userId=session?.user?.id || 0
    const newReview = Review.filter((r) => r.userId == userId).length === 0;
    console.log(newReview,"===newr");
    
    const averageRating = Review.length > 0 ? (Review.reduce((acc, curr) => acc + curr.rating, 0) / Review.length).toFixed(1) : "0.0";
    const avgInt = Math.round(parseFloat(averageRating));
    return (
        <section className="mt-16 border-t border-gray-200 dark:border-zinc-800 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Customer Reviews</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className={`w-5 h-5 ${s <= avgInt ? "" : "text-gray-300 dark:text-zinc-700"}`} fill={s <= avgInt ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span className="text-gray-500 font-medium">{averageRating} out of 5</span>
                    </div>
                </div>

                {!isFormOpen && !submitted && newReview && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-brandBlue hover:bg-brandBlue/90 text-white px-6 py-2.5 rounded-xl transition-all font-medium whitespace-nowrap"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {isFormOpen && !submitted && (
                <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-zinc-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Submit Your Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Overall Rating
                            </label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        onMouseEnter={() => setHoverRating(s)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className={`transition-colors ${(hoverRating || rating) >= s ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-700'}`}
                                    >
                                        <Star className={`w-8 h-8 ${(hoverRating || rating) >= s ? 'fill-current' : ''}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Experience
                            </label>
                            <textarea
                                id="comment"
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-brandBlue/50 outline-none transition-all resize-none"
                                placeholder="What did you like or dislike about this product?"
    
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="bg-brandBlue hover:bg-brandBlue/90 text-white px-6 py-2.5 rounded-xl transition-all font-medium"
                            >
                                {(!session?.user || session?.user?.role !== "USER") ? "Log in to Review" : "Submit Review"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl transition-all font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {submitted && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-xl mb-8 border border-green-200 dark:border-green-900/50">
                    <p className="font-medium text-center">Thank you! Your review has been submitted successfully.</p>
                </div>
            )}

            <div className="space-y-6">
                {Review.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
                ) : (
                    Review.map((rev) => (
                        <div key={rev.id} className="border border-gray-100 dark:border-zinc-800/50 rounded-2xl p-6 hover:border-brandBlue/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brandBlue/10 flex items-center justify-center text-brandBlue font-bold text-sm">
                                        {rev.username.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{rev.username}</h4>
                                        <div className="flex text-amber-500 mt-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star 
                                                    key={s} 
                                                    className={`w-4 h-4 ${s <= rev.rating ? "" : "text-gray-300 dark:text-zinc-700"}`} 
                                                    fill={s <= rev.rating ? "currentColor" : "none"} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {new Date(rev.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {rev.comment}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
