import React from 'react';
import { fetchUser } from '@/api/userDetails';
import UserDetails from '@/app/ui/users/UserDetails/UserDetails';


export default async function UserPage({ params }: { params: { id: string } }) {
    const user = await fetchUser(params.id);

    return <UserDetails user={user} />;
}
