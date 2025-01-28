"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // for routing

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || isLoggedIn !== "true") {
      router.push("/auth"); // Redirect to login page if not logged in
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-teal-500 to-green-600 text-white">
      {/* Jitegemea Sacco Banner */}
      <div className="text-center py-12 px-6 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 shadow-lg rounded-xl mb-8 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold tracking-wide">Welcome to Jitegemea Sacco</h1>
        <p className="text-lg mt-6">
          Jitegemea Sacco is committed to empowering communities by offering accessible loans and financial services tailored to your needs.
        </p>
      </div>

      {/* Loan Guidelines Section */}
      <div className="bg-white p-8 shadow-xl rounded-lg mb-8 mx-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center text-blue-600">Loan Guidelines</h2>
        <ul className="list-disc pl-6 text-lg space-y-4 text-gray-700">
          <li className="flex items-center space-x-3">
            <span className="text-green-600">✔</span>
            <p>Loan eligibility is open to all registered members of the Sacco.</p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-600">✔</span>
            <p>Loan applications must be accompanied by a valid ID and proof of income.</p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-600">✔</span>
            <p>Loan repayment periods range from 3 months to 24 months.</p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-600">✔</span>
            <p>All loans attract an interest rate of 10% annually.</p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-600">✔</span>
            <p>Loans are disbursed within 48 hours of approval.</p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-600">✔</span>
            <p>Failure to repay loans on time will attract penalties as stipulated in the loan agreement.</p>
          </li>
        </ul>
      </div>

      {/* Call to Action Button */}
      <div className="text-center">
        <button
          onClick={() => router.push("/dashboard/loan")}
          className="bg-green-500 text-white py-3 px-8 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
        >
          Apply for Loan
        </button>
      </div>

      {/* Footer Section */}
      <div className="mt-16 text-center text-gray-200">
        <p>&copy; 2025 Jitegemea Sacco. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
