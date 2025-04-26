import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedButton from '@/components/animated-button'
import naqshProcess from '/public/naqsh-branding-process.png'

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-[#171717] text-white py-16 md:py-24 mt-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">Comprehensive branding and web solutions to elevate your business</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Solutions for Your Business</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Naqsh Agency, we offer a comprehensive range of branding and web solutions designed to help your
                business stand out and succeed in today's competitive market.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team of experts combines strategic thinking with creative excellence to deliver results that drive
                growth and achieve your business goals.
              </p>
              <AnimatedButton
                href='/contact'
                varient='primary'
                className='group'
              >
                Get Started 
              </AnimatedButton>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#ededed] p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#e5792c] rounded-full flex items-center justify-center text-white mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Branding</h3>
                <p className="text-gray-600">
                  Strategic brand development to create a distinctive identity that resonates with your target audience.
                </p>
              </div>

              <div className="bg-[#ededed] p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#e5792c] rounded-full flex items-center justify-center text-white mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Web Design</h3>
                <p className="text-gray-600">
                  User-focused, conversion-optimized websites that engage visitors and drive business growth.
                </p>
              </div>

              <div className="bg-[#ededed] p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#e5792c] rounded-full flex items-center justify-center text-white mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Development</h3>
                <p className="text-gray-600">
                  Custom web development with cutting-edge technologies for optimal performance and scalability.
                </p>
              </div>

              <div className="bg-[#ededed] p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#e5792c] rounded-full flex items-center justify-center text-white mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2">SEO Services</h3>
                <p className="text-gray-600">
                  Data-driven optimization strategies to improve search rankings, visibility, and organic traffic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branding Feature */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[605px]">
              <Image
                src={naqshProcess}
                alt="Branding Services"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="inline-block bg-[#ededed] px-4 py-1 rounded-full text-sm font-medium mb-4">
                Branding Strategy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Create a Powerful Brand Identity</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our strategic branding process helps you develop a distinctive identity that resonates with your target
                audience and sets you apart from competitors.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#e5792c] rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Brand Strategy</h3>
                    <p className="text-gray-600">
                      Comprehensive research and strategic positioning to define your brand's unique value.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#e5792c] rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Visual Identity</h3>
                    <p className="text-gray-600">
                      Logo design, color palette, typography, and visual elements that reflect your brand essence.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-[#e5792c] rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Brand Guidelines</h3>
                    <p className="text-gray-600">
                      Comprehensive documentation to ensure consistent application of your brand across all touchpoints.
                    </p>
                  </div>
                </li>
              </ul>

              <AnimatedButton
              href='/services/branding'
              variant='primary'
              className='group'
              >
                Learn More
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
