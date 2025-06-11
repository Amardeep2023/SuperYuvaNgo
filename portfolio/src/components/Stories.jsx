import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://superyuvango.onrender.com/api'
  : 'http://localhost:5000/api';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStories();
        checkAdminStatus();
      } catch (err) {
        setError('Failed to load stories');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stories`);
      setStories(response.data);
    } catch (error) {
      throw error;
    }
  };

  const checkAdminStatus = () => {
    const token = localStorage.getItem('token') || Cookies.get('token');
    setIsAdmin(!!token);
  };

  const handleDelete = async (storyId) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    
    try {
      const token = localStorage.getItem('token') || Cookies.get('token');
      await axios.delete(`http://localhost:5000/api/stories/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStories(stories.filter(story => story._id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Failed to delete story. Please try again.');
    }
  };

  // Animation variants
  const container = (delay) => ({
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  });

  if (loading) {
    return <div className="text-center py-10">Loading stories...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (stories.length === 0) {
    return <div className="text-center py-10">No stories available</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {stories.map((story, index) => {
        // First story: image on right, text on left
        // Then alternate for remaining stories
        const imageOnRight = index === 0 ? true : index % 2 === 0;
  
        return (
          <div 
            key={story._id} 
            className={`flex gap-8 mb-16 items-center 
              ${imageOnRight ? 'flex-row-reverse' : 'flex-row'}
              ph:flex-col ph:items-center`}
          >
            {/* Image Container - Always first on mobile */}
            <motion.div
              variants={container(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="shrink-0 ph:order-1" // Force order-1 on mobile
            >
              <img
                className="w-96 h-96 ph:w-full ph:h-auto rounded-lg object-cover shadow-lg"
                src={`http://localhost:5000/uploads/${story.coverImage}`}
                alt={story.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              {isAdmin && (
                <button
                  onClick={() => handleDelete(story._id)}
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Delete Story
                </button>
              )}
            </motion.div>
  
            {/* Text Container - Always second on mobile */}
            <motion.div
              initial={{ opacity: 0, x: imageOnRight ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="flex-1 ph:order-2" // Force order-2 on mobile
            >
              <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
              <div className="text-lg leading-relaxed">
                {story.description.split('\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.3,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;