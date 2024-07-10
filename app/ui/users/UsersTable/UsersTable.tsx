import React from 'react';
import Link from 'next/link';
import Pagination from '@/app/ui/Pagination';
import { getUsersList } from '@/api/usersList';

interface Props {
    page: number;
    limit: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
}

export default async function UsersTable({
    page,
    limit,
    orderBy,
    order,
}: Props) {
    const { results: usersList, metadata } = await getUsersList(page, limit, orderBy, order);

    const generateSortLink = (field: string) => {
        let newOrder = 'asc';
        if (orderBy === field && order === 'asc') {
            newOrder = 'desc';
        }
        return `?page=${page}&limit=${limit}&orderBy=${field}&order=${newOrder}`;
    };

    const renderSortIcon = (field: string) => {
        if (orderBy === field) {
            return order === 'asc' ? (
                <span className="ml-1">&#x2191;</span> // Up Arrow
            ) : (
                <span className="ml-1">&#x2193;</span> // Down Arrow
            );
        } else {
            return <span className="ml-1">&#x2195;</span>; // Default Arrow
        }
    };

    return (
        <div>
            <table className="table-auto w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2"></th>
                        <th className="p-2">
                            <Link href={generateSortLink('firstName')}>
                                First Name {renderSortIcon('firstName')}
                            </Link>
                        </th>
                        <th className="p-2">
                            <Link href={generateSortLink('lastName')}>
                                Last Name {renderSortIcon('lastName')}
                            </Link>
                        </th>
                        <th className="p-2">City</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone Number</th>
                        <th className="p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user) => (
                        <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="p-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={user.avatar}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className="rounded-full"
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="p-2">{user.firstName}</td>
                            <td className="p-2">{user.lastName}</td>
                            <td className="p-2">{user.address.city}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.phoneNumber}</td>
                            <td className="p-2">
                                <Link href={`/users/${user.id}`}>
                                    <button className="btn btn-success">details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="my-4">
                <Pagination totalPages={metadata.numPages} />
            </div>
        </div>
    );
};