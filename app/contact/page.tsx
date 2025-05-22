"use client";

import AnimatedButton from '@/components/animated-button';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import contactImg from "/public/contact-img.jpg";

// Define types for form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please enter a valid email address").min(1, "Email is required"),
  phone: z.string().trim().min(10, "Phone number is required"),
  service: z.string().trim().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required"),
});

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("There was an error sending your message.");
      }

      setSuccess("Your message has been sent successfully!");
      setError("");
      reset()
    } catch (err) {
      setError("There was an error sending your message. Please try again.");
      setSuccess("");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Contact Header */}
      <section className="bg-[#171717] text-white py-16 md:py-24 mt-20">
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

              {/* Contact Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                      placeholder="Your email"
                      required
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                    placeholder="Your phone number"
                    required
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    {...register("service")}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="Branding">Branding</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                  {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent"
                    placeholder="Tell us about your project"
                  ></textarea>
                  {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                </div>
                <AnimatedButton type="submit" className="w-full">
                  {loading ? "Sending..." : "Send Message"}
                </AnimatedButton>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-500">{success}</p>}
              </form>
            </div>

            {/* Contact Info */}
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
                      <p className="text-gray-600">+15055339557</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#e5792c] mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Address</h4>
                      <p className="text-gray-600">
                        1209 MOUNTAIN RD PL NE STE R ALBUQUERQUE, <br />
                        NM 87110
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden flex justify-center">
                <Image
                  src={contactImg}
                  alt="Office Location Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
