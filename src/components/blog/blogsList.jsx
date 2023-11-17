import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../navbar/navbar";

const BlogsList = () => {
  const [blogTitles, setBlogTitles] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://sljom89u8d.execute-api.us-east-1.amazonaws.com/dev/getBlogs');
        // Assuming the response structure is {"titles":["test"]}
        setBlogTitles(response.data.titles);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (title) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        Authorization: authToken,
      };
  
      // Assuming the server handles blog deletion with a POST request and expects blogTitle in the body
      await axios.post('https://sljom89u8d.execute-api.us-east-1.amazonaws.com/dev/delete', { blogTitle: title }, { headers });
  
      // Update the state to reflect the deletion
      setBlogTitles(prevTitles => prevTitles.filter(blogTitle => blogTitle !== title));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <Navbar/>
    <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '600px', padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#1e1e1e', color: 'white' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px', textAlign: 'center' }}>Blogs List</h1>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {blogTitles.map(blogTitle => (
          <li key={blogTitle} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
            <span>{blogTitle}</span>
            <button
              onClick={() => handleDelete(blogTitle)}
              style={{ backgroundColor: '#e74c3c', color: 'white', padding: '8px 12px', fontSize: '14px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div></div>
  );
};

export default BlogsList;
