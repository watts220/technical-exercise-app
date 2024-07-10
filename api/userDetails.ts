import { User } from "@/types/User";

export const fetchUser = async (id: string): Promise<User> => {
    const response = await fetch(`https://tech-exercise.vercel.app/api/user/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
};