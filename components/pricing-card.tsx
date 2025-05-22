"use client";

import type React from "react";

import { useState } from "react";
import { Check } from "lucide-react";
import AnimatedButton from "@/components/animated-button";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaLink: string;
  ctaText?: string;
  popular?: boolean;
  className?: string;
  setShowPaymentModal?: () => void;
  isEnterprise?: boolean;
  urgencyIndicator?: React.ReactNode;
  serviceDurationIn?: string;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  ctaLink,
  ctaText = "Get Started",
  popular = false,
  className = "",
  setShowPaymentModal,
  isEnterprise = false,
  urgencyIndicator,
  serviceDurationIn,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleGetStarted = () => {
    if (isEnterprise) {
      // For Enterprise plan, redirect to meeting link
      window.open(
        "https://calendly.com/naqshagencyofficial/brand_consultation",
        "_blank"
      );
    } else if (ctaLink.startsWith("https://")) {
      // Handle direct external links, including Stripe payment links
      window.open(ctaLink, "_blank");
    } else if (setShowPaymentModal) {
      // For modal payment flow
      setShowPaymentModal();
    } else if (ctaLink) {
      // For internal navigation links
      window.location.href = ctaLink;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden transition-all duration-500 relative shadow-md w-full flex flex-col ${
        popular ? "border-2 border-[#e5792c]" : "border border-gray-200"
      } ${
        isHovered ? "shadow-xl transform -translate-y-2 z-30" : ""
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-[#e5792c] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            Most Popular
          </div>
        </div>
      )}
      <div
        className={`px-6 py-8 relative flex-grow flex flex-col overflow-hidden`}
      >
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#e5792c]/10 via-orange-50 to-white opacity-90 pointer-events-none z-0"></div>
        )}

        <h3 className="text-2xl font-bold mb-2 text-center relative z-1">
          {title}
        </h3>
        <div className="text-3xl font-bold mb-4 text-center relative z-1 transition-colors duration-300 group-hover:text-[#e5792c] flex items-end justify-center gap-.5">
          <p>{price}</p>
          <p className='text-sm text-naqsh-black'>{serviceDurationIn}</p>
        </div>
        <p className="text-gray-600 text-sm text-center mb-6 relative z-1">
          {description}
        </p>

        <div className="space-y-3 mb-6 relative z-1 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start group">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                  popular || isHovered
                    ? "bg-[#e5792c]"
                    : "border border-[#e5792c]/30"
                } group-hover:bg-[#e5792c]`}
              >
                <Check
                  className={`w-3 h-3 ${
                    popular || isHovered ? "text-white" : "text-[#e5792c]/30"
                  } group-hover:text-white`}
                />
              </div>
              <span className="text-gray-700 text-sm font-semibold leading-tight">
                {feature}
              </span>
            </div>
          ))}
        </div>
        {isEnterprise && features.length > 5 && (
          <div className="text-xs text-center text-gray-400 mb-2 animate-bounce">
            <span>Scroll for more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 inline ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}

        {/* Render urgency indicator if provided */}
        {urgencyIndicator}

        <div className="relative z-1 mt-auto pt-4 button-container">
          <AnimatedButton
            onClick={handleGetStarted}
            variant={popular ? "primary" : "outline"}
            className="w-full group"
          >
            {ctaText}
          </AnimatedButton>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5792c;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d06a25;
        }
      `}</style>
    </div>
  );
}