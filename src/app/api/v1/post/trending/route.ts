import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import Like from '@/models/Like';
import Comment from '@/models/Comment';
import User from '@/models/User';

export async function GET(request: Request) {
    try {
        await dbConnect();

        // Ensure models are initialized
        User.init();
        Post.init();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'shares';

        let result = [];

        if (type === 'shares') {
            result = await Post.find()
                .sort({ sharesCount: -1 })
                .limit(10)
                .populate('userId', 'username avatar');

            // Map to standard format matching aggregation output
            result = result.map((post: any) => ({
                _id: post._id,
                url: post.url,
                text: post.text,
                sharesCount: post.sharesCount,
                user: {
                    username: post.userId.username,
                    avatar: post.userId.avatar
                }
            }));
        } else if (type === 'likes') {
            result = await Like.aggregate([
                { $group: { _id: "$postId", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
                { $lookup: { from: "posts", localField: "_id", foreignField: "_id", as: "post" } },
                { $unwind: "$post" },
                { $lookup: { from: "users", localField: "post.userId", foreignField: "_id", as: "user" } },
                { $unwind: "$user" },
                { $project: { _id: "$post._id", url: "$post.url", text: "$post.text", count: "$count", type: { $literal: "likes" }, user: { username: "$user.username", avatar: "$user.avatar" } } }
            ]);
        } else if (type === 'comments') {
            result = await Comment.aggregate([
                { $group: { _id: "$postId", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
                { $lookup: { from: "posts", localField: "_id", foreignField: "_id", as: "post" } },
                { $unwind: "$post" },
                { $lookup: { from: "users", localField: "post.userId", foreignField: "_id", as: "user" } },
                { $unwind: "$user" },
                { $project: { _id: "$post._id", url: "$post.url", text: "$post.text", count: "$count", type: { $literal: "comments" }, user: { username: "$user.username", avatar: "$user.avatar" } } }
            ]);
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Fetch trending error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch trending posts' }, { status: 500 });
    }
}
