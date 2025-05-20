"use client";

import AnimatedButton from "@/components/animated-button";
import AnimatedCard from "@/components/animated-card";
import Footer from "@/components/footer";
import FaqSection from '@/components/home/FaqSection';
import BrandLogos from '@/components/shared/BrandLogos'
import Navbar from "@/components/navbar";
import PaymentModal from "@/components/payment-modal";
import PricingCard from "@/components/pricing-card";
import ScrollReveal from "@/components/scroll-reveal";
import SectionHeading from "@/components/section-heading";
import { useAnimation } from "framer-motion";
import {
  ArrowRight,
  Award,
  Code,
  Palette,
  Search,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({
    name: "",
    price: "",
  });

  // Process section animation
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const processControls = useAnimation();

  useEffect(() => {
    if (processInView) {
      processControls.start("visible");
    }
  }, [processControls, processInView]);

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const handleOpenPaymentModal = (
    packageName: string,
    packagePrice: string
  ) => {
    setSelectedPackage({ name: packageName, price: packagePrice });
    setShowPaymentModal(true);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}

      {/* Hero Section with enhanced animations */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] to-white -z-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#e5792c] opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#e5792c] opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block animate-fade-in">
                <span className="bg-[#e5792c] bg-opacity-10 text-[#e5792c] px-4 py-1 rounded-full text-sm font-medium">
                  Premium Branding Agency
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-slide-up">
                Premium{" "}
                <span
                  className="gradient-text relative inline-block"
                  style={{
                    background:
                      "linear-gradient(90deg, #e5792c 0%, #f7a45c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 1px 2px rgba(229, 121, 44, 0.1)",
                    paddingBottom: "10px",
                  }}
                >
                  Branding
                </span>{" "}
                & Web Solutions
              </h1>

              <p className="text-lg md:text-xl text-gray-600 animate-slide-up delay-100">
                We craft strategic brand identities and digital experiences that
                transform businesses and drive meaningful growth.
              </p>

              <div className="flex flex-wrap gap-4 animate-slide-up delay-200">
                <AnimatedButton
                  href="https://calendly.com/naqshagencyofficial/brand_consultation"
                  variant="primary"
                  size="lg"
                  external={true}
                >
                  Schedule a Meeting
                </AnimatedButton>

                <AnimatedButton href="#pricing" variant="outline" size="lg">
                  View Pricing
                </AnimatedButton>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500 animate-fade-in delay-300">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-2">
                    <Award className="w-4 h-4 text-[#e5792c]" />
                  </div>
                  <span>Award Winning</span>
                </div>

                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-2">
                    <Users className="w-4 h-4 text-[#e5792c]" />
                  </div>
                  <span>100+ Happy Clients</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden animate-scale-in">
                <Image
                  src="/main-image.jpg?height=500&width=500"
                  alt="Naqsh Agency"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#e5792c] flex items-center justify-center text-white mr-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Strategic Branding</h3>
                      <p className="text-sm text-gray-600">
                        Transform your business identity
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#e5792c] rounded-lg rotate-12 animate-pulse opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#171717] rounded-full -rotate-12 animate-pulse opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm">
              TRUSTED BY INNOVATIVE COMPANIES
            </p>
          </div>
          <BrandLogos/>
        </div>
      </section>

      {/* Services Section with animations */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <ScrollReveal>
            <SectionHeading
              title="Our Services"
              subtitle="We offer comprehensive branding and digital solutions tailored to your business needs"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="slide-up" delay={100}>
              <AnimatedCard
                title="Brand Strategy"
                description="We develop strategic brand frameworks that position your business for success and resonate with your target audience."
                icon={<Palette className="w-10 h-10" />}
                hoverEffect="lift"
              />
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={200}>
              <AnimatedCard
                title="Web Design & Development"
                description="Custom websites that combine stunning design with seamless functionality to create exceptional user experiences."
                icon={<Code className="w-10 h-10" />}
                hoverEffect="lift"
              />
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={300}>
              <AnimatedCard
                title="SEO Services"
                description="Data-driven SEO strategies that boost your search rankings, increase organic traffic, and deliver measurable ROI for your business."
                icon={<Search className="w-10 h-10" />}
                hoverEffect="lift"
              />
            </ScrollReveal>
          </div>

          <div className="text-center mt-12">
            <ScrollReveal>
              <AnimatedButton
                href="/services"
                variant="outline"
                className="group"
              >
                <span className="relative z-10">
                  Explore All Services{" "}
                  <ArrowRight className="ml-2 w-4 h-4 inline-block transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10"></span>
                <span className="absolute -inset-[3px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center bg-white opacity-10 group-hover:opacity-0 delay-100"></span>
              </AnimatedButton>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Facts Section - Branding Mistakes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold mb-4">
                The Hard Truth About Branding
              </h2>
              <div className="w-24 h-1 bg-[#e5792c] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">
                Most startups and businesses struggle with branding because of
                these common mistakes
              </p>
            </div>
          </ScrollReveal>

          <div className="mb-12">
            <div className="bg-[#171717] p-10 rounded-xl shadow-lg mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e5792c] opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="text-white mr-1">
                    <span className="text-3xl font-bold">80%</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    of startups <span className="text-[#e5792c]">fail</span> in
                    the first 5 years
                  </h3>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  Weak branding is a{" "}
                  <span className="text-[#e5792c] font-bold">major factor</span>{" "}
                  in business failure. Most companies struggle with these
                  critical branding mistakes:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal animation="slide-up" delay={100}>
                <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Inconsistent Brand Identity
                      </h3>
                      <p className="text-gray-600">
                        Customers can't recognize or trust your business when
                        your visual identity changes across different platforms
                        and touchpoints.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-up" delay={200}>
                <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Outdated Website & Design
                      </h3>
                      <p className="text-gray-600">
                        Your outdated online presence is actively driving away
                        potential customers and damaging your professional
                        credibility.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-up" delay={300}>
                <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Lack of Differentiation
                      </h3>
                      <p className="text-gray-600">
                        When you blend in with competitors, you become invisible
                        to potential customers who can't see why they should
                        choose you.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-up" delay={400}>
                <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Weak Messaging</h3>
                      <p className="text-gray-600">
                        Confusing taglines and inconsistent brand voice are
                        actively pushing potential customers toward your
                        competitors.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal
                animation="slide-up"
                delay={500}
                className="md:col-span-2"
              >
                <div className="bg-gradient-to-r from-[#171717] to-[#2a2a2a] p-6 rounded-lg shadow-md text-white">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-16 h-16 bg-[#e5792c]/20 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#e5792c]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        DIY Branding Is Costing You Money
                      </h3>
                      <p className="text-gray-300">
                        Amateur logos and cheap design aren't saving you
                        money—they're costing you credibility, customers, and
                        revenue. Every day you wait with subpar branding is
                        another day of lost opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal animation="fade" delay={600}>
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-600 italic max-w-3xl mx-auto">
                  "We get it. Seeing your brand struggle is frustrating. That's
                  why we help businesses transform into strong, unforgettable
                  brands."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feelings Section - Emotional Connection */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[#171717]/[0.02] -skew-y-6 transform -translate-y-32"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#e5792c] opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#e5792c] opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="slide-left">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#e5792c]">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Does This Sound Familiar?
                </h2>
                <div className="w-24 h-1 bg-[#e5792c] mb-8"></div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e5792c] flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-bold">
                        You've spent months (or years) building your business
                      </span>
                      , but it still doesn't stand out in a crowded marketplace.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e5792c] flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-bold">
                        You feel embarrassed sharing your brand materials
                      </span>{" "}
                      because they look amateur compared to your competitors.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e5792c] flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-bold">
                        Your marketing efforts aren't delivering results
                      </span>{" "}
                      because people don't remember or recognize your brand.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e5792c] flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-bold">
                        You're losing sales to competitors
                      </span>{" "}
                      with stronger branding and a better online presence.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#171717] text-white rounded-lg">
                  <p className="text-lg">
                    {" "}
                    <span className="font-bold">
                      It's frustrating. It's exhausting.
                    </span>{" "}
                    And worst of all… it's holding your business back from the
                    success you deserve.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right">
              <div className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e5792c]/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>

                <h3 className="text-2xl font-bold mb-6 relative z-10">
                  Imagine a Brand That...
                </h3>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-bold text-lg">
                        Instantly attracts the right customers
                      </span>
                      <br />
                      No more chasing clients who aren't a good fit or
                      explaining what makes you different.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-bold text-lg">
                        Looks modern, premium, and unforgettable
                      </span>
                      <br />
                      Stand out in a crowded marketplace with confidence and
                      command higher prices.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-bold text-lg">
                        Makes marketing effortless
                      </span>
                      <br />
                      Because people already trust and recognize your brand
                      before you even pitch.
                    </p>
                  </div>
                </div>

                <div className="mt-10 relative z-10">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                    <div className="flex items-start">
                      <div className="text-4xl text-[#e5792c] font-serif mr-4">
                        ❝
                      </div>
                      <p className="text-gray-700 italic">
                        We don't just design—we build brands that{" "}
                        <span className="font-bold">
                          feel right, stand out, and grow your business
                        </span>
                        . Start with our free brand audit to see where you
                        stand.
                      </p>
                    </div>
                  </div>

                  <AnimatedButton
                    href="/brand-audit"
                    variant="primary"
                    size="lg"
                  >
                      Conduct Free Brand Audit
                  </AnimatedButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="py-16 md:py-24 bg-white" id="pricing">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#e5792c]/10 rounded-full blur-xl"></div>
            <span className="inline-block px-4 py-1 bg-[#e5792c]/10 text-[#e5792c] rounded-full text-sm font-medium mb-4">
              TAILORED SOLUTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
              Premium Branding Packages
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#e5792c]/30 via-[#e5792c] to-[#e5792c]/30 rounded-full"></span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the perfect branding package to elevate your business and
              stand out from the competition with our professionally crafted
              solutions.
            </p>
          </div>

         <div className="flex flex-col md:flex-row justify-center items-stretch mt-12 relative px-4 gap-8">
  {/* First Package - Startup Plan */}
  <div className="w-full md:w-1/3 max-w-sm">
    <PricingCard
      title="Startup Plan"
      price="$4,998"
      serviceDurationIn='/Year'
      description="Perfect for startups and small businesses looking to establish a professional brand identity."
      features={[
        "Logo Design (3 Concepts)",
        "Brand Style Guide",
        "Business Card Design",
        "Social Media Kit",
        "Email Signature",
        "1-Page	High-Converting	Website,	Mobile-Optimized	&	SEO-Ready",
        "Clear	CTA	&	Booking	Integration", 
        "Website maintenance &	Support (1 Year)",
        "Domain	&	Hosting(1	year)"
      ]}
      ctaLink="https://buy.stripe.com/cNifZi9Zi3EV8MwbH70gw00"
      className="border border-gray-200 hover:border-[#e5792c] h-full w-full transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 pricing-card-essential"
      urgencyIndicator={
        <div className="mt-4 mb-2 flex justify-center">
          <div className="px-3 py-1 bg-red-50 border border-red-100 rounded-full flex items-center space-x-1 animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="text-xs text-red-600 font-medium">
              Only 2 spots left this month
            </span>
          </div>
        </div>
      }
    />
  </div>

  {/* Popular Package - Business Plan */}
  <div className="w-full md:w-1/3 max-w-sm relative">
    <PricingCard
      title="Business Plan"
      price="$9,898"
      serviceDurationIn='/Year'
      description="Comprehensive branding solution for growing businesses ready to make a stronger market impact."
      features={[
        "Logo Design (5 Concepts)",
        "Complete Brand Guidelines",
        "Social Media Kit",
        "Stationery Design Suite",
        "Marketing Collateral",
        "Content Creation",
        "5-Page Custom High converting website",
        "Clear CTA & Booking Integration",
        "Advanced SEO Setup & Blog Integration",
        "Website maintenance & Support (1 Year)",
        "Domain & Hosting(1 year)",
        "Conversion-Optimized"
      ]}
     
      ctaLink="https://buy.stripe.com/00w4gA9Zi1wNaUEdPf0gw01"
      popular={true}
      className="transform transition-all duration-500 hover:-translate-y-2 border-2 border-[#e5792c] h-full pricing-card-business"
      urgencyIndicator={
        <div className="mt-4 mb-2 flex justify-center">
          <div className="px-3 py-1 bg-red-50 border border-red-100 rounded-full flex items-center space-x-1 animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="text-xs text-red-600 font-medium">
              Only 2 spots left this month
            </span>
          </div>
        </div>
      }
    />
  </div>

  {/* Third Package - Enterprise Plan */}
  <div className="w-full md:w-1/3 max-w-sm">
    <PricingCard
      title="Enterprise Plan"
      price="Let's Talk"
      description="All-inclusive branding package for established businesses seeking a complete brand transformation."
      features={[
        "Custom Enterprise Solutions",
        "Unlimited Brand Concepts",
        "Full-Service Graphic Design",
        "Full Digital Presence",
        "Complex Website Development",
        "Mobile	App	Development",
        "Backend Development & Handling",
        "E-commerce Store Creation",
        "CRM, or Advanced Funnel Setup",
        "Top Marketing Talent Access",
        "Advanced Marketing Strategy",
        "Dedicated Account Manager",
        "Priority Support",
        "Flexible Payment Terms",
      ]}
    
      ctaLink="https://calendly.com/naqshagencyofficial/brand_consultation"
      className="border border-gray-200 hover:border-[#e5792c] h-full w-full transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2"
      isEnterprise={true}
    />
  </div>
</div>

          {/* White Labeled Service - Redesigned */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg relative overflow-hidden border border-gray-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e5792c] opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="bg-[#e5792c]/10 p-4 rounded-full mr-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-[#e5792c]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M9 3v18"></path>
                      <path d="M14 15l3-3-3-3"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#171717] mb-2">
                      White Labeled Services
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      Need to keep our partnership confidential? We offer white
                      labeled services for clients who prefer not to disclose
                      our agency's involvement with their brand.
                    </p>
                  </div>
                </div>

                <AnimatedButton
                  href="https://calendly.com/naqshagencyofficial/brand_consultation"
                  external={true}
                  variant="primary"
                  className="whitespace-nowrap group"
                >
                    Schedule a Private Meeting
                </AnimatedButton>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#e5792c]/30 via-[#e5792c] to-[#e5792c]/30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <ScrollReveal>
            <SectionHeading
              title="Featured Work"
              subtitle="Explore our recent projects and see how we've helped businesses transform their brand and digital presence"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal animation="slide-left">
              <div className="relative group overflow-hidden rounded-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Project 1"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">
                    Brand Identity Redesign
                  </h3>
                  <p className="text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Complete brand overhaul for a tech startup that needed to
                    reposition itself in the market.
                  </p>
                  <Link
                    href="/portfolio/1"
                    className="inline-flex items-center text-[#e5792c] hover:text-white transition-colors"
                  >
                    View Project <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right">
              <div className="relative group overflow-hidden rounded-lg">
                <div className="relative h-[400px]">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Project 2"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">
                    E-commerce Website Redesign
                  </h3>
                  <p className="text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Modern, responsive e-commerce website with enhanced user
                    experience and conversion optimization.
                  </p>
                  <Link
                    href="/portfolio/2"
                    className="inline-flex items-center text-[#e5792c] hover:text-white transition-colors"
                  >
                    View Project <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="text-center mt-12">
            <ScrollReveal>
              <AnimatedButton
                href="/portfolio"
                variant="primary"
                className="group"
              >
                View All Projects
              </AnimatedButton>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal>
            <SectionHeading
              title="Our Branding Process"
              subtitle="We follow a strategic approach to create powerful brands that drive business growth"
            />
          </ScrollReveal>

          <div className="mt-12 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-28 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="hover:-translate-y-1 translate-y-0 transition hover:shadow-sm duration-300 bg-white p-6 rounded-lg shadow-sm relative z-10">
                <div className="w-16 h-16 bg-[#e5792c] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">
                  Discovery
                </h3>
                <p className="text-gray-600 text-center">
                  We dive deep to understand your business, audience, and goals
                  to create a strategic foundation.
                </p>
              </div>

              <div className="hover:-translate-y-1 translate-y-0 transition hover:shadow-sm duration-300 bg-white p-6 rounded-lg shadow-sm relative z-10">
                <div className="w-16 h-16 bg-[#e5792c] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Strategy</h3>
                <p className="text-gray-600 text-center">
                  We develop a comprehensive brand strategy that positions you
                  uniquely in the market.
                </p>
              </div>

              <div className=" hover:-translate-y-1 translate-y-0 transition hover:shadow-sm duration-300 bg-white p-6 rounded-lg shadow-sm relative z-10">
                <div className="w-16 h-16 bg-[#e5792c] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Design</h3>
                <p className="text-gray-600 text-center">
                  Our creative team crafts visual elements that bring your brand
                  strategy to life.
                </p>
              </div>

              <div className="hover:-translate-y-1 translate-y-0 transition hover:shadow-sm bg-white p-6 rounded-lg shadow-sm relative z-10">
                <div className="w-16 h-16 bg-[#e5792c] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">
                  Development
                </h3>
                <p className="text-gray-600 text-center">
                  We build and implement your brand assets across all relevant
                  platforms and touchpoints.
                </p>
              </div>

              <div className="hover:-translate-y-1 translate-y-0 transition hover:shadow-sm  bg-white p-6 rounded-lg shadow-sm relative z-10">
                <div className="w-16 h-16 bg-[#e5792c] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  5
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Launch</h3>
                <p className="text-gray-600 text-center">
                  We deliver a complete brand package and guide you through
                  successful implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal>
            <SectionHeading
              title="What Our Clients Say"
              subtitle="Don't just take our word for it - hear from some of our satisfied clients who have transformed their brands with us"
            />
          </ScrollReveal>

          {/* Testimonial Carousel */}
          <div className="mt-12 relative">
            {/* Desktop Testimonials Grid */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              <ScrollReveal animation="slide-up" delay={100}>
                <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5792c]/5 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="text-[#e5792c] text-4xl font-serif mb-4 z-20">
                    "
                  </div>
                  <p className="text-gray-700 mb-6 relative z-20">
                    Working with Naqsh Agency transformed our brand completely.
                    Their strategic approach and creative solutions helped us
                    stand out in a competitive market and achieve our business
                    goals.
                  </p>
                  <div className="flex items-center z-20 relative">
                    <div className="w-12 h-12 rounded-full mr-4 overflow-hidden relative">
                      <Image
                        src="https://randomuser.me/api/portraits/women/28.jpg"
                        alt="Sarah Johnson"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">CEO, TechStart</p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 flex z-20">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-up" delay={200}>
                <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5792c]/5 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="text-[#e5792c] text-4xl font-serif mb-4 z-20">
                    "
                  </div>
                  <p className="text-gray-700 mb-6 relative z-20">
                    The team at Naqsh Agency exceeded our expectations. Their
                    attention to detail and understanding of our industry
                    resulted in a website that not only looks great but also
                    converts visitors into customers.
                  </p>
                  <div className="flex items-center z-20 relative">
                    <div className="w-12 h-12 rounded-full mr-4 overflow-hidden relative">
                      <Image
                        src="https://randomuser.me/api/portraits/men/54.jpg"
                        alt="Michael Chen"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Michael Chen</h4>
                      <p className="text-sm text-gray-500">
                        Marketing Director, Innovate Corp
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 flex z-20">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-up" delay={300}>
                <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5792c]/5 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="text-[#e5792c] text-4xl font-serif mb-4 z-20">
                    "
                  </div>
                  <p className="text-gray-700 mb-6 relative z-20">
                    I was impressed by how quickly Naqsh Agency understood our
                    vision. They delivered a brand identity that perfectly
                    captures our values and resonates with our target audience.
                    Highly recommended!
                  </p>
                  <div className="flex items-center z-20 relative">
                    <div className="w-12 h-12 rounded-full mr-4 overflow-hidden relative">
                      <Image
                        src="https://randomuser.me/api/portraits/women/68.jpg"
                        alt="Emma Rodriguez"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Emma Rodriguez
                      </h4>
                      <p className="text-sm text-gray-500">
                        Founder, GreenLife
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 flex z-20">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Second Row of Testimonials */}
            <div className="hidden md:grid grid-cols-3 gap-6 mt-6">
              <ScrollReveal animation="slide-up" delay={400}>
                <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5792c]/5 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="text-[#e5792c] text-4xl font-serif mb-4 z-20">
                    "
                  </div>
                  <p className="text-gray-700 mb-6 relative z-20">
                    The SEO strategy implemented by Naqsh Agency increased our
                    organic traffic by 200% in just three months. Their
                    data-driven approach and continuous optimization have been
                    key to our online success.
                  </p>
                  <div className="flex items-center z-20 relative">
                    <div className="w-12 h-12 rounded-full mr-4 overflow-hidden relative">
                      <Image
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="David Kim"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">David Kim</h4>
                      <p className="text-sm text-gray-500">
                        Digital Marketing Director, ShopEasy
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 flex z-20">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-up" delay={500}>
                <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5792c]/5 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="text-[#e5792c] text-4xl font-serif mb-4 z-20">
                    "
                  </div>
                  <p className="text-gray-700 mb-6 relative z-20">
                    Partnering with Naqsh Agency was the best decision for our
                    rebrand. They delivered a comprehensive brand strategy and
                    visual identity that has completely transformed how our
                    customers perceive us.
                  </p>
                  <div className="flex items-center z-20 relative">
                    <div className="w-12 h-12 rounded-full mr-4 overflow-hidden relative">
                      <Image
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Jennifer Taylor"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Jennifer Taylor
                      </h4>
                      <p className="text-sm text-gray-500">
                        CEO, CloudSolutions
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 flex z-20">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-up" delay={600}>
                <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5792c]/5 rounded-full transform translate-x-8 -translate-y-8"></div>
                  <div className="text-[#e5792c] text-4xl font-serif mb-4 z-20">
                    "
                  </div>
                  <p className="text-gray-700 mb-6 relative z-20">
                    Our partnership with Naqsh Agency has been a game-changer
                    for our business. Their expertise in branding and digital
                    marketing has helped us reach new customers and grow our
                    revenue.
                  </p>
                  <div className="flex items-center z-20 relative">
                    <div className="w-12 h-12 rounded-full mr-4 overflow-hidden relative">
                      <Image
                        src="https://randomuser.me/api/portraits/men/77.jpg"
                        alt="Robert Davis"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Robert Davis</h4>
                      <p className="text-sm text-gray-500">
                        Sales Director, GlobalTech
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 flex z-20">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
     <FaqSection/>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <ScrollReveal>
            <SectionHeading
              title="Let's Discuss Your Project"
              subtitle="Ready to transform your brand and digital presence? Contact us today to schedule a consultation"
            />
          </ScrollReveal>

          {/* Contact Form */}
          <div className="mt-12 max-w-3xl mx-auto">
            <ScrollReveal animation="slide-up">
              <form className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <AnimatedButton
                  variant="primary"
                  type="submit"
                  className="group"
                >
                  Send Message
                </AnimatedButton>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
