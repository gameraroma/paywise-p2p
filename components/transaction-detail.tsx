"use client"

import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt } from "@/components/receipt"
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

interface TransactionDetailProps {
  transaction: Transaction
  onBack: () => void
}

export function TransactionDetail({ transaction, onBack }: TransactionDetailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(transaction.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Transaction Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <Card>
          <CardContent className="text-center py-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                transaction.type === "sent" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {transaction.type === "sent" ? (
                <ArrowUpRight className="h-8 w-8" />
              ) : (
                <ArrowDownLeft className="h-8 w-8" />
              )}
            </div>
            <h2
              className={`text-2xl font-bold mb-2 ${transaction.type === "sent" ? "text-red-600" : "text-green-600"}`}
            >
              {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
            </h2>
            <p className="text-gray-600">
              {transaction.type === "sent" ? "Sent to" : "Received from"} {transaction.recipientName}
            </p>
            <p className="text-sm text-gray-500">{transaction.payTag}</p>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{transaction.id}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopyId}>
                  {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{transaction.date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span>{transaction.time}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-medium capitalize">{transaction.status}</span>
            </div>

            {transaction.memo && (
              <div className="flex justify-between">
                <span className="text-gray-600">Memo:</span>
                <span className="text-right max-w-48">{transaction.memo}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Digital Receipt */}
        <Receipt transaction={transaction} />
      </div>
    </div>
  )
}
