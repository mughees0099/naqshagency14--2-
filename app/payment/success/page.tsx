"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedButton from "@/components/animated-button"
import { CheckCircle, Download, ArrowRight } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // No authentication check needed anymore
  }, [router])

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 mt-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>

                <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                  Thank you for your purchase. Your order has been successfully processed.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
                  <h3 className="font-bold mb-4">Order Summary</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">ORD-12345678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Essential Branding Package</span>
                      <span className="font-medium">$4,998.00</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold">Total Paid:</span>
                      <span className="font-bold text-[#e5792c]">$4,998.00</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <AnimatedButton href="#" variant="outline" className="w-full flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" /> Download Receipt
                  </AnimatedButton>

                  <AnimatedButton
                    href="/dashboard"
                    variant="primary"
                    className="w-full flex items-center justify-center"
                  >
                    Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                  </AnimatedButton>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                  <p>
                    If you have any questions about your order, please{" "}
                    <Link href="/contact" className="text-[#e5792c] hover:underline">
                      contact our support team
                    </Link>
                    .
                  </p>
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

