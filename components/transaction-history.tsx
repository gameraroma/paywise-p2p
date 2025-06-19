"use client"

import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Transaction {
  id: string
  type: "sent" | "received"
  recipientName: string
  payTag: string
  amount: number
  memo?: string
  date: string
  time: string
  status: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  onBack: () => void
  onViewTransaction: (transactionId: string) => void
}

export function TransactionHistory({ transactions, onBack, onViewTransaction }: TransactionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.payTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.memo?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-green-50">
              <ArrowLeft className="h-5 w-5 text-green-700" />
            </Button>
            <h1 className="text-lg font-semibold text-neutral-800">Transaction History</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-neutral-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Transactions List */}
        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-800">All Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <p>No transactions found</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 cursor-pointer hover:bg-green-50 hover:border-green-200 transition-colors"
                  onClick={() => onViewTransaction(transaction.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "sent" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                      }`}
                    >
                      {transaction.type === "sent" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-neutral-800">
                        {transaction.type === "sent" ? "To" : "From"} {transaction.recipientName}
                      </p>
                      <p className="text-xs text-neutral-500">{transaction.payTag}</p>
                      {transaction.memo && (
                        <p className="text-xs text-neutral-400 truncate max-w-32">{transaction.memo}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === "sent" ? "text-red-600" : "text-green-600"}`}>
                      {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-500">{transaction.date}</p>
                    <p className="text-xs text-neutral-400">{transaction.time}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
