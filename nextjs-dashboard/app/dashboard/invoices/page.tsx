"use client";

import React, { useState, useEffect } from "react";

interface Customer {
  name: string;
  phone: string;
  district: string;
  loanAmount: number;
  dueDate: string;
  balance: number;
  selfie: string;
  dateAdded: string; // Add this field to store the date when the loan was given
}

const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [userId, setUserId] = useState("user1"); // Simulating user login by ID

  // Load customers from localStorage based on userId
  useEffect(() => {
    const storedCustomers = localStorage.getItem(userId);
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, [userId]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-semibold mb-6 text-center text-blue-600">Customers Who Took Loans</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="px-4 py-2 text-left">Customer Name</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Loan Amount (KSH)</th>
              <th className="px-4 py-2 text-left">Date Given</th> 
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                  <td className="px-4 py-2">{customer.loanAmount}</td>
                  <td className="px-4 py-2">{customer.dateAdded}</td> 
                  <td className="px-4 py-2">{customer.dueDate}</td>
                  <td className="px-4 py-2">{customer.balance > 0 ? 'Active' : 'Paid'}</td> 
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;
