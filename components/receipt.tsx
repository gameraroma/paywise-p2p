"use client"

import { Download, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef } from "react"

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

interface ReceiptProps {
  transaction: Transaction
}

export function Receipt({ transaction }: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!receiptRef.current) return

    try {
      // In a real app, you would use html2canvas or similar library
      // For now, we'll just show an alert
      alert("Receipt download functionality would be implemented here using html2canvas or similar library")
    } catch (error) {
      console.error("Error generating receipt:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "PayWise Transaction Receipt",
          text: `Transaction ${transaction.id} - $${transaction.amount.toFixed(2)} ${transaction.type} ${transaction.type === "sent" ? "to" : "from"} ${transaction.recipientName}`,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Share functionality would be implemented here")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Digital Receipt</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={receiptRef} className="space-y-4 p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center border-b pb-4">
            <h3 className="text-lg font-bold text-blue-600">PayWise</h3>
            <p className="text-sm text-gray-600">Digital Receipt</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono">{transaction.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="capitalize">{transaction.type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{transaction.type === "sent" ? "To:" : "From:"}</span>
              <div className="text-right">
                <p>{transaction.recipientName}</p>
                <p className="text-gray-500">{transaction.payTag}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">${transaction.amount.toFixed(2)}</span>
            </div>

            {transaction.memo && (
              <div className="flex justify-between">
                <span className="text-gray-600">Memo:</span>
                <span className="text-right max-w-32">{transaction.memo}</span>
              </div>
            )}

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
              <span className="text-green-600 font-medium">{transaction.status}</span>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>Thank you for using PayWise</p>
            <p>Keep this receipt for your records</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
