import React from 'react';
import Link from 'next/link';
import Pagination from '@/app/ui/Pagination';
import {getUsersList} from '@/api/usersList';

export default async function UsersTable({
    page,
    limit
}: {
    page: number;
    limit: number;
}) {
    const { results: usersList, metadata } = await getUsersList(page, limit);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user) => (
                        <tr key={user.id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.avatar}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.firstName} {user.lastName}</div>
                                        <div className="text-sm opacity-50">{user.address.country}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.paymentDetails.accountType}
                                <br />
                                <span className="badge badge-ghost badge-sm">Account: {user.paymentDetails.accountName}</span>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <th>
                                <Link href={`/user/${user.id}`}>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </Link>
                            </th>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
            <div className="my-4">
                <Pagination totalPages={metadata.numPages} />
            </div>
        </div>
    )
}