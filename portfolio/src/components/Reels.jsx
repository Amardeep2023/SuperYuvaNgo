import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';

// Base API URL configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://superyuvango.onrender.com/api' 
  : 'http://localhost:5000/api';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/reels/`);
        setReels(response.data);
      } catch (error) {
        console.error('Error fetching reels:', error);
        setError('Failed to load reels');
      }
    };
  
    fetchReels();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const token = localStorage.getItem('token') || Cookies.get('token');
    setIsAdmin(!!token);
  };

  const handleDelete = async (reelId, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this reel?')) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token') || Cookies.get('token');
      console.log("Token being sent:", token);
      
      if (!token) {
        throw new Error('Authentication required - Please login again');
      }

      const response = await axios.delete(
        `${API_BASE_URL}/reels/${reelId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success || response.data.message === 'Reel deleted successfully') {
        setReels(prev => prev.filter(reel => reel._id !== reelId));
        alert('Reel deleted successfully!');
      } else {
        throw new Error(response.data.error || 'Failed to delete reel');
      }
    } catch (error) {
      console.error('Delete error:', error);
      let errorMessage = 'Failed to delete reel. Please try again.';
      
      if (error.message.includes('Authentication required')) {
        errorMessage = error.message;
      } else if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Session expired - Please login again';
        } else if (error.response.status === 404) {
          errorMessage = 'Reel not found';
        }
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReelClick = (reel, index) => {
    setSelectedReel({ ...reel, index });
    videoRefs.current.forEach((ref, i) => {
      if (i !== index && ref) ref.pause();
    });
  };

  const closeFullscreen = () => setSelectedReel(null);

  // Function to get complete video URL
  const getVideoUrl = (url) => {
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL.replace('/api', '')}${url}`;
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Reels</h1>

        {isAdmin && (
          <button
            onClick={() => navigate('/addreel')}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Upload New Reel
          </button>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reels.map((reel, index) => (
            <motion.div
              key={reel._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleReelClick(reel, index)}
            >
              <video
                src={getVideoUrl(reel.videoUrl)}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                ref={(el) => (videoRefs.current[index] = el)}
              />
              
              {isAdmin && (
                <button
                  onClick={(e) => handleDelete(reel._id, e)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full z-50"
                  style={{ width: '32px', height: '32px' }}
                >
                  <svg 
                    className="w-full h-full" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative w-full h-full max-w-md mx-auto flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={getVideoUrl(selectedReel.videoUrl)}
                className="w-full h-full object-contain"
                autoPlay
                controls
                muted={false}
                loop
              />
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reels;