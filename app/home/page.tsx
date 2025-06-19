"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight, ArrowDownLeft, History, CreditCard, Settings, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SendMoneyFlow } from "@/components/send-money-flow"
import { TransactionHistory } from "@/components/transaction-history"
import { TransactionDetail } from "@/components/transaction-detail"
import { useTransactions } from "@/hooks/use-transactions"

export default function HomePage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<"dashboard" | "send" | "history" | "detail">("dashboard")
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)
  const { transactions, addTransaction } = useTransactions()

  const handleBackToMain = () => {
    router.push("/")
  }

  const handleSendMoney = () => {
    setCurrentView("send")
  }

  const handleViewHistory = () => {
    setCurrentView("history")
  }

  const handleTransactionComplete = (transaction: any) => {
    addTransaction(transaction)
    setCurrentView("dashboard")
  }

  const handleViewTransaction = (transactionId: string) => {
    setSelectedTransaction(transactionId)
    setCurrentView("detail")
  }

  const handleBack = () => {
    setCurrentView("dashboard")
    setSelectedTransaction(null)
  }

  if (currentView === "send") {
    return <SendMoneyFlow onComplete={handleTransactionComplete} onBack={handleBack} />
  }

  if (currentView === "history") {
    return (
      <TransactionHistory transactions={transactions} onBack={handleBack} onViewTransaction={handleViewTransaction} />
    )
  }

  if (currentView === "detail" && selectedTransaction) {
    const transaction = transactions.find((t) => t.id === selectedTransaction)
    if (transaction) {
      return <TransactionDetail transaction={transaction} onBack={handleBack} />
    }
  }

  const recentTransactions = transactions.slice(0, 3)
  const balance = 2847.5

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-web-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBackToMain}
                className="hover:bg-neutral-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">PayWise</h1>
                <p className="text-sm text-neutral-600">Welcome back, Alex</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-web-green-600 to-web-green-500 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-medium opacity-90">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
            <p className="text-sm opacity-75 mt-1">Main Account</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleSendMoney}
            className="h-20 flex-col gap-2 bg-white text-neutral-900 border border-neutral-200 hover:bg-web-green-50 hover:border-web-green-200"
            variant="outline"
          >
            <ArrowUpRight className="h-6 w-6 text-web-green-600" />
            <span className="font-medium">Send Money</span>
          </Button>
          <Button
            onClick={handleViewHistory}
            className="h-20 flex-col gap-2 bg-white text-neutral-900 border border-neutral-200 hover:bg-web-green-50 hover:border-web-green-200"
            variant="outline"
          >
            <History className="h-6 w-6 text-web-green-600" />
            <span className="font-medium">History</span>
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleViewHistory} className="text-web-green-600 hover:text-web-green-700 hover:bg-web-green-50">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No recent transactions</p>
                <p className="text-sm">Start by sending money to someone!</p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-web-green-50 hover:border-web-green-200 transition-colors"
                  onClick={() => handleViewTransaction(transaction.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "sent" ? "bg-error/10 text-error" : "bg-web-green-100 text-web-green-600"
                      }`}
                    >
                      {transaction.type === "sent" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.type === "sent" ? "To" : "From"} {transaction.recipientName}
                      </p>
                      <p className="text-xs text-neutral-500">{transaction.payTag}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === "sent" ? "text-error" : "text-web-green-600"}`}>
                      {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-500">{transaction.date}</p>
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
