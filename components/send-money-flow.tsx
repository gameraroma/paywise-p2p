"use client"

import { useState } from "react"
import { ArrowLeft, Search, User, DollarSign, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PinInput } from "@/components/pin-input"
import { Receipt } from "@/components/receipt"

interface SendMoneyFlowProps {
  onComplete: (transaction: any) => void
  onBack: () => void
}

type Step = "recipient" | "amount" | "review" | "pin" | "success"

const mockUsers = [
  { payTag: "@sarah_j", name: "Sarah Johnson", avatar: "SJ" },
  { payTag: "@mike_chen", name: "Mike Chen", avatar: "MC" },
  { payTag: "@emma_w", name: "Emma Wilson", avatar: "EW" },
  { payTag: "@david_k", name: "David Kim", avatar: "DK" },
]

export function SendMoneyFlow({ onComplete, onBack }: SendMoneyFlowProps) {
  const [step, setStep] = useState<Step>("recipient")
  const [recipient, setRecipient] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [pinAttempts, setPinAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [completedTransaction, setCompletedTransaction] = useState<any>(null)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.payTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRecipientSelect = (user: any) => {
    setRecipient(user)
    setStep("amount")
  }

  const handleAmountNext = () => {
    if (Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= 2847.5) {
      setStep("review")
    }
  }

  const handlePinSuccess = () => {
    const transaction = {
      id: `TXN${Date.now()}`,
      type: "sent",
      recipientName: recipient.name,
      payTag: recipient.payTag,
      amount: Number.parseFloat(amount),
      memo,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: "completed",
    }
    setCompletedTransaction(transaction)
    setStep("success")
  }

  const handlePinError = () => {
    const newAttempts = pinAttempts + 1
    setPinAttempts(newAttempts)
    if (newAttempts >= 3) {
      setIsLocked(true)
    }
  }

  const handleComplete = () => {
    if (completedTransaction) {
      onComplete(completedTransaction)
    }
  }

  const renderStep = () => {
    switch (step) {
      case "recipient":
        return (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by PayTag or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>User not found</p>
                  <p className="text-sm">Please check the PayTag and try again</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <Card
                    key={user.payTag}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleRecipientSelect(user)}
                  >
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.payTag}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )

      case "amount":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                {recipient.avatar}
              </div>
              <h3 className="font-semibold">{recipient.name}</h3>
              <p className="text-sm text-gray-500">{recipient.payTag}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-lg"
                    step="0.01"
                    min="0.01"
                    max="2847.50"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Available balance: $2,847.50</p>
              </div>

              <div>
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Textarea
                  id="memo"
                  placeholder="What's this for?"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  maxLength={100}
                />
              </div>

              <Button
                onClick={handleAmountNext}
                className="w-full"
                disabled={!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > 2847.5}
              >
                Continue
              </Button>
            </div>
          </div>
        )

      case "review":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Review Transfer</h3>
              <p className="text-sm text-gray-500">Please confirm the details below</p>
            </div>

            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <div className="text-right">
                    <p className="font-medium">{recipient.name}</p>
                    <p className="text-sm text-gray-500">{recipient.payTag}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-lg">${Number.parseFloat(amount).toFixed(2)}</span>
                </div>

                {memo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memo:</span>
                    <span className="text-right max-w-48">{memo}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button onClick={() => setStep("pin")} className="w-full">
              Authorize Transfer
            </Button>
          </div>
        )

      case "pin":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Enter PIN</h3>
              <p className="text-sm text-gray-500">Enter your 6-digit PIN to authorize</p>
              {pinAttempts > 0 && (
                <p className="text-sm text-red-600 mt-2">Incorrect PIN. {3 - pinAttempts} attempts remaining.</p>
              )}
              {isLocked && (
                <p className="text-sm text-red-600 mt-2">Account temporarily locked. Please try again later.</p>
              )}
            </div>

            <PinInput onSuccess={handlePinSuccess} onError={handlePinError} disabled={isLocked} />
          </div>
        )

      case "success":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-green-600">Transfer Successful!</h3>
              <p className="text-sm text-gray-500">Your money has been sent</p>
            </div>

            {completedTransaction && <Receipt transaction={completedTransaction} />}

            <Button onClick={handleComplete} className="w-full">
              Done
            </Button>
          </div>
        )

      default:
        return null
    }
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
            <h1 className="text-lg font-semibold">Send Money</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <div className="flex justify-center space-x-2 mb-4">
              {["recipient", "amount", "review", "pin", "success"].map((s, index) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full ${
                    ["recipient", "amount", "review", "pin", "success"].indexOf(step) >= index
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
