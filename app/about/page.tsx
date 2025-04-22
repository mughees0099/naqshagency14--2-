import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-[#171717] text-white py-16 md:py-24 mt-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Naqsh Agency
            </h1>
            <p className="text-xl text-gray-300">
              We're a team of passionate designers and developers creating
              premium branding and web solutions.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
              Naqsh (نقش) is an Urdu word that translates to "pattern," "design," or "impression." In the heart of Kashmir, where nature paints breathtaking landscapes, Naqsh.agency finds its inspiration. We see design as an art form, a way to capture the essence of a story and create a lasting impression.
              </p>
              <p className="text-lg text-gray-600 mb-6">
              The half-circle in our logo is a symbol of potential and growth, representing the beginning of a creative journey. It’s a reminder that every design starts with an idea, a spark that we nurture into something beautiful and meaningful.
              </p>
              <p className="text-lg text-gray-600">
              Naqsh.agency is more than just a design studio; we’re storytellers. We believe that every brand has a unique story to tell, and we’re here to help you tell it in a way that resonates with your audience. Our approach is simple yet impactful: we listen, we collaborate, and we create.
              </p>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Naqsh Agency Team"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              We're a diverse team of creative professionals passionate about
              design and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#ededed] rounded-lg overflow-hidden">
              <div className="h-80 relative">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-[#e5792c] mb-4">
                  Founder & Creative Director
                </p>
                <p className="text-gray-600">
                  With over 15 years of experience in branding and design, Sarah
                  leads our creative team with passion and vision.
                </p>
              </div>
            </div>

            <div className="bg-[#ededed] rounded-lg overflow-hidden">
              <div className="h-80 relative">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
                <p className="text-[#e5792c] mb-4">Technical Director</p>
                <p className="text-gray-600">
                  Michael brings technical expertise and innovation to our web
                  development projects, ensuring seamless functionality.
                </p>
              </div>
            </div>

            <div className="bg-[#ededed] rounded-lg overflow-hidden">
              <div className="h-80 relative">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Emma Rodriguez</h3>
                <p className="text-[#e5792c] mb-4">Brand Strategist</p>
                <p className="text-gray-600">
                  Emma develops strategic brand frameworks that help our clients
                  connect with their target audience effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#e5792c] mb-2">100+</div>
              <p className="text-lg font-medium">Projects Completed</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-[#e5792c] mb-2">50+</div>
              <p className="text-lg font-medium">Happy Clients</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-[#e5792c] mb-2">5+</div>
              <p className="text-lg font-medium">Years Experience</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-[#e5792c] mb-2">15</div>
              <p className="text-lg font-medium">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By</h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              We're proud to work with these amazing companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-[#171717] text-white p-8 md:p-12 rounded-lg">
            <div className="text-[#e5792c] text-6xl font-serif mb-4">"</div>
            <p className="text-xl md:text-2xl mb-8">
              Working with Naqsh Agency transformed our brand completely. Their
              strategic approach and creative solutions helped us stand out in a
              competitive market and achieve our business goals.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold">Sarah Johnson</h4>
                <p className="text-sm text-gray-400">CEO, TechStart</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#e5792c] text-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg mb-8">
              Let's collaborate to create a powerful brand and web presence that
              drives results for your business.
            </p>
            <Link
              href="/contact"
              className="bg-white text-[#171717] rounded-full px-8 py-4 font-medium text-lg transition-all hover:bg-gray-100 inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
