"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Customer {
  name: string;
  phone: string;
  district: string;
  loanAmount: number;
  dueDate: string;
  balance: number;
  selfie: string;
  dateAdded: string; // New field to store the date when the customer is added
}

const LoanTracker = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [selfie, setSelfie] = useState<string>("");
  const [userId, setUserId] = useState("user1"); // Simulating user login by ID
  const router = useRouter();

  // Load customers from localStorage based on userId
  useEffect(() => {
    const storedCustomers = localStorage.getItem(userId);
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, [userId]);

  // Handle form submission for new customers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCustomer: Customer = {
      name,
      phone,
      district,
      loanAmount,
      dueDate,
      balance: loanAmount,
      selfie,
      dateAdded: new Date().toLocaleDateString(), // Add the current date here
    };

    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);

    // Save customers to localStorage under the user ID
    localStorage.setItem(userId, JSON.stringify(updatedCustomers));

    // Clear form fields after submitting
    setName("");
    setPhone("");
    setDistrict("");
    setLoanAmount(0);
    setDueDate("");
    setSelfie("");  // If you have a selfie, you can reset the image too
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-4xl font-semibold mb-6 text-center text-blue-600">Loan Tracker</h1>

      {/* Form to add customer details */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-md mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            type="text"
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
            Loan Amount (KSH)
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-md w-full"
        >
          Add Customer
        </button>
      </form>

      {/* Button to go to the customers page */}
      <button
        onClick={() => router.push("/dashboard/customers")}
        className="bg-green-500 text-white py-3 px-6 rounded-md w-full"
      >
        Go to Customers Page
      </button>
    </div>
  );
};

export default LoanTracker;
