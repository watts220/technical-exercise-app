import { User } from "@/types/User";

interface Metadata {
    page: number;
    count: number;
    numPages: number;
}

interface UserResponse {
    results: User[];
    metadata: Metadata;
}

export const getUsersList = async (page: number = 1, limit: number = 15): Promise<UserResponse> => {
    const response = await fetch(`https://tech-exercise.vercel.app/api/user?page=${page}&limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    
    return {
        results: data.results || [],
        metadata: data.metadata || [],
    };
};