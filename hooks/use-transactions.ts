"use client"

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

// Mock initial transactions
const initialTransactions: Transaction[] = [
  {
    id: "TXN1703123456789",
    type: "received",
    recipientName: "Emma Wilson",
    payTag: "@emma_w",
    amount: 45.0,
    memo: "Lunch split",
    date: "12/20/2024",
    time: "2:30 PM",
    status: "completed",
  },
  {
    id: "TXN1703023456789",
    type: "sent",
    recipientName: "Mike Chen",
    payTag: "@mike_chen",
    amount: 120.0,
    memo: "Concert tickets",
    date: "12/19/2024",
    time: "7:15 PM",
    status: "completed",
  },
  {
    id: "TXN1702923456789",
    type: "sent",
    recipientName: "Sarah Johnson",
    payTag: "@sarah_j",
    amount: 25.5,
    memo: "Coffee",
    date: "12/18/2024",
    time: "10:45 AM",
    status: "completed",
  },
]

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev])
  }

  return {
    transactions,
    addTransaction,
  }
}
