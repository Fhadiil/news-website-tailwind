import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { FaClock, FaUser } from "react-icons/fa";
import { SidebarAd } from "./ArticleCard";

// Ad space component for article content
const ContentAd = () => (
  <div className="my-8 w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
    <span className="text-gray-400 text-sm">Advertisement</span>
  </div>
);

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await API.get(`articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-center font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const { title, content, image, created_at, category, author } = article;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="lg:w-3/4">
          {/* Top Banner Ad */}
          <ContentAd />

          {/* Article Header */}
          <header className="mb-8">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
              {category ? category.name : "Uncategorized"}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <div className="flex flex-wrap items-center text-gray-500 space-x-4">
              <div className="flex items-center">
                <FaUser className="w-4 h-4 mr-2" />
                <span>{author ? author.username : "Anonymous"}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="w-4 h-4 mr-2" />
                <span>{new Date(created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] mb-8">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* First paragraph */}
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              {content.split("\n")[0]}
            </p>

            {/* Mid-content Ad */}
            <ContentAd />

            {/* Rest of the content */}
            <div className="text-gray-700 leading-relaxed space-y-6">
              {content
                .split("\n")
                .slice(1)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Bottom Ad */}
            <ContentAd />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-6">
          <div className="sticky top-4">
            {/* First Sidebar Ad */}
            <SidebarAd />

            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related Articles
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        Related Article Title {i}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">5 min read</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Sidebar Ad */}
            <SidebarAd />

            {/* Newsletter Signup */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest news delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 mb-2"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleDetail;
