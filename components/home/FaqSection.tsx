import React, { useState, useRef, useEffect } from 'react';
import ScrollReveal from "@/components/scroll-reveal";
import SectionHeading from "@/components/section-heading";
import AnimatedButton from "@/components/animated-button";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What’s included in a full branding package?",
    answer: "Our full branding package covers everything you need to stand out: Logo Design, Brand Strategy, Color Palette, Typography, Visual Identity, Brand Guidelines, Complete Website Development and Hosting, Mobile Application Design and Development and more. We also offer add-ons like social media templates, and packaging if needed."
  },
  {
    question: "Do you offer branding and app/website packages together?",
    answer: "Absolutely. In fact, most of our clients prefer our 'All-in-One' Brand + Website/App packages to keep everything aligned and professionally executed under one roof. You save time, money, and avoid the mess of juggling multiple freelancers or agencies."
  },
  {
    question: "Can I hire you just for a website or mobile app?",
    answer: "Yes! While we specialize in full branding experiences, you can also hire us for just your website or mobile app. We’ll still make sure the design aligns with your brand and performs with speed, beauty, and conversion in mind."
  },
  {
    question: "Do you work with startups or only established businesses?",
    answer: "Both! Whether you’re launching a new idea or leveling up an existing brand, we tailor our approach to fit your stage. Startups love our clarity-first strategy, and growing brands value our ability to refresh without losing their core identity."
  },
  {
    question: "Will my website/app be optimized for speed and SEO?",
    answer: "Yes, every site and app we build is optimized for performance, SEO, and mobile responsiveness. We follow best practices to help you rank, load fast, and deliver a smooth user experience across all devices."
  },
  {
    question: "What platforms or tech do you use?",
    answer: "We build websites using HTML, CSS, JavaScript, Next.js, React, Webflow, GHL, and other modern frameworks. For mobile apps, we work with Flutter, React Native, and native iOS/Android based on your needs. You’ll get fast, scalable, and future-proof solutions."
  },
  {
    question: "Will I own the files and rights to my brand?",
    answer: "Yes, 100%. Once your project is complete and paid in full, all design files, assets, and rights are yours. You’ll receive editable source files and a brand kit you can use anywhere, anytime."
  },
  {
    question: "I’m not sure if I’m ready yet. Can I still talk to you?",
    answer: "Absolutely. Our free discovery call is a chance to explore your vision, ask questions, and get clarity even if you don’t hire us right away. We believe in value first, so you’ll walk away with insights whether you’re ready now or later."
  }
];

const FaqSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        if (activeIndex === index) {
          ref.style.maxHeight = `${ref.scrollHeight}px`;
          ref.style.opacity = '1';
          ref.style.paddingBottom = '1.5rem';
        } else {
          ref.style.maxHeight = '0';
          ref.style.opacity = '0';
          ref.style.paddingBottom = '0';
        }
      }
    });
  }, [activeIndex]);


  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <ScrollReveal>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our premium branding and web solutions"
          />
        </ScrollReveal>

        <div className="mt-12 max-w-4xl mx-auto">
          <ScrollReveal animation="slide-up" delay={100}>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button 
                    className="flex items-center justify-between w-full p-6 text-left cursor-pointer focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={activeIndex === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {faq.question}
                    </h3>
                    <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${activeIndex === index ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${activeIndex === index ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-content-${index}`}
                    ref={el => contentRefs.current[index] = el}
                    className="px-6 text-gray-600 overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: '0',
                      opacity: '0',
                      paddingBottom: '0'
                    }}
                    aria-hidden={activeIndex !== index}
                  >
                    <p className='pb-6'>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-12 text-center">
            <ScrollReveal animation="fade" delay={200}>
              <AnimatedButton
                href="https://calendly.com/naqshagencyofficial/brand_consultation"
                variant="primary"
                className="group"
                external={true}
              >
                Schedule a Free Consultation
              </AnimatedButton>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;