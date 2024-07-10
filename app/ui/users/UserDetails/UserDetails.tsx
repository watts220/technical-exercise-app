// UserDetails.jsx
'use client';

import React, { useState, FC } from "react";
import { User } from "@/types/User";
import styles from "@/app/ui/users/UserDetails/style.module.css";

const hashData = (str:string) => {
    return str.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0).toString(16);
    }, '0x');
};

interface UserDetailsProps {
    user: User;
}

const UserDetails: FC<UserDetailsProps> = ({ user }) => {

    const [showSensitiveData, setShowSensitiveData] = useState(false);

    const handleToggleClick = () => {
        setShowSensitiveData(!showSensitiveData);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-4">User Details</h2>
            <div className="card card-bordered shadow-md rounded-lg p-6">
                <div className="flex items-center justify-center flex-col gap-3 mb-4">
                    <div className="avatar">
                        <div className="rounded-full w-24 h-24">
                            <img
                                src={user.avatar}
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-center">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500 text-center">{user.address.city}</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title">Contact Information</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title">Personal Information</h3>
                            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                            <p>
                                <strong>NINO:</strong>
                                <span className={showSensitiveData ? '' : styles.blurSensitive}>
                                    {showSensitiveData ? user.nino : hashData(user.nino)}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-sm col-span-full">
                        <div className="card-body">
                            <h3 className="card-title">Address</h3>
                            <p>
                                {`${user.address.addressLine1}, 
                                ${user.address.addressLine2 ? user.address.addressLine2 + ', ' : ''}
                                ${user.address.addressLine3 ? user.address.addressLine3 + ', ' : ''}
                                ${user.address.city}, ${user.address.postCode}, ${user.address.country}`}
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-sm col-span-full">
                        <div className="card-body">
                            <h3 className="card-title">Payment Details</h3>
                            <p><strong>Account Type:</strong> {user.paymentDetails.accountType}</p>
                            <p><strong>Account Name:</strong> {user.paymentDetails.accountName}</p>
                            <p>
                                <strong>Sort Code:</strong>
                                <span className={showSensitiveData ? '' : styles.blurSensitive}>
                                    {showSensitiveData ? user.paymentDetails.sortCode : hashData(user.paymentDetails.sortCode)}
                                </span>
                            </p>
                            <p>
                                <strong>Account Number:</strong>
                                <span className={showSensitiveData ? '' : styles.blurSensitive}>
                                    {showSensitiveData ? user.paymentDetails.accountNumber : hashData(user.paymentDetails.accountNumber)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <button className="btn btn-primary" onClick={handleToggleClick}>
                        {showSensitiveData ? 'Hide Details' : 'Show Details'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;