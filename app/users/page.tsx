import React from 'react';
import UserTable from '@/app/ui/users/UsersTable/UsersTable';

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    orderBy?: string;
    order?: 'asc' | 'desc';
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 15;
  const orderBy = searchParams?.orderBy || ''; 
  const order = searchParams?.order || 'asc';

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Users List</h2>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        <UserTable page={currentPage} limit={limit} orderBy={orderBy} order={order} />
      </div>
    </div>
  );
};

