"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnimatedButton from "@/components/animated-button";
import { useEffect, useState } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function PortfolioPage() {
  const [Loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projects, setProjects] = useState([]);

  const categories = ["All", "Branding", "SEO Services", "Web Design"];
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const entries = await client.getEntries({
          content_type: "portfolio",
        });
        const fetchedPortfolios = entries.items.map((entry) => ({
          id: entry.sys.id,
          name: entry.fields.title,
          image:
            entry.fields.images && entry.fields.images.length > 0
              ? `https:${entry.fields.images[0].fields.file.url}`
              : "/placeholder.svg?height=400&width=600",
          category: entry.fields.categoryOfPortfolio,
          coverDescription: entry.fields.coverDescription,
          priceRange: `$${entry.fields.startingPrice} - $${entry.fields.endingPrice}`,
          description:
            entry.fields.description?.content?.[0]?.content?.[0]?.value ||
            "No description available",
          clientName: entry.fields.client?.fields?.clientName || "Client",
          clientLogo:
            entry.fields.client?.fields?.clientImage?.fields?.file?.url,
          clientBio: entry.fields.client?.fields.clientDescription,
          rating: entry.fields.reviews || 5,
          duration: entry.fields.duration,
        }));

        setProjects(fetchedPortfolios);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 mt-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Work</h1>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full ${selectedCategory === category
                  ? "bg-[#e5792c] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-[#e5792c]">
                      {project.category}
                    </span>
                    <span className="text-sm font-medium">
                      {project.priceRange}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {project.coverDescription}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Image
                        src={project.clientLogo || "/placeholder.svg"}
                        alt={project.clientName}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        {project.clientName}
                      </span>
                    </div>
                    <div className="flex">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <AnimatedButton
                      href={`/portfolio/${project.id}`}
                      variant="primary"
                      size="sm"
                    >
                      View Details
                    </AnimatedButton>
                    <AnimatedButton
                      href="https://calendly.com/naqshagencyofficial/brand_consultation"
                      variant="outline"
                      size="sm"
                      external={true}
                    >
                      Start Similar Project
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#171717] text-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-lg mb-8">
              Let's collaborate to create a powerful brand and digital presence
              that drives measurable results for your business.
            </p>
            <AnimatedButton
              href="https://calendly.com/naqshagencyofficial/brand_consultation"
              external={true}
              variant="primary"
              className="group"
            >
              Schedule Your Free Consultation
            </AnimatedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
