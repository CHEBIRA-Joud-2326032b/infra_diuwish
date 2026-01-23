"use client";

import { useState } from "react";
import { depositAction, withdrawAction } from "@/app/dashboard/actions";

interface Account {
  id: number;
  account_type: string;
  balance: number;
  currency: string;
}

interface DashboardActionsProps {
  accounts: Account[];
}

export default function DashboardActions({ accounts }: DashboardActionsProps) {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [amount, setAmount] = useState<number | string>("");
  const [selectedAccountId, setSelectedAccountId] = useState<number>(
    accounts.length > 0 ? accounts[0].id : 0,
  );
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await depositAction(selectedAccountId, Number(amount));

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setAmount("");
      setTimeout(() => {
        setIsDepositModalOpen(false);
        setMessage(null);
      }, 2000);
    } else {
      setMessage({ type: "error", text: result.message });
    }
    setIsLoading(false);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await withdrawAction(selectedAccountId, Number(amount));

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setAmount("");
      setTimeout(() => {
        setIsWithdrawModalOpen(false);
        setMessage(null);
      }, 2000);
    } else {
      setMessage({ type: "error", text: result.message });
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsDepositModalOpen(false);
    setIsWithdrawModalOpen(false);
    setMessage(null);
    setAmount("");
  };

  if (!accounts || accounts.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setIsDepositModalOpen(true)}
          className="flex-1 min-w-37.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Faire un Dépôt
        </button>
        <button
          onClick={() => setIsWithdrawModalOpen(true)}
          className="flex-1 min-w-37.5 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-xl border border-gray-300 transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Retrait
        </button>
      </div>

      {/* Modal Dépôt */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-green-600 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Faire un Dépôt</h3>
              <button
                onClick={closeModal}
                className="text-white hover:bg-green-700 rounded-full p-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {message && (
                <div
                  className={`p-3 rounded-lg mb-4 text-center ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}
              <form onSubmit={handleDeposit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compte à créditer
                  </label>
                  <select
                    value={selectedAccountId}
                    onChange={(e) =>
                      setSelectedAccountId(Number(e.target.value))
                    }
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.account_type} - {acc.currency} (Solde:{" "}
                        {acc.balance})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                      placeholder="0.00"
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-lg p-2 border"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors cursor-pointer ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Traitement..." : "Confirmer le Dépôt"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Retrait */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gray-800 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Effectuer un Retrait</h3>
              <button
                onClick={closeModal}
                className="text-white hover:bg-gray-700 rounded-full p-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {message && (
                <div
                  className={`p-3 rounded-lg mb-4 text-center ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compte à débiter
                  </label>
                  <select
                    value={selectedAccountId}
                    onChange={(e) =>
                      setSelectedAccountId(Number(e.target.value))
                    }
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 p-2 border"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.account_type} - {acc.currency} (Solde:{" "}
                        {acc.balance})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                      placeholder="0.00"
                      className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-lg p-2 border"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors cursor-pointer ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Traitement..." : "Confirmer le Retrait"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
