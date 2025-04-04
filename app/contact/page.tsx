import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Contact Header */}
      <section className="bg-[#171717] text-white py-16 md:py-24 mt-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Let's discuss how we can help transform your brand and achieve your business goals
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. We're looking forward to learning
                more about your project.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">Please enter your full name.</p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                      placeholder="Your email"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">Please enter a valid email address.</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                    placeholder="Your phone number"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Optional: Include your phone number for a faster response.
                  </p>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="branding">Branding</option>
                    <option value="web-design">Web Design</option>
                    <option value="web-development">Web Development</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="digital-marketing">Digital Marketing</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                    placeholder="Tell us about your project"
                    required
                  ></textarea>
                  <p className="mt-1 text-sm text-gray-500">Please provide details about your project and goals.</p>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <div className="bg-[#ededed] p-8 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-[#e5792c] mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-gray-600">info@naqsh.agency</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-[#e5792c] mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#e5792c] mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Address</h4>
                      <p className="text-gray-600">
                        123 Design Street
                        <br />
                        Creative City, 10001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=600"
                  alt="Office Location Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              Find answers to common questions about our services and process
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-[#ededed] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">What is your typical process for a new project?</h3>
                <p className="text-gray-600">
                  Our proven 5-step process includes Discovery, Strategy, Design, Development, and Launch. We begin by
                  understanding your business goals and target audience, then develop a tailored strategy to achieve
                  those goals through exceptional design and implementation.
                </p>
              </div>

              <div className="bg-[#ededed] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">How long does a typical project take?</h3>
                <p className="text-gray-600">
                  Project timelines vary based on scope and complexity. A typical branding project takes 4-6 weeks,
                  while a comprehensive website project can take 6-12 weeks. We'll provide a detailed timeline during
                  our initial consultation based on your specific requirements.
                </p>
              </div>

              <div className="bg-[#ededed] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">What is your pricing structure?</h3>
                <p className="text-gray-600">
                  We offer customized pricing based on your specific needs and project requirements. We provide detailed
                  proposals with transparent pricing after our initial consultation to understand your project scope.
                </p>
              </div>

              <div className="bg-[#ededed] p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Do you offer ongoing support after project completion?</h3>
                <p className="text-gray-600">
                  Yes, we offer various maintenance and support packages to ensure your brand and website continue to
                  perform optimally after launch. We can discuss these options during our consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#171717] text-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand?</h2>
            <p className="text-lg mb-8">
              Book a free 30-minute consultation to discuss your project and how we can help you achieve your business
              goals.
            </p>
            <Link
              href="/contact"
              className="bg-[#e5792c] text-white rounded-full px-8 py-4 font-medium text-lg transition-all hover:bg-[#d06a25] inline-block"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

