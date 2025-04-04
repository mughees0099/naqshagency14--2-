"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedButton from "@/components/animated-button"
import { DollarSignIcon as PaypalLogo, ArrowRight } from "lucide-react"
import { Check, Upload } from "lucide-react"

export default function PayPalPaymentPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get package details from localStorage
  const packageName =
    typeof window !== "undefined" ? localStorage.getItem("packageName") || "Selected Package" : "Selected Package"
  const packagePrice = typeof window !== "undefined" ? localStorage.getItem("packagePrice") || "$4,998.00" : "$4,998.00"

  useEffect(() => {
    // No authentication check needed anymore
    setIsAuthenticated(true)
  }, [router])

  const handleContinue = () => {
    setIsLoading(true)

    // Simulate PayPal redirect
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleComplete = () => {
    if (step === 2 && !selectedFile) {
      alert("Please upload a screenshot of your payment")
      return
    }

    setIsLoading(true)

    // Simulate payment completion
    setTimeout(() => {
      setIsLoading(false)
      router.push("/payment/success")
    }, 1500)
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
              <h1 className="text-3xl font-bold mb-2">PayPal Payment</h1>
              <p className="text-gray-600">Complete your payment securely with PayPal</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {step === 1 ? (
                <>
                  <div className="p-8 bg-gradient-to-r from-[#0070ba] to-[#003087] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

                    <div className="flex justify-between items-center relative z-10">
                      <div>
                        <p className="text-sm text-white/80 uppercase tracking-wider font-medium">Amount to Pay</p>
                        <p className="text-3xl font-bold mt-1">{packagePrice}</p>
                      </div>
                      <div className="bg-white p-3 rounded-full shadow-lg">
                        <PaypalLogo className="w-8 h-8 text-[#0070ba]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-8">
                      <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="96"
                          height="96"
                          viewBox="0 0 124 33"
                          className="text-[#0070ba]"
                        >
                          <path
                            fill="currentColor"
                            d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.97-1.142-2.694-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z"
                          />
                          <path
                            fill="currentColor"
                            d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z"
                          />
                          <path
                            fill="#012169"
                            d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z"
                          />
                          <path
                            fill="#003087"
                            d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177h-7.352a1.172 1.172 0 0 0-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0-1.017-.429 9.045 9.045 0 0 0-.277-.087z"
                          />
                          <path
                            fill="#009cde"
                            d="M9.614 7.699a1.169 1.169 0 0 1 1.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 0 1 1.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392C20.378.682 17.853 0 14.622 0h-9.38c-.66 0-1.223.48-1.325 1.133L.01 25.898a.806.806 0 0 0 .795.932h5.791l1.454-9.225 1.564-9.906z"
                          />
                        </svg>
                      </div>

                      <p className="text-center text-gray-600 mb-6 text-lg">
                        Please send your payment to our official PayPal account below:
                      </p>

                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-[#0070ba] rounded-lg p-6 mb-6 shadow-md">
                        <div className="flex flex-col items-center text-center">
                          <h3 className="text-[#0070ba] font-bold text-lg mb-3">Send Payment To:</h3>

                          <div className="bg-white/70 w-full max-w-md py-3 px-4 rounded-lg border border-blue-100 mb-3">
                            <p className="text-xl font-mono font-medium text-gray-800 select-all">
                              naqshagencyofficial@gmail.com
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText("naqshagencyofficial@gmail.com")
                              const copyBtn = document.getElementById("copyStatus")
                              copyBtn.innerText = "Copied!"
                              copyBtn.classList.add("bg-green-600")
                              setTimeout(() => {
                                copyBtn.innerText = "Copy Email Address"
                                copyBtn.classList.remove("bg-green-600")
                              }, 2000)
                            }}
                            id="copyStatus"
                            className="bg-[#0070ba] hover:bg-[#003087] text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center shadow-sm mt-1 w-full max-w-md"
                          >
                            Copy Email Address
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>

                          <p className="text-xs text-gray-500 mt-2">
                            Please double-check the email address before sending payment
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Please include your order reference in the payment note for faster processing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-2">Payment Summary</h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Package:</span>
                        <span className="font-medium">{packageName}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">{packagePrice}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-[#e5792c]">{packagePrice}</span>
                        </div>
                      </div>
                    </div>

                    <AnimatedButton
                      onClick={() => {
                        setIsLoading(true)
                        // Create PayPal payment URL with pre-filled information
                        const paypalURL = `https://www.paypal.com/paypalme/naqshagencyofficial/${packagePrice.replace("$", "")}`
                        // Open PayPal in a new tab
                        window.open(paypalURL, "_blank")
                        // Continue with the flow after a short delay
                        setTimeout(() => {
                          setIsLoading(false)
                          setStep(2)
                        }, 1500)
                      }}
                      variant="primary"
                      className="w-full"
                      disabled={isLoading}
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
                          Opening PayPal...
                        </div>
                      ) : (
                        <>
                          Continue to PayPal <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </AnimatedButton>
                    {step === 2 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">Upload Payment Screenshot</h3>
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
                                  alt="Payment Screenshot"
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
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="p-6 bg-[#0070ba] text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm opacity-80">PayPal Payment</p>
                        <p className="text-2xl font-bold">Payment Authorized</p>
                      </div>
                      <div className="bg-white p-2 rounded-full">
                        <PaypalLogo className="w-8 h-8 text-[#0070ba]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Payment Authorized</h3>
                      <p className="text-gray-600">
                        Your PayPal payment has been authorized. Click the button below to complete your order.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-2">Payment Details</h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">PayPal Transaction ID:</span>
                        <span className="font-medium">PAY-12345678XY</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className="font-medium text-green-600">Authorized</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">{packagePrice}</span>
                      </div>
                    </div>

                    <AnimatedButton onClick={handleComplete} variant="primary" className="w-full" disabled={isLoading}>
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
                          Processing...
                        </div>
                      ) : (
                        "Complete Order"
                      )}
                    </AnimatedButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

