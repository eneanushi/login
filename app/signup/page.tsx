"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Check } from "lucide-react"
import Link from "next/link"
import FinancialBackground from "@/components/financial-background"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const passwordMatch = password === confirmPassword
  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1929] to-[#001845]">
      {/* Animated Financial Background */}
      <FinancialBackground />

      {/* Signup Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-md overflow-hidden rounded-xl backdrop-blur-md"
        style={{
          backgroundColor: "rgba(10, 25, 41, 0.7)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">Create Account</h2>
            <p className="text-sm text-[#a0b3c6]">Join our brokerage platform today</p>
          </div>

          <form className="space-y-5">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#a0b3c6]">
                Full Name
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(56, 227, 250, 0.5)" }}
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-[#1e3a5f] bg-[#0c1e35] p-3 text-white transition-all duration-200 placeholder:text-[#4a6585] focus:border-[#38e3fa] focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#a0b3c6]">
                Email
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(56, 227, 250, 0.5)" }}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#1e3a5f] bg-[#0c1e35] p-3 text-white transition-all duration-200 placeholder:text-[#4a6585] focus:border-[#38e3fa] focus:outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#a0b3c6]">
                Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(56, 227, 250, 0.5)" }}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#1e3a5f] bg-[#0c1e35] p-3 text-white transition-all duration-200 placeholder:text-[#4a6585] focus:border-[#38e3fa] focus:outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a6585] transition-colors duration-200 hover:text-[#38e3fa]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="mb-1 flex justify-between">
                    <span className="text-xs text-[#a0b3c6]">Password strength:</span>
                    <span className="text-xs font-medium" style={{ color: getStrengthColor(passwordStrength) }}>
                      {passwordStrength}
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-[#1e3a5f]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: getStrengthPercentage(passwordStrength) }}
                      transition={{ duration: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: getStrengthColor(passwordStrength) }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#a0b3c6]">
                Confirm Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(56, 227, 250, 0.5)" }}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-lg border bg-[#0c1e35] p-3 text-white transition-all duration-200 placeholder:text-[#4a6585] focus:outline-none ${
                    confirmPassword
                      ? passwordMatch
                        ? "border-green-500 focus:border-green-500"
                        : "border-red-500 focus:border-red-500"
                      : "border-[#1e3a5f] focus:border-[#38e3fa]"
                  }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a6585] transition-colors duration-200 hover:text-[#38e3fa]"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPassword && !passwordMatch && <p className="mt-1 text-xs text-red-500">Passwords do not match</p>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <div
                  onClick={() => setAgreeToTerms(!agreeToTerms)}
                  className={`relative flex h-5 w-5 cursor-pointer items-center justify-center rounded border transition-colors duration-200 ${
                    agreeToTerms ? "border-[#38e3fa] bg-[#38e3fa]" : "border-[#1e3a5f] bg-transparent"
                  }`}
                >
                  {agreeToTerms && <Check className="h-3 w-3 text-[#0c1e35]" />}
                </div>
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-[#a0b3c6]">
                  I agree to the{" "}
                  <a href="#" className="text-[#38e3fa] hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#38e3fa] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!agreeToTerms || !passwordMatch || !password}
              className={`relative w-full overflow-hidden rounded-lg p-3 text-center font-medium text-white shadow-lg transition-all duration-300 ${
                !agreeToTerms || !passwordMatch || !password
                  ? "cursor-not-allowed bg-[#1e3a5f] opacity-70"
                  : "bg-gradient-to-r from-[#0062ff] to-[#38e3fa] hover:shadow-[0_0_15px_rgba(56,227,250,0.5)]"
              }`}
              style={{
                boxShadow: agreeToTerms && passwordMatch && password ? "0 0 10px rgba(56, 227, 250, 0.3)" : "none",
              }}
            >
              <span className="relative z-10">Create Account</span>
              {agreeToTerms && passwordMatch && password && (
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#0062ff] to-[#38e3fa] opacity-50"
                />
              )}
            </motion.button>

            <div className="text-center text-sm text-[#a0b3c6]">
              Already have an account?{" "}
              <Link href="/" className="font-medium text-[#a0b3c6] transition-colors duration-200 hover:text-[#38e3fa]">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

// Helper functions for password strength
function getPasswordStrength(password: string): "Weak" | "Medium" | "Strong" | "Very Strong" {
  if (!password) return "Weak"

  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const length = password.length

  const criteria = [hasLowercase, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length

  if (length < 8) return "Weak"
  if (length >= 8 && criteria === 2) return "Medium"
  if (length >= 8 && criteria === 3) return "Strong"
  if (length >= 10 && criteria === 4) return "Very Strong"

  return "Medium"
}

function getStrengthColor(strength: "Weak" | "Medium" | "Strong" | "Very Strong"): string {
  switch (strength) {
    case "Weak":
      return "#ff4d4f"
    case "Medium":
      return "#faad14"
    case "Strong":
      return "#52c41a"
    case "Very Strong":
      return "#38e3fa"
    default:
      return "#ff4d4f"
  }
}

function getStrengthPercentage(strength: "Weak" | "Medium" | "Strong" | "Very Strong"): string {
  switch (strength) {
    case "Weak":
      return "25%"
    case "Medium":
      return "50%"
    case "Strong":
      return "75%"
    case "Very Strong":
      return "100%"
    default:
      return "0%"
  }
}
