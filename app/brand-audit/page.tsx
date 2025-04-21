"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnimatedButton from "@/components/animated-button";

interface Section {
  id: string;
  title: string;
  isCompleted: boolean;
  isOpen: boolean;
}

export default function BrandAuditPage() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "personal",
      title: "Personal Information",
      isCompleted: false,
      isOpen: true,
    },
    {
      id: "identity",
      title: "Brand Identity & Perception",
      isCompleted: false,
      isOpen: false,
    },
    {
      id: "online",
      title: "Online Presence & Customer Engagement",
      isCompleted: false,
      isOpen: false,
    },
  ]);

  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => ({
        ...section,
        isOpen: section.id === sectionId ? !section.isOpen : false,
      }))
    );
  };

  const markSectionComplete = (sectionId: string) => {
    setSections(
      sections.map((section) => ({
        ...section,
        isCompleted: section.id === sectionId ? true : section.isCompleted,
        isOpen: section.id === sectionId ? false : section.isOpen,
      }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Brand Audit Questionnaire
              </h1>
              <p className="text-lg text-gray-600">
                Complete this comprehensive brand audit to help us understand
                your business better and identify areas for improvement.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="h-2 bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-[#e5792c] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${
                      (sections.filter((s) => s.isCompleted).length /
                        sections.length) *
                      100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500 text-right">
                {sections.filter((s) => s.isCompleted).length} of{" "}
                {sections.length} sections completed
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          section.isCompleted
                            ? "bg-[#e5792c] text-white"
                            : "border-2 border-gray-300 text-transparent"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-lg">
                        {section.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        section.isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {section.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 border-t border-gray-100">
                          {/* Personal Information Section */}
                          {section.id === "personal" && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your full name"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your email address"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your company name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Website URL
                                </label>
                                <input
                                  type="url"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your website URL"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Industry/Niche
                                </label>
                                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent">
                                  <option value="">Select your industry</option>
                                  <option value="ecommerce">E-commerce</option>
                                  <option value="saas">SaaS</option>
                                  <option value="health">
                                    Health & Wellness
                                  </option>
                                  <option value="realestate">
                                    Real Estate
                                  </option>
                                  <option value="finance">Finance</option>
                                  <option value="education">Education</option>
                                  <option value="technology">Technology</option>
                                  <option value="hospitality">
                                    Hospitality
                                  </option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {/* Brand Identity Section */}
                          {section.id === "identity" && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  How would you describe your brand in 3 words?
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="e.g., Innovative, Reliable, Friendly"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  What is your brand's mission or core message?
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your brand's mission"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do you have a professional logo?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="logo"
                                      value="yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="logo"
                                      value="no"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Are your brand colors and fonts consistent
                                  across all platforms?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="consistency"
                                      value="yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="consistency"
                                      value="no"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="consistency"
                                      value="not-sure"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Not Sure</span>
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do people easily recognize and remember your
                                  brand?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="recognition"
                                      value="yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="recognition"
                                      value="no"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="recognition"
                                      value="needs-improvement"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">
                                      Needs Improvement
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Where do you currently market your brand?
                                  (Select all that apply)
                                </label>
                                <div className="space-y-2">
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="text-[#e5792c] rounded"
                                    />
                                    <span className="ml-2">Social Media</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="text-[#e5792c] rounded"
                                    />
                                    <span className="ml-2">Website</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="text-[#e5792c] rounded"
                                    />
                                    <span className="ml-2">Paid Ads</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="text-[#e5792c] rounded"
                                    />
                                    <span className="ml-2">
                                      Email Marketing
                                    </span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="text-[#e5792c] rounded"
                                    />
                                    <span className="ml-2">Word of Mouth</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="text-[#e5792c] rounded"
                                    />
                                    <span className="ml-2">Print Media</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Online Presence Section */}
                          {section.id === "online" && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  How active is your brand on social media?
                                </label>
                                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent">
                                  <option value="">Select an option</option>
                                  <option value="very-active">
                                    Very Active
                                  </option>
                                  <option value="occasionally">
                                    Occasionally
                                  </option>
                                  <option value="rarely">Rarely</option>
                                  <option value="not-at-all">Not at All</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do you have a well-designed and optimized
                                  website?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="website"
                                      value="yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="website"
                                      value="no"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="website"
                                      value="needs-improvement"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">
                                      Needs Improvement
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  How often do you get customer inquiries from
                                  your website?
                                </label>
                                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent">
                                  <option value="">Select an option</option>
                                  <option value="daily">Daily</option>
                                  <option value="weekly">Weekly</option>
                                  <option value="monthly">Monthly</option>
                                  <option value="rarely">Rarely</option>
                                  <option value="never">Never</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Are you running any paid ads for your brand?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="paid-ads"
                                      value="yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="paid-ads"
                                      value="no"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="paid-ads"
                                      value="planning-to"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Planning To</span>
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do you track analytics (traffic, engagement,
                                  conversions)?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="analytics"
                                      value="yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="analytics"
                                      value="no"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="radio"
                                      name="analytics"
                                      value="not-sure"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Not Sure</span>
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  What branding challenge are you facing the
                                  most?
                                </label>
                                <textarea
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  rows={3}
                                  placeholder="Describe your biggest branding challenge"
                                ></textarea>
                              </div>
                            </div>
                          )}

                          <div className="mt-6 flex justify-end">
                            <AnimatedButton
                              onClick={() => markSectionComplete(section.id)}
                              variant="primary"
                              className="flex items-center"
                            >
                              Continue <ChevronRight className="ml-2 w-4 h-4" />
                            </AnimatedButton>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="flex justify-between items-center pt-6">
                <p className="text-sm text-gray-500">
                  Your information is secure and will only be used to provide
                  you with a better branding solution.
                </p>
                <AnimatedButton type="submit" variant="primary" size="lg">
                  Submit Audit
                </AnimatedButton>
              </div>
            </form>
            {isSubmitted && (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-700">
                  We'll analyze your brand and send your FREE brand audit report
                  within 24-48 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
