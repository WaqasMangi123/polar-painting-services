import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adminblog.css';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    subheadings: [{ heading: '', text: '' }],
  });
  const [editMode, setEditMode] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/blogroutes/blogs', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'heading' || name === 'text') {
      const updatedSubheadings = [...formData.subheadings];
      updatedSubheadings[index][name] = value;
      setFormData({ ...formData, subheadings: updatedSubheadings });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubheadingChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubheadings = [...formData.subheadings];
    updatedSubheadings[index][name] = value;
    setFormData({ ...formData, subheadings: updatedSubheadings });
  };

  const handleAddSubheading = () => {
    setFormData({ ...formData, subheadings: [...formData.subheadings, { heading: '', text: '' }] });
  };

  const handleRemoveSubheading = (index) => {
    const updatedSubheadings = formData.subheadings.filter((_, i) => i !== index);
    setFormData({ ...formData, subheadings: updatedSubheadings });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminToken = localStorage.getItem('adminToken');

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('content', formData.content);
    formDataObj.append('author', formData.author);
    formDataObj.append('subheadings', JSON.stringify(formData.subheadings));
    formDataObj.append('views', 0); // Initialize views to 0
    formDataObj.append('likes', 0); // Initialize likes to 0

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/blogroutes/blogs/${editingBlogId}`, formDataObj, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/blogroutes/blogs', formDataObj, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
      }
      alert('Blog submitted successfully');
      setFormData({
        title: '',
        content: '',
        author: '',
        subheadings: [{ heading: '', text: '' }],
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error submitting blog:', error.response?.data || error.message);
      alert('Error submitting blog');
    }
  };

  const handleEdit = (blogId) => {
    const blog = blogs.find((b) => b._id === blogId);
    setEditingBlogId(blogId);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      subheadings: blog.subheadings,
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    const adminToken = localStorage.getItem('adminToken');
    try {
      await axios.delete(`http://localhost:5000/api/blogroutes/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      alert('Blog deleted successfully');
      fetchBlogs(); // Refresh the blog list after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleLike = async (id) => {
    const adminToken = localStorage.getItem('adminToken');
    try {
      await axios.put(`http://localhost:5000/api/blogroutes/blogs/${id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      fetchBlogs(); // Refresh the blog list after liking
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleView = async (id) => {
    const adminToken = localStorage.getItem('adminToken');
    try {
      await axios.put(`http://localhost:5000/api/blogroutes/blogs/${id}/view`, {}, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      fetchBlogs(); // Refresh the blog list after viewing
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  return (
    <div className="admin-blog-container">
      <h2>{editMode ? 'Edit Blog' : 'Create New Blog'}</h2>
      <form onSubmit={handleSubmit} className="admin-blog-form">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="admin-blog-input"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Content"
          className="admin-blog-textarea"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Author"
          className="admin-blog-input"
        />
        <div className="admin-blog-subheadings">
          {formData.subheadings.map((subheading, index) => (
            <div key={index} className="admin-blog-subheading">
              <input
                type="text"
                name="heading"
                value={subheading.heading}
                onChange={(e) => handleSubheadingChange(e, index)}
                placeholder="Subheading"
                className="admin-blog-input"
              />
              <textarea
                name="text"
                value={subheading.text}
                onChange={(e) => handleSubheadingChange(e, index)}
                placeholder="Subheading text"
                className="admin-blog-textarea"
              />
              <button type="button" onClick={() => handleRemoveSubheading(index)} className="admin-blog-remove-btn">
                Remove Subheading
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddSubheading} className="admin-blog-add-btn">
            Add Subheading
          </button>
        </div>
        <button type="submit" className="admin-blog-submit-btn">
          {editMode ? 'Update Blog' : 'Submit Blog'}
        </button>
      </form>

      <h2>All Blogs</h2>
      <div className="admin-blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="admin-blog-item">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Views: {blog.views}</p>
            <p>Likes: {blog.likes}</p>
            <button onClick={() => handleEdit(blog._id)} className="admin-blog-edit-btn">Edit</button>
            <button onClick={() => handleDelete(blog._id)} className="admin-blog-delete-btn">Delete</button>
            <button onClick={() => handleLike(blog._id)} className="admin-blog-like-btn">Like</button>
            <button onClick={() => handleView(blog._id)} className="admin-blog-view-btn">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
