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
}

const CustomerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [paymentAmounts, setPaymentAmounts] = useState<{ [key: number]: number }>({}); // Track payments per customer
  const [userId, setUserId] = useState("user1"); // Simulating user login by ID

  // Load customers from localStorage based on userId
  useEffect(() => {
    const storedCustomers = localStorage.getItem(userId);
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, [userId]);

  // Delete customer
  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      const updatedCustomers = customers.filter((_, idx) => idx !== index);
      setCustomers(updatedCustomers);
      localStorage.setItem(userId, JSON.stringify(updatedCustomers)); // Save updated list
    }
  };

  // Handle loan payment and update balance
  const handlePayment = (index: number) => {
    const updatedCustomers = [...customers];
    const customer = updatedCustomers[index];

    const paymentAmount = paymentAmounts[index] || 0; // Use payment amount for the specific customer

    if (paymentAmount > 0 && paymentAmount <= customer.balance) {
      customer.balance -= paymentAmount; // Deduct payment from balance
      setCustomers(updatedCustomers);
      localStorage.setItem(userId, JSON.stringify(updatedCustomers)); // Save updated list
      setPaymentAmounts((prev) => ({ ...prev, [index]: 0 })); // Reset the payment field for the customer
    } else {
      alert("Invalid payment amount!");
    }
  };

  // Generate the printable customer details
  const printReceipt = (customer: Customer) => {
    const receiptContent = `
      <div style="font-family: Arial, sans-serif; width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
        <div style="margin-bottom: 20px;">
          <h1 style="font-size: 32px; color: #4a90e2; margin: 0;">Jitegemea Sacco</h1>
          <p style="font-size: 18px; margin: 5px 0; color: #777;">Loan Payment Receipt</p>
        </div>
  
        <div style="margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 20px;">
          <p style="font-size: 16px; margin: 10px 0;"><strong>Name:</strong> ${customer.name}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>Phone:</strong> ${customer.phone}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>District:</strong> ${customer.district}</p>
        </div>
  
        <div style="margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 20px;">
          <p style="font-size: 16px; margin: 10px 0;"><strong>Loan Amount:</strong> KSH ${customer.loanAmount}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>Remaining Balance:</strong> KSH ${customer.balance}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>Due Date:</strong> ${new Date(customer.dueDate).toLocaleDateString()}</p>
        </div>
  
        <div style="margin-bottom: 20px;">
          <p style="font-size: 16px; margin: 10px 0;"><strong>Status:</strong> ${customer.balance <= 0 ? 'Paid Off' : 'Pending Payment'}</p>
        </div>
  
        <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 30px;">
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>&copy; 2025 Jitegemea Sacco - All rights reserved</p>
        </div>
      </div>
    `;
  
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow?.document.write(receiptContent);
    printWindow?.document.close();
    printWindow?.print();
  };
  
  // Function to calculate time remaining until loan is due
  const calculateTimeRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const timeRemaining = due.getTime() - now.getTime();
    
    const daysRemaining = Math.floor(timeRemaining / (1000 * 3600 * 24)); // Convert time to days
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 3600)) / (1000 * 60));

    return { daysRemaining, hoursRemaining, minutesRemaining };
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-4xl font-semibold mb-6 text-center text-blue-600">Customer Details</h1>

      {/* Display customers */}
      {customers.length === 0 ? (
        <p className="text-center text-gray-500">No customers added yet.</p>
      ) : (
        <div className="space-y-6">
          {customers.map((customer, index) => {
            const { daysRemaining, hoursRemaining, minutesRemaining } = calculateTimeRemaining(customer.dueDate);
            return (
              <div key={index} className="flex justify-between items-center border-b py-6 px-4 bg-white shadow-lg rounded-md">
                <div className="flex items-center">
                
                 
                  <div>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                    <p><strong>District:</strong> {customer.district}</p>
                    <p><strong>Loan Amount:</strong> KSH {customer.loanAmount}</p>
                    <p><strong>Remaining Balance:</strong> KSH {customer.balance}</p>
                    <p><strong>Due Date:</strong> {new Date(customer.dueDate).toLocaleDateString()}</p>
                    <p><strong>Time Remaining:</strong> {daysRemaining} days, {hoursRemaining} hours, {minutesRemaining} minutes</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  {/* Payment Section */}
                  <input
                    type="number"
                    placeholder="Payment Amount (KSH)"
                    value={paymentAmounts[index] || 0} // Get the payment amount for the specific customer
                    onChange={(e) => setPaymentAmounts((prev) => ({ ...prev, [index]: Number(e.target.value) }))}
                    className="border p-3 mb-2 rounded-md w-full"
                  />
                  <button
                    onClick={() => handlePayment(index)}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mb-2 w-full"
                  >
                    Make Payment
                  </button>
                  <button
                    onClick={() => printReceipt(customer)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
                  >
                    Print Details
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md mt-2 w-full"
                  >
                    Delete Customer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
