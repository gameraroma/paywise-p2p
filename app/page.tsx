"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PayWise</h1>
          <p className="text-lg text-gray-600 mb-8">
            Fast, simple, and secure peer-to-peer money transfers
          </p>
          <Button 
            onClick={handleGetStarted}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            size="lg"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Instant Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 text-sm">
              Send money to friends and family instantly with just a few taps
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Secure & Safe</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 text-sm">
              Bank-level security with end-to-end encryption for all transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Easy Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 text-sm">
              Use PayTags to send money using just a username or phone number
            </p>
          </CardContent>
        </Card>

        <div className="pt-6">
          <Button 
            onClick={handleGetStarted}
            variant="outline"
            className="w-full"
          >
            Start Using PayWise
          </Button>
        </div>
      </div>
    </div>
  )
}
