import React from 'react';

export default function Header() {
    return (
        <header className="bg-primary text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">User Management System</h1>
                <nav>
                    <a href="/" className="mx-2">Home</a>
                    <a href="/users" className="mx-2">Users List</a>
                </nav>
            </div>
        </header>
    );
};
