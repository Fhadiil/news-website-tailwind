import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    image: null,
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://newswebsite-backend-d4ve.onrender.com/api";

  // ... [Keep all existing fetch functions and handlers unchanged] ...

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/`);
      const categoryMap = response.data.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/`);
      const userMap = response.data.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
      setUsers(userMap);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchArticles(), fetchCategories(), fetchUsers()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFormData({ ...formData, image: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.content ||
      !formData.category ||
      !formData.author
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    try {
      if (selectedArticle) {
        await axios.put(
          `${API_BASE_URL}/articles/${selectedArticle.id}/`,
          formPayload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/articles/`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert(`Article ${selectedArticle ? "updated" : "created"} successfully!`);
      setFormData({
        title: "",
        content: "",
        category: "",
        author: "",
        image: null,
      });
      setSelectedArticle(null);
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article. Please check the input fields.");
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      author: article.author,
      image: article.image,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`${API_BASE_URL}/articles/${id}/`);
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Create/Edit Article Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">
            {selectedArticle ? "Edit Article" : "Create Article"}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="5"
                required
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {Object.entries(categories).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium mb-2">Author</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Author</option>
                {Object.entries(users).map(([id, username]) => (
                  <option key={id} value={id}>
                    {username}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                type="file"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="image"
                onChange={handleFileChange}
              />
              {selectedArticle && selectedArticle.image && (
                <div className="mt-2">
                  <img
                    src={selectedArticle.image}
                    alt="article-preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {selectedArticle ? "Update" : "Create"}
            </button>

            {/* Cancel Button */}
            {selectedArticle && (
              <button
                type="button"
                className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                onClick={() => setSelectedArticle(null)}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Articles</h2>
          {loading ? (
            <p className="text-gray-500">Loading articles...</p>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex-1">
                    <h5 className="font-semibold">{article.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">
                      {article.content.slice(0, 50)}...
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      <span className="font-medium">Author:</span>{" "}
                      {users[article.author] || "Unknown"} <br />
                      <span className="font-medium">Category:</span>{" "}
                      {categories[article.category] || "Uncategorized"}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      className="flex-1 md:flex-none px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                      onClick={() => handleEdit(article)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 md:flex-none px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
