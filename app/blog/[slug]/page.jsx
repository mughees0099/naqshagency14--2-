"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Clock, User } from "lucide-react";
import { createClient } from "contentful";
import { useEffect, useState } from "react";
import { use } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import AnimatedButton from '@/components/animated-button'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function BlogPostPage({ params }) {
  const { slug } = use(params);

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBlog, setCurrentBlog] = useState(null);

  const formatTitle = (slug) => {
    const decodedSlug = decodeURIComponent(slug);

    return decodedSlug
      .split("-")
      .join(" ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const entries = await client.getEntries({ content_type: "blog" });

        const fetchedData = entries.items.map((entry) => ({
          id: entry.sys.id,
          title: entry.fields.title,
          slug: entry.fields.title.toLowerCase().replace(/\s+/g, "-"),
          image: entry.fields.image?.map((img) => img.fields.file.url) || [],
          description: entry.fields.description,
          author: entry.fields.author?.fields?.authorName || "Unknown",
          authorImage:
            entry.fields.author?.fields?.authorImage?.fields?.file?.url || null,
          authorBio:
            entry.fields.author?.fields?.authorBio ||
            "Content Writer & Brand Strategist",
          authorDescription: entry.fields.author?.fields?.authorDescription,
          readTime: entry.fields.readTime,
          createdAt: entry.sys.createdAt,
        }));

        setBlogs(fetchedData);

        const decodedUrlSlug = decodeURIComponent(slug);
        const matchingBlog = fetchedData.find((blog) => {
          const normalizedUrlSlug = decodedUrlSlug.toLowerCase();
          const normalizedBlogSlug = blog.slug.toLowerCase();

          return normalizedUrlSlug === normalizedBlogSlug;
        });

        if (matchingBlog) {
          setCurrentBlog(matchingBlog);
        } else {
          setCurrentBlog(fetchedData[0]);
        }
      } catch (err) {
        console.log("Error fetching blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return isLoading ? (
    <div className="text-center py-12">
      <p className="text-xl">Loading blog posts...</p>
    </div>
  ) : !currentBlog ? (
    <div className="text-center py-12">
      <p className="text-xl">No blog posts found matching your search.</p>
    </div>
  ) : (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#171717] text-white py-16 mt-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-sm text-[#e5792c] mb-2">Branding</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {currentBlog ? currentBlog.title : formatTitle(slug)}
            </h1>

            <div className="flex items-center justify-center space-x-6 text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{currentBlog && currentBlog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{currentBlog && formatDate(currentBlog.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  {currentBlog
                    ? `${currentBlog.readTime} min read`
                    : "5 min read"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[300px] md:h-[500px]">
              <Image
                src={
                  currentBlog &&
                  currentBlog.image &&
                  currentBlog.image.length > 0
                    ? currentBlog.image[0]
                    : "/placeholder.svg?height=500&width=1000"
                }
                alt={
                  currentBlog ? currentBlog.title : "Blog Post Featured Image"
                }
                fill
                priority
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {currentBlog && (
                <div>{documentToReactComponents(currentBlog.description)}</div>
              )}

              {isLoading && (
                <div className="text-center py-8">
                  <p>Loading blog content...</p>
                </div>
              )}

              {!isLoading && !currentBlog && (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Blog Post Not Found
                  </h2>
                  <p>
                    Sorry, we couldn't find the blog post you're looking for.
                  </p>
                  <Link
                    href="/blog"
                    className="text-[#e5792c] hover:underline mt-4 inline-block"
                  >
                    Return to Blog
                  </Link>
                </div>
              )}
            </article>

            {currentBlog && (
              <div className="mt-12 bg-[#ededed] p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="w-24 h-16 relative rounded-full overflow-hidden mr-4">
                    {currentBlog.authorImage ? (
                      <Image
                        src={currentBlog.authorImage || "/placeholder.svg"}
                        alt={`${currentBlog.author} profile picture`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{currentBlog.author}</h3>
                    <p className="text-gray-600">{currentBlog.authorBio}</p>
                    <p className="mt-2">{currentBlog.authorDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's work together to create a powerful brand and web presence
              that drives results for your business.
            </p>
            <AnimatedButton 
              href="/contact" 
              className="group"
              varient='primary'
            >
              Get in Touch
            </AnimatedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
