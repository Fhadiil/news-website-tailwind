import React, { useEffect, useState } from "react";
import API from "../services/api";
import ArticleCard from "../components/ArticleCard";
import { FeaturedArticleCard, SidebarAd } from "../components/ArticleCard";

const Politics = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await API.get("articles/politics");
        setArticles(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mx-auto max-w-2xl my-4">
        <p className="text-center font-medium">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center my-12">
        <h3 className="text-xl font-semibold text-gray-600">
          No articles available
        </h3>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Latest News</h1>
      </div>

      {/* Main Content and Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-3/4 space-y-8">
          {/* Featured Article with Top Banner Ad */}
          <FeaturedArticleCard article={articles[0]} showTopAd={true} />

          {/* Regular Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(1).map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                showAd={(index + 1) % 4 === 0} // Show ad after every 4 articles
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Sticky Sidebar */}
          <div className="sticky top-4">
            {/* First Sidebar Ad */}
            <SidebarAd />

            {/* Popular Categories Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Categories
              </h3>
              <div className="space-y-2">
                {["Politics", "Technology", "Sports", "Entertainment"].map(
                  (category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150"
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Second Sidebar Ad */}
            <SidebarAd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politics;
