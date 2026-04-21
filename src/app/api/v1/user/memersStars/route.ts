import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Friends from '@/models/Friends';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();

        // Ensure User model is loaded before populate/lookup
        User.init();

        const topUsers = await Friends.aggregate([
            { $group: { _id: "$friendId", followersCount: { $sum: 1 } } },
            { $sort: { followersCount: -1 } },
            { $limit: 20 },
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            { $project: { _id: "$user._id", username: "$user.username", avatar: "$user.avatar", followersCount: 1 } }
        ]);

        return NextResponse.json({ success: true, data: topUsers });
    } catch (error) {
        console.error('Fetch top users error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch top users' }, { status: 500 });
    }
}
