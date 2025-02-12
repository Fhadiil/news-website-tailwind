import React, { useEffect, useState } from "react";
import API from "../services/api";
import ArticleCard, { FeaturedArticleCard } from "../components/ArticleCard";
import { NativeAd } from "../components/ArticleCard";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await API.get("articles/");
        setArticles(response.data);
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
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center my-4">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Advertisement Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
        <div className="bg-gray-100 p-8 text-center rounded-lg">
          <p className="text-gray-600 font-bold">ADVERTISEMENT</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured Article */}
          <div className="lg:w-2/3">
            {articles.length > 0 && (
              <FeaturedArticleCard article={articles[0]} />
            )}
          </div>

          {/* Headlines */}
          <div className="lg:w-1/3">
            <h3 className="font-bold text-xl mb-6">HEADLINES</h3>
            <div className="space-y-4">
              {articles.slice(1, 5).map((article) => (
                <div key={article.id} className="border-b border-gray-200 pb-4">
                  <h5 className="font-bold text-lg mb-2">{article.title}</h5>
                  <p className="text-gray-600 text-sm">
                    {article.category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Article List */}
        <div className="mt-12">
          <h2 className="font-bold text-2xl mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <NativeAd />
    </div>
  );
};

export default HomePage;
