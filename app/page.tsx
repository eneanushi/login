"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import FinancialBackground from "@/components/financial-background"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1929] to-[#001845]">
      {/* Animated Financial Background */}
      <FinancialBackground />

      {/* Login Box */}
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
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
            <p className="text-sm text-[#a0b3c6]">Sign in to access your brokerage account</p>
          </div>

          <form className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#a0b3c6]">
                  Password
                </label>
                <motion.a
                  whileHover={{ color: "#38e3fa" }}
                  href="#"
                  className="text-xs text-[#a0b3c6] transition-colors duration-200 hover:text-[#38e3fa]"
                >
                  Forgot Password?
                </motion.a>
              </div>
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
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className="relative mr-3 flex cursor-pointer items-center"
              >
                <div
                  className={`h-5 w-10 rounded-full transition-colors duration-300 ${
                    rememberMe ? "bg-[#38e3fa]" : "bg-[#1e3a5f]"
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: rememberMe ? 20 : 2,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-md"
                  />
                </div>
              </div>
              <label htmlFor="remember" className="cursor-pointer text-sm text-[#a0b3c6]">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#0062ff] to-[#38e3fa] p-3 text-center font-medium text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,227,250,0.5)]"
              style={{
                boxShadow: "0 0 10px rgba(56, 227, 250, 0.3)",
              }}
            >
              <span className="relative z-10">Log In</span>
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
            </motion.button>

            <div className="text-center text-sm text-[#a0b3c6]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-[#a0b3c6] transition-colors duration-200 hover:text-[#38e3fa]"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
