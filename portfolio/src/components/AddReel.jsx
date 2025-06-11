import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FiUpload, FiX } from 'react-icons/fi';

const AddReel = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef();
  const navigate = useNavigate();

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file (MP4, MOV, etc.)');
      return;
    }

    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      setError('File size must be less than 100MB');
      return;
    }

    setVideoFile(file);
    setError(null);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
  };

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!videoFile) {
      setError('Please select a video file');
      return;
    }
  
    setIsUploading(true);
  
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
  
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      const response = await axios.post('https://superyuvango.onrender.com/api/reels', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      });
  
      console.log('Upload response:', response.data);
      navigate('/reels');
  
    } catch (error) {
      console.error('Full error details:', error);
      
      let errorMessage = 'Upload failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data.error || 
                      error.response.data.message || 
                      errorMessage;
        
        console.error('Server response data:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Check your connection.';
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || errorMessage;
        console.error('Request setup error:', error.message);
      }
  
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoRef.current) {
      videoRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Upload New Reel</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter reel title"
            required
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Video</label>
          
          {!videoPreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <FiUpload className="w-12 h-12 text-blue-500 mb-3" />
                <span className="text-lg text-gray-600">Click to select video</span>
                <span className="text-sm text-gray-500 mt-1">MP4, MOV, etc. (Max 100MB)</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={videoRef}
                  required
                />
              </label>
            </div>
          ) : (
            <div className="relative">
              <video
                src={videoPreview}
                controls
                className="w-full h-auto max-h-96 rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isUploading || !videoFile}
            className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all ${
              isUploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white flex items-center`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Upload Reel'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReel;