"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import AnimatedButton from "./animated-button"

export default function BrandAuditCTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Brand?
                <br />
                Start with a Free Brand Audit
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Take our comprehensive brand audit to identify areas of improvement and receive personalized
                recommendations for your business growth.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#e5792c] mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold mb-1">In-Depth Analysis</h3>
                    <p className="text-gray-600">Get a detailed evaluation of your current brand positioning</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#e5792c] mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold mb-1">Expert Insights</h3>
                    <p className="text-gray-600">Receive professional recommendations for improvement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#e5792c] mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold mb-1">Actionable Steps</h3>
                    <p className="text-gray-600">Get a clear roadmap for enhancing your brand presence</p>
                  </div>
                </div>
              </div>

              <AnimatedButton href="/brand-audit" variant="primary" size="lg" className="group">
                Conduct Brand Audit{" "}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white rounded-lg shadow-xl p-8 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#e5792c]/10 rounded-full flex items-center justify-center text-[#e5792c] mr-4">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Complete the Audit</h3>
                      <p className="text-sm text-gray-600">Answer questions about your brand and business</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#e5792c]/10 rounded-full flex items-center justify-center text-[#e5792c] mr-4">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Receive Analysis</h3>
                      <p className="text-sm text-gray-600">Get detailed insights about your brand's performance</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#e5792c]/10 rounded-full flex items-center justify-center text-[#e5792c] mr-4">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Review Recommendations</h3>
                      <p className="text-sm text-gray-600">Explore personalized suggestions for improvement</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#e5792c]/10 rounded-full flex items-center justify-center text-[#e5792c] mr-4">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Transform Your Brand</h3>
                      <p className="text-sm text-gray-600">Implement changes with our expert guidance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-64 h-64 bg-[#e5792c]/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-[#171717]/5 rounded-full blur-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

