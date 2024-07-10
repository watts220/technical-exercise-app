"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get('page')) || 1;
    const currentLimit = Number(searchParams.get('limit')) || 15;

    const createPageURL = (page: number | string, limit?: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        if (limit !== undefined) {
            params.set('limit', limit.toString());
        }
        return `${pathname}?${params.toString()}`;
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = Number(event.target.value);
        const url = createPageURL(1, newLimit);
        router.push(url);
    };

    return (
        <div className="pagination-container flex items-center justify-between space-y-0">
            <div className="flex flex-row items-center space-x-4">
                <label htmlFor="itemsPerPage" className="text-sm font-semibold whitespace-nowrap">Users Per Page</label>
                <select
                    id="itemsPerPage"
                    className="select select-bordered w-full max-w-xs"
                    value={currentLimit}
                    onChange={handleLimitChange}
                >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div className="join">
                {currentPage > 1 ? (
                    <Link href={createPageURL(currentPage - 1)} passHref>
                        <button className="join-item btn">«</button>
                    </Link>
                ) : (
                    <button className="join-item btn" disabled>«</button>
                )}

                <button className="join-item btn">
                    Page {currentPage}
                </button>

                {currentPage < totalPages ? (
                    <Link href={createPageURL(currentPage + 1)} passHref>
                        <button className="join-item btn">»</button>
                    </Link>
                ) : (
                    <button className="join-item btn" disabled>»</button>
                )}
            </div>
        </div>
    );
}
