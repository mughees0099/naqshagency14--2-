"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnimatedButton from "@/components/animated-button";
import PaymentModal from "@/components/payment-modal";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({
    name: "",
    price: "",
  });
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    async function extractParams() {
      try {
        const resolvedParams = await params;
        setProjectId(resolvedParams.id);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    }

    extractParams();
  }, [params]);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const entry = await client.getEntry(projectId);

        if (entry && entry.fields) {
          const projectData = {
            id: entry.sys.id,
            title: entry.fields.title,
            category: entry.fields.categoryOfPortfolio,
            price: `$${entry.fields.startingPrice} - $${entry.fields.endingPrice}`,
            images:
              entry.fields.images?.map(
                (image: any) => `https:${image.fields.file.url}`
              ) || [],
            overview: entry.fields.coverDescription || "No overview available",
            description: entry.fields.description,

            clientName: entry.fields.client?.fields?.clientName || "Client",
            clientLogo: entry.fields.client?.fields?.clientImage?.fields?.file
              ?.url
              ? `https:${entry.fields.client.fields.clientImage.fields.file.url}`
              : "/placeholder.svg?height=64&width=64",
            duration: entry.fields.duration || "Not specified",
            rating: entry.fields.reviews || 5,
            testimonial: {
              text: entry.fields.testimonial,
              author: entry.fields.client?.fields?.clientName || "Client",
              position: entry.fields.client?.fields?.clientBio || "Company",
              avatar: entry.fields.client?.fields?.clientImage?.fields?.file
                ?.url
                ? `https:${entry.fields.client.fields.clientImage.fields.file.url}`
                : "/placeholder.svg?height=48&width=48",
            },
          };

          setProject(projectData);
          if (projectData.images && projectData.images.length > 0) {
            setMainImage(projectData.images[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleStartSimilarProject = () => {
    if (project) {
      setSelectedPackage({
        name: `Similar to: ${project.title}`,
        price: project.price,
      });
      setShowPaymentModal(true);
    }
  };

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-16 flex justify-center items-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-[400px] bg-gray-200 rounded"></div>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 w-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="mt-4">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <AnimatedButton href="/portfolio" variant="primary" className="mt-8">
            Back to Portfolio
          </AnimatedButton>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}

      <section className="py-16 mt-16">
        <div className="container mx-auto">
          <div className="mb-8">
            <span className="text-sm text-[#e5792c] mb-2">
              {project.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex items-center">
              {[...Array(project.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
              <span className="ml-2 text-gray-600">(Client Rating)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
                <Image
                  src={mainImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {project.images && project.images.length > 0 && (
                <div className="flex overflow-x-auto space-x-4 mb-8">
                  {project.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`relative min-w-[150px] w-[150px] h-[112px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer ${
                        mainImage === image ? "ring-2 ring-[#e5792c]" : ""
                      }`}
                      onClick={() => handleImageClick(image)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                {project.description && (
                  <>
                    <h2 className="text-4xl font-bold mb-4 mt-8">
                      Project Details
                    </h2>
                    <div className="prose max-w-none text-gray-600">
                      {documentToReactComponents(project.description)}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-8">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="text-2xl font-bold text-[#e5792c]">
                      {project.price}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-sm text-gray-500 mr-2">Client:</div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full overflow-hidden mr-2 shadow-sm">
                        <Image
                          src={project.clientLogo || "/placeholder.svg"}
                          alt={project.clientName}
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="font-medium">{project.clientName}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-medium">{project.category}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">{project.duration}</div>
                  </div>
                </div>

                {project.testimonial && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="text-[#e5792c] text-2xl font-serif mb-2">
                      "
                    </div>
                    <p className="text-gray-600 mb-4 text-sm italic">
                      {project.testimonial.text}
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                        <Image
                          src={project.testimonial.avatar || "/placeholder.svg"}
                          alt={project.testimonial.author}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">
                          {project.testimonial.author}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {project.testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <AnimatedButton
                  href="https://calendly.com/naqshagencyofficial/brand_consultation"
                  variant="primary"
                  className="w-full group"
                  external={true}
                >
                  Start a Similar Project
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your business goals with
            our premium branding and web solutions.
          </p>
          <AnimatedButton
            href="https://calendly.com/naqshagencyofficial/brand_consultation"
            variant="primary"
            className="group"
            external={true}
          >
            Start a Similar Project
      </AnimatedButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
