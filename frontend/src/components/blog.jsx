import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './blog.css';
import Navbar from './navbar';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://polar-painting-services.onrender.com/api/blogroutes/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  // Handle liking a blog
  const handleLike = async (blogId) => {
    try {
      const response = await axios.put(`https://polar-painting-services.onrender.com/api/blogroutes/blogs/${blogId}/like`);
      const updatedBlog = response.data;
      // Update the local state with the new likes count
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, likes: updatedBlog.likes } : blog
        )
      );
    } catch (error) {
      console.error('Error liking the blog:', error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Background section with dark color gradient and centered heading */}
      <section className="blog-hero-section">
        <div className="blog-hero-overlay">
          <h1 className="blog-hero-heading">Our Latest Blogs</h1>
        </div>
      </section>

      {/* Blog content */}
      <div className="blog-page-container">
        <h1 className="blog-page-title">Our Latest Blogs</h1>
        <div className="blog-list-container">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card-container">
                <div className="blog-card-header">
                  <h2 className="blog-card-title">{blog.title}</h2>
                  <div className="blog-meta-info">
                    <p className="blog-author-name">By {blog.author}</p>
                    <p className="blog-publish-date">
                      Published on {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="blog-card-content">
                  <p className="blog-card-description">
                    {blog.content.substring(0, 150)}...
                  </p>

                  {/* Show thumbnail images if available */}
                  {blog.images && blog.images.length > 0 && (
                    <div className="blog-thumbnail-container">
                      <img
                        src={blog.images[0]}
                        alt="Blog thumbnail"
                        className="blog-thumbnail-image"
                      />
                    </div>
                  )}

                  {/* Like Button and Likes Count */}
                  <div className="blog-like-section">
                    <button
                      className="blog-like-button"
                      onClick={() => handleLike(blog._id)}
                    >
                      Like
                    </button>
                    <span className="blog-likes-count">{blog.likes} Likes</span>
                  </div>

                  {/* Read More Button */}
                  <button
                    className="blog-read-more-button"
                    onClick={() => handleReadMore(blog)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available at the moment.</p>
          )}
        </div>
      </div>

      {/* Modal for displaying selected blog */}
      {selectedBlog && (
        <div className="blog-modal">
          <div className="blog-modal-content">
            <button className="blog-modal-close" onClick={closeModal}>
              ×
            </button>
            <h2 className="blog-modal-title">{selectedBlog.title}</h2>
            <p className="blog-modal-author">By {selectedBlog.author}</p>
            <p className="blog-modal-date">
              Published on {new Date(selectedBlog.createdAt).toLocaleDateString()}
            </p>
            <div className="blog-modal-body">
              <p>{selectedBlog.content}</p>
            </div>
            {selectedBlog.images && selectedBlog.images.length > 0 && (
              <div className="blog-modal-images">
                {selectedBlog.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Blog image ${index + 1}`}
                    className="blog-modal-image"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
