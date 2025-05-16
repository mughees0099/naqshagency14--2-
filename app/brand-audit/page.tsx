"use client";

import AnimatedButton from "@/components/animated-button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

// Define the form data types
type PersonalInfo = {
  fullName: string;
  email: string;
  phoneNumber?: string;
  companyName: string;
  websiteUrl?: string;
  industry: string;
};

type BrandIdentity = {
  brandDescription: string;
  brandMission: string;
  hasLogo: string;
  brandConsistency: string;
  brandRecognition: string;
  marketingChannels: string[];
};

type OnlinePresence = {
  socialMediaActivity: string;
  websiteStatus: string;
  customerInquiries: string;
  paidAds: string;
  analyticsTracking: string;
  brandingChallenge: string;
};

type BrandAuditFormData = {
  personal: PersonalInfo;
  identity: BrandIdentity;
  online: OnlinePresence;
};

const brandAuditSchema = z.object({
  personal: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    companyName: z.string().min(1, "Company name is required"),
    websiteUrl: z.string().optional(),
    industry: z.string().min(1, "Industry is required"),
  }),
  identity: z.object({
    brandDescription: z.string().min(1, "Brand description is required"),
    brandMission: z.string().min(1, "Brand mission is required"),
    hasLogo: z.string().min(1, "Please select an option"),
    brandConsistency: z.string().min(1, "Please select an option"),
    brandRecognition: z.string().min(1, "Please select an option"),
    marketingChannels: z.array(z.string()).min(1, "Select at least one channel"),
  }),
  online: z.object({
    socialMediaActivity: z.string().min(1, "Please select an option"),
    websiteStatus: z.string().min(1, "Please select an option"),
    customerInquiries: z.string().min(1, "Please select an option"),
    paidAds: z.string().min(1, "Please select an option"),
    analyticsTracking: z.string().min(1, "Please select an option"),
    brandingChallenge: z.string().min(1, "Please describe your challenge"),
  }),
});

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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BrandAuditFormData>({
    resolver: zodResolver(brandAuditSchema),
    defaultValues: {
      personal: {
        fullName: "",
        email: "",
        companyName: "",
        industry: "",
      },
      identity: {
        brandDescription: "",
        brandMission: "",
        hasLogo: "",
        brandConsistency: "",
        brandRecognition: "",
        marketingChannels: [],
      },
      online: {
        socialMediaActivity: "",
        websiteStatus: "",
        customerInquiries: "",
        paidAds: "",
        analyticsTracking: "",
        brandingChallenge: "",
      },
    },
  });

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

  const onSubmit: SubmitHandler<BrandAuditFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/brand-audit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add new function to handle form errors
  const handleFormError = (errors: any) => {
    // Find the first section with errors
    const sectionsWithErrors = sections.map(section => {
      const hasErrors = Object.keys(errors).includes(section.id);
      return { ...section, hasErrors };
    });

    // Open the first section with errors
    const firstErrorSection = sectionsWithErrors.find(section => section.hasErrors);
    if (firstErrorSection) {
      setSections(
        sections.map((section) => ({
          ...section,
          isOpen: section.id === firstErrorSection.id,
        }))
      );
    }
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
                    width: `${(sections.filter((s) => s.isCompleted).length /
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

            <form onSubmit={handleSubmit(onSubmit, handleFormError)} className="space-y-6">
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
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${section.isCompleted
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
                      className={`w-5 h-5 text-gray-500 transition-transform ${section.isOpen ? "transform rotate-180" : ""
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
                                  {...register("personal.fullName")}
                                  type="text"
                                  className={`w-full px-4 py-2 rounded-lg border ${errors.personal?.fullName ? "border-red-500" : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent`}
                                  placeholder="Enter your full name"
                                />
                                {errors.personal?.fullName && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.personal.fullName.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Email Address
                                </label>
                                <input
                                  {...register("personal.email")}
                                  type="email"
                                  className={`w-full px-4 py-2 rounded-lg border ${errors.personal?.email ? "border-red-500" : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent`}
                                  placeholder="Enter your email address"
                                />
                                {errors.personal?.email && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.personal.email.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Phone Number
                                </label>
                                <input
                                  {...register("personal.phoneNumber")}
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
                                  {...register("personal.companyName")}
                                  type="text"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your company name"
                                />
                                {errors.personal?.companyName && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.personal.companyName.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Website URL
                                </label>
                                <input
                                  {...register("personal.websiteUrl")}
                                  type="url"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your website URL"
                                />
                                {errors.personal?.websiteUrl && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.personal.websiteUrl.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Industry/Niche
                                </label>
                                <select
                                  {...register("personal.industry")}
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                >
                                  <option value="">Select your industry</option>
                                  <option value="E-commerce">E-commerce</option>
                                  <option value="SaaS">SaaS</option>
                                  <option value="Health & Wellness">Health & Wellness</option>
                                  <option value="Real Estate">Real Estate</option>
                                  <option value="Finance">Finance</option>
                                  <option value="Education">Education</option>
                                  <option value="Technology">Technology</option>
                                  <option value="Hospitality">Hospitality</option>
                                  <option value="Other">Other</option>
                                </select>
                                {errors.personal?.industry && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.personal.industry.message}
                                  </p>
                                )}
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
                                  {...register("identity.brandDescription")}
                                  type="text"
                                  className={`w-full px-4 py-2 rounded-lg border ${errors.identity?.brandDescription ? "border-red-500" : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent`}
                                  placeholder="e.g., Innovative, Reliable, Friendly"
                                />
                                {errors.identity?.brandDescription && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.identity.brandDescription.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  What is your brand's mission or core message?
                                </label>
                                <input
                                  {...register("identity.brandMission")}
                                  type="text"
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  placeholder="Enter your brand's mission"
                                />
                                {errors.identity?.brandMission && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.identity.brandMission.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do you have a professional logo?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.hasLogo")}
                                      type="radio"
                                      value="Yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.hasLogo")}
                                      type="radio"
                                      value="No"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                </div>
                                {errors.identity?.hasLogo && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.identity.hasLogo.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Are your brand colors and fonts consistent
                                  across all platforms?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.brandConsistency")}
                                      type="radio"
                                      value="yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.brandConsistency")}
                                      type="radio"
                                      value="No"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.brandConsistency")}
                                      type="radio"
                                      value="Not Sure"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Not Sure</span>
                                  </label>
                                </div>
                                {errors.identity?.brandConsistency && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.identity.brandConsistency.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do people easily recognize and remember your
                                  brand?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.brandRecognition")}
                                      type="radio"
                                      value="Yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.brandRecognition")}
                                      type="radio"
                                      value="No"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("identity.brandRecognition")}
                                      type="radio"
                                      value="Needs Improvement"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Needs Improvement</span>
                                  </label>
                                </div>
                                {errors.identity?.brandRecognition && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.identity.brandRecognition.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Where do you currently market your brand?
                                  (Select all that apply)
                                </label>
                                <div className="space-y-2">
                                  {[
                                    "Social Media",
                                    "Website",
                                    "Paid Ads",
                                    "Email Marketing",
                                    "Word of Mouth",
                                    "Print Media",
                                  ].map((channel) => (
                                    <label key={channel} className="flex items-center">
                                      <input
                                        type="checkbox"
                                        value={channel.toLowerCase().replace(/\s+/g, "-")}
                                        {...register("identity.marketingChannels")}
                                        className="text-[#e5792c] rounded"
                                      />
                                      <span className="ml-2">{channel}</span>
                                    </label>
                                  ))}
                                </div>
                                {errors.identity?.marketingChannels && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.identity.marketingChannels.message}
                                  </p>
                                )}
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
                                <select
                                  {...register("online.socialMediaActivity")}
                                  className={`w-full px-4 py-2 rounded-lg border ${errors.online?.socialMediaActivity ? "border-red-500" : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent`}
                                >
                                  <option value="">Select an option</option>
                                  <option value="Very Active">Very Active</option>
                                  <option value="Occasionally">Occasionally</option>
                                  <option value="Rarely">Rarely</option>
                                  <option value="Not At All">Not at All</option>
                                </select>
                                {errors.online?.socialMediaActivity && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.online.socialMediaActivity.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do you have a well-designed and optimized
                                  website?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.websiteStatus")}
                                      type="radio"
                                      value="Yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.websiteStatus")}
                                      type="radio"
                                      value="No"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.websiteStatus")}
                                      type="radio"
                                      value="Needs Improvement"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Needs Improvement</span>
                                  </label>
                                </div>
                                {errors.online?.websiteStatus && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.online.websiteStatus.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  How often do you get customer inquiries from
                                  your website?
                                </label>
                                <select
                                  {...register("online.customerInquiries")}
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                >
                                  <option value="">Select an option</option>
                                  <option value="Daily">Daily</option>
                                  <option value="Weekly">Weekly</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Rarely">Rarely</option>
                                  <option value="Never">Never</option>
                                </select>
                                {errors.online?.customerInquiries && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.online.customerInquiries.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Are you running any paid ads for your brand?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.paidAds")}
                                      type="radio"
                                      value="Yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.paidAds")}
                                      type="radio"
                                      value="No"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.paidAds")}
                                      type="radio"
                                      value="Planning To"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Planning To</span>
                                  </label>
                                </div>
                                {errors.online?.paidAds && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.online.paidAds.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Do you track analytics (traffic, engagement,
                                  conversions)?
                                </label>
                                <div className="space-x-4">
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.analyticsTracking")}
                                      type="radio"
                                      value="Yes"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Yes</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.analyticsTracking")}
                                      type="radio"
                                      value="No"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">No</span>
                                  </label>
                                  <label className="inline-flex items-center">
                                    <input
                                      {...register("online.analyticsTracking")}
                                      type="radio"
                                      value="Not Sure"
                                      className="text-[#e5792c]"
                                    />
                                    <span className="ml-2">Not Sure</span>
                                  </label>
                                </div>
                                {errors.online?.analyticsTracking && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.online.analyticsTracking.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  What branding challenge are you facing the
                                  most?
                                </label>
                                <textarea
                                  {...register("online.brandingChallenge")}
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                                  rows={3}
                                  placeholder="Describe your biggest branding challenge"
                                ></textarea>
                                {errors.online?.brandingChallenge && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.online.brandingChallenge.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="mt-6 flex justify-end">
                            <AnimatedButton
                              onClick={() => markSectionComplete(section.id)}
                              variant="primary"
                            >
                              <span className='flex items-center gap-1'>Continue <ChevronRight className="w-4 h-4" /></span>
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
                <div className="flex items-center gap-4">
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Audit"}
                  </AnimatedButton>
                </div>
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
