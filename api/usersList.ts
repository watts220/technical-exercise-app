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

export const getUsersList = async (
    page: number = 1,
    limit: number = 15,
    orderBy?: string,
    order?: 'asc' | 'desc'
): Promise<UserResponse> => {
    const queryParams = new URLSearchParams({
        page: `${page}`,
        limit: `${limit}`,
    });

    if (orderBy) queryParams.append('orderBy', orderBy);
    if (order) queryParams.append('order', order);

    const response = await fetch(`https://tech-exercise.vercel.app/api/user?${queryParams.toString()}`);

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();

    return {
        results: data.results || [],
        metadata: data.metadata || { page: 1, count: 0, numPages: 1 },
    };
};