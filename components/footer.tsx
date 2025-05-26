import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "./scroll-reveal";

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="slide-left">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Stay in the loop
                </h3>
                <p className="text-gray-400 mb-0">
                  Subscribe to our newsletter for the latest insights on
                  branding, web design, and digital marketing.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right">
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#e5792c] focus:border-transparent transition-all duration-300"
                  />
                  <button className="bg-[#e5792c] text-white rounded-lg px-6 py-3 font-medium transition-all hover:bg-[#d06a25] whitespace-nowrap relative overflow-hidden group">
                    <span className="relative z-10">Subscribe</span>
                    <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-10"></span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <ScrollReveal delay={100}>
            <div>
              <div className="text-2xl font-medium mb-6 relative group">
                naqsh
                <span className="text-[#e5792c] inline-block transition-transform duration-300 group-hover:rotate-45">
                  .
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Premium branding and web solutions to elevate your business and
                drive growth.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/naqsh.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#e5792c] transition-all duration-300 hover:scale-110 transform"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/naqsh_agency?igsh=MXQ4NnVjZXltYTVsNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#e5792c] transition-all duration-300 hover:scale-110 transform"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#e5792c] transition-all duration-300 hover:scale-110 transform"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Branding
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    SEO Services
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <Mail className="w-5 h-5 mr-3 text-[#e5792c] flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    connect@naqsh.agency
                  </span>
                </li>
                <li className="flex items-start group">
                  <Phone className="w-5 h-5 mr-3 text-[#e5792c] flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    +15055339557
                  </span>
                </li>
                <li className="flex items-start group">
                  <MapPin className="w-5 h-5 mr-3 text-[#e5792c] flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    1209 MOUNTAIN RD PL NE STE R ALBUQUERQUE, NM 87110
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Naqsh Agency. All rights
              reserved.
            </p>
            {/* <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
