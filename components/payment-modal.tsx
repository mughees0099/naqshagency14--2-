"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, CreditCard, Wallet, DollarSign } from "lucide-react";
import Link from "next/link";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  packagePrice?: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  packageName = "Selected Package",
  packagePrice = "$0.00",
}: PaymentModalProps) {
  const router = useRouter();

  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handlePaymentMethodSelect = (method: string) => {
    // Store package details in localStorage for use in payment pages
    localStorage.setItem("packageName", packageName);
    localStorage.setItem("packagePrice", packagePrice);

    // Proceed to payment page
    switch (method) {
      case "card":
        router.push("/payment/card");
        break;
      case "paypal":
        router.push("/payment/paypal");
        break;
      case "crypto":
        router.push("/payment/crypto");
        break;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold">Select Payment Method</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Selected Package</p>
            <div className="flex justify-between items-center">
              <p className="font-medium">{packageName}</p>
              <p className="text-lg font-bold text-[#e5792c]">{packagePrice}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                alert(
                  "Credit/Debit Card payments coming soon! Please choose another payment method."
                );
              }}
              className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors relative overflow-hidden"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Credit/Debit Card</p>
                <p className="text-sm text-gray-500">
                  Pay securely with your card
                </p>
              </div>
              {/* <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-white px-2 py-1 rounded-bl-lg font-medium">
                Coming Soon
              </div> */}
            </button>

            <button
              onClick={() => handlePaymentMethodSelect("paypal")}
              className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <DollarSign className="w-5 h-5 text-blue-800" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-gray-500">Fast and secure payment</p>
              </div>
            </button>

            <button
              onClick={() => handlePaymentMethodSelect("crypto")}
              className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mr-4">
                <Wallet className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Cryptocurrency</p>
                <p className="text-sm text-gray-500">
                  Pay with Bitcoin, Ethereum, etc.
                </p>
              </div>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By proceeding, you agree to our{" "}
              <Link href="/terms" className="text-[#e5792c] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#e5792c] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
