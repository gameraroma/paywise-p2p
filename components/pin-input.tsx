"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface PinInputProps {
  onSuccess: () => void
  onError: () => void
  disabled?: boolean
}

const CORRECT_PIN = "123456" // In a real app, this would be validated server-side

export function PinInput({ onSuccess, onError, disabled }: PinInputProps) {
  const [pin, setPin] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (disabled) return

    if (value.length > 1) return // Prevent multiple characters

    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if PIN is complete
    if (newPin.every((digit) => digit !== "") && newPin.join("").length === 6) {
      const enteredPin = newPin.join("")
      if (enteredPin === CORRECT_PIN) {
        onSuccess()
      } else {
        onError()
        // Clear PIN after error
        setTimeout(() => {
          setPin(["", "", "", "", "", ""])
          inputRefs.current[0]?.focus()
        }, 1000)
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className="flex justify-center gap-3">
      {pin.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-semibold"
        />
      ))}
    </div>
  )
}
