"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

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
          description: entry.fields.descriptionForHomePage,
          author: entry.fields.author?.fields?.authorName || "Unknown",
          authorImage:
            entry.fields.author?.fields?.authorImage?.fields?.file?.url || null,
          authorBio:
            entry.fields.author?.fields?.authorBio ||
            "Content Writer & Brand Strategist",
          category: entry.fields.categoryOfBlog,
          readTime: entry.fields.readTime,
          createdAt: new Date(entry.sys.createdAt),
        }));

        setBlogs(fetchedData);
      } catch (err) {
        console.log("Error fetching blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const featuredPost = blogs.length > 0 ? blogs[0] : null;

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Articles" ||
      (blog.category && blog.category.toString() === selectedCategory) ||
      (blog.category &&
        blog.category.toString().toLowerCase() ===
          selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-[#171717] text-white py-16 md:py-24 mt-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-gray-300">
              Insights, tips, and trends in branding and web design
            </p>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={
                      featuredPost.image.length > 0
                        ? featuredPost.image[0]
                        : "/placeholder.svg?height=500&width=800"
                    }
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <div className="text-sm text-[#e5792c] mb-2">
                    {featuredPost.category} •{" "}
                    {formatDate(featuredPost.createdAt)}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.description.substring(0, 800)}...
                  </p>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="btn-primary inline-block"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-8 bg-[#ededed]">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className={`px-6 py-2 rounded-full ${
                selectedCategory === "All Articles"
                  ? "bg-[#e5792c] text-white"
                  : "hover:bg-white"
              }`}
              onClick={() => setSelectedCategory("All Articles")}
            >
              All Articles
            </button>
            {Array.from(
              new Set(
                blogs
                  .filter((blog) => blog.category)
                  .map((blog) => blog.category)
              )
            ).map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-[#e5792c] text-white"
                    : "hover:bg-white"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl">Loading blog posts...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl">
                No blog posts found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link
                  href={`/blog/${blog.slug}`}
                  key={blog.id}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={
                          blog.image.length > 0
                            ? blog.image[0]
                            : `/placeholder.svg?height=300&width=400`
                        }
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-sm text-[#e5792c] mb-2">
                        {blog.category} • {formatDate(blog.createdAt)}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#e5792c] transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1">
                        {blog.description.substring(0, 70)}
                        ...
                      </p>
                      <div className="flex items-center mt-auto">
                        <div className="w-8 h-8 relative rounded-full overflow-hidden mr-2">
                          {blog.authorImage ? (
                            <Image
                              src={blog.authorImage || "/placeholder.svg"}
                              alt={`${blog.author} profile picture`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm text-gray-600 mr-4">
                          {blog.author}
                        </span>
                        <span className="text-sm text-gray-600">
                          {blog.readTime} min read
                        </span>
                      </div>
                      <div className="text-[#e5792c] font-medium group-hover:underline mt-4">
                        Read More
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredBlogs.length > 9 && (
            <div className="mt-12 flex justify-center">
              <button className="btn-primary">Load More Articles</button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#171717] text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Stay updated with the latest insights, tips, and trends in
              branding and web design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#e5792c]"
              />
              <button className="bg-[#e5792c] text-white rounded-full px-6 py-3 font-medium transition-all hover:bg-[#d06a25]">
                Subscribe
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
