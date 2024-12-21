'use client'
import React, { useState, useEffect } from "react";
import TransactionModal from "./AddTransactionButton";
import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions";
import Loader from "./Loader";

const PaymentsTable = ({ type }: { type: "home-page" | "view-transactions-page" }) => {
  const [transactions, setTransactions] = useState<string[]>([]);
  const [transactionAmounts, setTransactionAmounts] = useState<number[]>([]);
  const [transactionCategories, setTransactionCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Items per page
  const itemsPerPage = type === "view-transactions-page" ? 6 : 3;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedIn = await getLoggedInUser();
        const userInfo = await getUserInfo({ userId: loggedIn.targets[0].userId });

        // Destructure Transactions, Transaction_amounts, and Transaction_categories from userInfo
        const { Transactions, Transaction_amounts, Transaction_categories } = userInfo;

        // Set state with the fetched data
        setTransactions(Transactions);
        setTransactionAmounts(Transaction_amounts);
        setTransactionCategories(Transaction_categories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedTransactions = transactions.slice(startIndex, endIndex);
  const displayedTransactionAmounts = transactionAmounts.slice(startIndex, endIndex);
  const displayedTransactionCategories = transactionCategories.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="mx-auto mt-8 max-w-screen-lg px-2">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">
            {type === "view-transactions-page" ? "See the money you have spent" : "Your recent transactions"}
          </p>
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                {/* <label className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"> Sort by: </label>
                <select className="sm:mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                  <option className="whitespace-no-wrap text-sm">Recent</option>
                </select> */}
              </div>
              <TransactionModal />
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6" width="10%">
                  Transaction
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Category</td>
              </tr>
            </thead>
            <tbody className="lg:border-gray-300">
              {displayedTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6" width="50%">
                    {transaction}
                  </td>
                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    ₹{displayedTransactionAmounts[index]}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                      {displayedTransactionCategories[index]}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {type === "view-transactions-page" && (
            <div className="mt-4 flex justify-between">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium ${currentPage === 1 ? "text-gray-400" : "text-blue-600"}`}
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium ${currentPage === totalPages ? "text-gray-400" : "text-blue-600"}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;
