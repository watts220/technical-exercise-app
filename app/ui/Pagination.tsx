"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;
    const currentLimit = Number(searchParams.get("limit")) || 15;

    const createPageURL = (page: number | string, limit?: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        if (limit !== undefined) {
            params.set("limit", limit.toString());
        }
        return `${pathname}?${params.toString()}`;
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = Number(event.target.value);
        const url = createPageURL(1, newLimit);
        router.push(url);
    };

    const renderPageButtons = () => {
        const buttons = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <Link key={i} href={createPageURL(i)} passHref>
                        <button className={`join-item btn ${i === currentPage ? "btn-primary" : ""}`}>
                            {i}
                        </button>
                    </Link>
                );
            }
        } else {
            buttons.push(
                <Link key={1} href={createPageURL(1)} passHref>
                    <button className={`join-item btn ${1 === currentPage ? "btn-primary" : ""}`}>1</button>
                </Link>
            );
            if (currentPage > 3) {
                buttons.push(<button key="start-ellipsis" className="join-item btn btn-disabled">...</button>);
            }
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                buttons.push(
                    <Link key={i} href={createPageURL(i)} passHref>
                        <button className={`join-item btn ${i === currentPage ? "btn-primary" : ""}`}>
                            {i}
                        </button>
                    </Link>
                );
            }
            if (currentPage < totalPages - 2) {
                buttons.push(<button key="end-ellipsis" className="join-item btn btn-disabled">...</button>);
            }
            buttons.push(
                <Link key={totalPages} href={createPageURL(totalPages)} passHref>
                    <button className={`join-item btn ${totalPages === currentPage ? "btn-primary" : ""}`}>
                        {totalPages}
                    </button>
                </Link>
            );
        }
        return buttons;
    };

    return (
        <div className="pagination-container flex items-center justify-between space-y-0">
            <div className="flex flex-row items-center space-x-4">
                <label htmlFor="itemsPerPage" className="text-sm font-semibold whitespace-nowrap">
                    Users Per Page
                </label>
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
                {renderPageButtons()}
            </div>
        </div>
    );
}
