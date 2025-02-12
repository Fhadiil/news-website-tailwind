import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaUser } from "react-icons/fa";
import API from "../services/api";

// Ad placeholder component
const AdSpace = ({ type }) => {
  const adStyles = {
    banner:
      "w-full h-24 md:h-32 mb-6 bg-gray-100 flex items-center justify-center",
    sidebar: "w-full h-64 mb-6 bg-gray-100 flex items-center justify-center",
    native: "w-full h-20 my-4 bg-gray-100 flex items-center justify-center",
  };

  return (
    <div className={adStyles[type]}>
      <span className="text-gray-400 text-sm">
        Advertisement Space ({type})
      </span>
    </div>
  );
};

const ArticleCard = ({ article, showAd }) => {
  const [categories, setCategories] = useState({});
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get("categories/");
      const categoryMap = {};
      response.data.forEach((ctg) => {
        categoryMap[ctg.id] = ctg.name;
      });
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await API.get("users/");
      const authorMap = {};
      response.data.forEach((auth) => {
        authorMap[auth.id] = auth.username;
      });
      setAuthors(authorMap);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const { title, content, image, created_at, id, category, author } = article;

  return (
    <>
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
            {category && categories[category]
              ? categories[category]
              : "No category assigned"}
          </span>

          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>

          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <div className="flex items-center">
              <FaUser className="w-4 h-4 mr-2" />
              <span>
                {author && authors[author] ? authors[author] : "Anonymous"}
              </span>
            </div>
            <div className="flex items-center">
              <FaClock className="w-4 h-4 mr-2" />
              <span>{new Date(created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-3">{content}</p>

          <Link
            to={`/article/${id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
      {showAd && <AdSpace type="native" />}
    </>
  );
};

const FeaturedArticleCard = ({ article, showTopAd }) => {
  const [categories, setCategories] = useState({});
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get("categories/");
      const categoryMap = {};
      response.data.forEach((ctg) => {
        categoryMap[ctg.id] = ctg.name;
      });
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await API.get("users/");
      const authorMap = {};
      response.data.forEach((auth) => {
        authorMap[auth.id] = auth.username;
      });
      setAuthors(authorMap);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const { title, content, image, created_at, id, category, author } = article;

  return (
    <div className="space-y-6">
      {showTopAd && <AdSpace type="banner" />}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          <div className="md:w-1/2 p-6 md:p-8">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full mb-4">
              {category && categories[category]
                ? categories[category]
                : "Uncategorized"}
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-3">
              {title}
            </h2>

            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
              <div className="flex items-center">
                <FaUser className="w-4 h-4 mr-2" />
                <span>
                  {author && authors[author] ? authors[author] : "Anonymous"}
                </span>
              </div>
              <div className="flex items-center">
                <FaClock className="w-4 h-4 mr-2" />
                <span>{new Date(created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-3">{content}</p>

            <Link
              to={`/article/${id}`}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Read Full Article
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional SidebarAd component for use in the main layout
const SidebarAd = () => <AdSpace type="sidebar" />;
const NativeAd = () => <AdSpace type="native" />;

export { FeaturedArticleCard, SidebarAd, NativeAd };
export default ArticleCard;
