"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedButton from "@/components/animated-button"
import { Copy, Check, Upload, Wallet } from "lucide-react"

export default function CryptoPaymentPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [copied, setCopied] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Wallet addresses
  const walletAddresses = {
    bitcoin: "bc1qluchf8n0uunytpdx9fxk0rxnfty886mx6s6q53",
    ethereum: "0x867a2b0aAA1fC9Ca2da7DE96122A68EcDBe09Dc9",
    tron: "TDdnhNk1ykUsCqZAMB9UWQtYFn9ZpsX3x9",
  }

  // Get package details from localStorage
  const packageName =
    typeof window !== "undefined" ? localStorage.getItem("packageName") || "Selected Package" : "Selected Package"
  const packagePrice = typeof window !== "undefined" ? localStorage.getItem("packagePrice") || "$4,998.00" : "$4,998.00"

  useEffect(() => {
    // No authentication check needed anymore
    setIsAuthenticated(true)
  }, [router])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsLoading(true)

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/payment/success")
    }, 2000)
  }

  if (!isAuthenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 mt-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Cryptocurrency Payment</h1>
              <p className="text-gray-600">Pay securely with cryptocurrency</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-80">Amount to Pay</p>
                    <p className="text-2xl font-bold">{packagePrice}</p>
                  </div>
                  <div className="bg-white p-3 rounded-full">
                    <Wallet className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Payment Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Send the exact amount to one of the wallet addresses below</li>
                    <li>Upload a screenshot of your transaction</li>
                    <li>Click "Verify Payment" to complete your order</li>
                  </ol>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Wallet Addresses</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 mr-2">
                            <Image src="/placeholder.svg?height=24&width=24" alt="Bitcoin" width={24} height={24} />
                          </div>
                          <span className="font-medium">Bitcoin (BTC)</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(walletAddresses.bitcoin, "bitcoin")}
                          className="text-[#e5792c] hover:text-[#d06a25] flex items-center"
                        >
                          {copied === "bitcoin" ? (
                            <Check className="w-4 h-4 mr-1" />
                          ) : (
                            <Copy className="w-4 h-4 mr-1" />
                          )}
                          {copied === "bitcoin" ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200 text-sm font-mono break-all">
                        {walletAddresses.bitcoin}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 mr-2">
                            <Image src="/placeholder.svg?height=24&width=24" alt="Ethereum" width={24} height={24} />
                          </div>
                          <span className="font-medium">Ethereum (ETH)</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(walletAddresses.ethereum, "ethereum")}
                          className="text-[#e5792c] hover:text-[#d06a25] flex items-center"
                        >
                          {copied === "ethereum" ? (
                            <Check className="w-4 h-4 mr-1" />
                          ) : (
                            <Copy className="w-4 h-4 mr-1" />
                          )}
                          {copied === "ethereum" ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200 text-sm font-mono break-all">
                        {walletAddresses.ethereum}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 mr-2">
                            <Image src="/placeholder.svg?height=24&width=24" alt="Tron" width={24} height={24} />
                          </div>
                          <span className="font-medium">Tron (TRC20) - USDT</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(walletAddresses.tron, "tron")}
                          className="text-[#e5792c] hover:text-[#d06a25] flex items-center"
                        >
                          {copied === "tron" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          {copied === "tron" ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200 text-sm font-mono break-all">
                        {walletAddresses.tron}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Important: Only send USDT on the Tron (TRC20) network to this address.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Upload Transaction Screenshot</h3>
                    <div
                      onClick={triggerFileInput}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        previewUrl
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-[#e5792c] hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        required
                      />

                      {previewUrl ? (
                        <div className="space-y-4">
                          <div className="relative w-full h-48 mx-auto">
                            <Image
                              src={previewUrl || "/placeholder.svg"}
                              alt="Transaction Screenshot"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-green-600 flex items-center justify-center">
                            <Check className="w-4 h-4 mr-1" /> Screenshot uploaded
                          </p>
                          <p className="text-sm text-gray-500">Click to change</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-700">Click to upload screenshot</p>
                          <p className="text-sm text-gray-500">PNG, JPG or JPEG (max. 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={!selectedFile || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying Payment...
                      </div>
                    ) : (
                      "Verify Payment"
                    )}
                  </AnimatedButton>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Please note that cryptocurrency transactions may take some time to confirm on the blockchain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

