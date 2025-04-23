// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown } from "lucide-react";

// const navItems = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Services", href: "/services" },
//   {
//     name: "Portfolio",
//     href: "/portfolio",
//   },
//   { name: "Blog", href: "/blog" },
// ];

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeItem, setActiveItem] = useState<string | null>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-md" : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           <Link href="/" className="flex items-center">
//             <span className="text-2xl font-bold text-[#e5792c]">naqsh.</span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <NavItem
//                 key={item.name}
//                 item={item}
//                 activeItem={activeItem}
//                 setActiveItem={setActiveItem}
//               />
//             ))}
//           </div>

//           <Link
//             href="/contact"
//             className="hidden md:inline-block bg-[#e5792c] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-[#d06a25] transform hover:scale-105"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Contact Us
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// function NavItem({ item, activeItem, setActiveItem }) {
//   const pathname = usePathname();
//   const isActive =
//     pathname === item.href || pathname.startsWith(item.href + "/");

//   if (item.subItems) {
//     return (
//       <div
//         className="relative"
//         onMouseEnter={() => setActiveItem(item.name)}
//         onMouseLeave={() => setActiveItem(null)}
//       >
//         <Link
//           href={item.href}
//           className={`flex items-center space-x-1 text-lg font-medium transition-colors duration-200 ${
//             isActive ? "text-[#e5792c]" : "text-gray-800 hover:text-[#e5792c]"
//           }`}
//         >
//           <span>{item.name}</span>
//           <ChevronDown className="w-4 h-4" />
//         </Link>
//         <AnimatePresence>
//           {activeItem === item.name && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.2 }}
//               className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
//               onMouseEnter={() => setActiveItem(item.name)}
//               onMouseLeave={() => setActiveItem(null)}
//             >
//               {item.subItems.map((subItem) => (
//                 <Link
//                   key={subItem.name}
//                   href={subItem.href}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e5792c]"
//                 >
//                   {subItem.name}
//                 </Link>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     );
//   }

//   return (
//     <Link
//       href={item.href}
//       className={`text-lg font-medium transition-colors duration-200 ${
//         isActive ? "text-[#e5792c]" : "text-gray-800 hover:text-[#e5792c]"
//       }`}
//     >
//       {item.name}
//     </Link>
//   );
// }

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from '/public/naqsh-logo.png';

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <span className="text-2xl font-bold text-[#e5792c]">naqsh.</span> */}
            <Image
              src={logo}
              alt="Logo"
              height={200}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {/* Contact Button (Desktop) */}
          <Link
            href="/contact"
            className="hidden md:inline-block bg-[#e5792c] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-[#d06a25] transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md p-4 z-50"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium transition-colors duration-200 ${pathname === item.href
                      ? "text-[#e5792c]"
                      : "text-gray-800 hover:text-[#e5792c]"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Contact Button (Mobile) */}
              <Link
                href="/contact"
                className="bg-[#e5792c] text-white px-6 py-2 rounded-full font-medium text-center transition-all duration-300 hover:bg-[#d06a25]"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavItem({ item }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      className={`text-lg font-medium transition-colors duration-200 ${isActive ? "text-[#e5792c]" : "text-gray-800 hover:text-[#e5792c]"
        }`}
    >
      {item.name}
    </Link>
  );
}
