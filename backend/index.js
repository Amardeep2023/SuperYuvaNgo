const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const ffprobeStatic = require('ffprobe-static');
const axios = require('axios');
const verifyToken = require('./middleware/auth');




const router = express.Router();




dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only your frontend
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow cookies and authentication headers
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



// Admin Schema & Model


const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String, // Hashed password
});
const Admin = mongoose.model("Admin", AdminSchema);



// Call function to create admin //"/api/admin/login"
const jwtsecret = process.env.JWT_SECRET || "your-secret-key";

// Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { email: admin.email, id: admin._id, name: admin.name },
      jwtsecret,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure only in production
        sameSite: "strict",
      })
      .json({ message: "Login successful", token, admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  
  console.log("Hashed Password:", hashedPassword);
}

hashPassword("qwer");


// Story Schema & Model
const StorySchema = new mongoose.Schema({
  title: String,
  description: String,
  coverImage: String,
});
const Story = mongoose.model("Story", StorySchema);

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to handle story submission
app.post("/api/stories", upload.single("coverImage"), async (req, res) => {
  try {
    const newStory = new Story({
      title: req.body.title,
      description: req.body.description,
      coverImage: req.file ? req.file.filename : "",
    });

    const savedStory = await newStory.save();
    
    // Return the complete story data including _id
    res.status(201).json({ 
      message: "Story added successfully", 
      story: {
        _id: savedStory._id,
        title: savedStory.title,
        description: savedStory.description,
        coverImage: savedStory.coverImage
      }
    });
  } catch (error) {
    console.error("Error adding story:", error);
    res.status(500).json({ error: "Failed to add story" });
  }
});

// Serve images statically
app.use("/uploads", express.static(uploadDir));

app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }); // Fetch all stories, newest first
    res.json(stories.map(story => ({
      _id: story._id,
      title: story.title,
      description: story.description,
      coverImage: story.coverImage,
      // Add any other fields you need
    })));
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

app.delete("/api/stories/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Delete the image file if it exists
    if (story.coverImage) {
      const imagePath = path.join(uploadDir, story.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Remove story from DB
    await Story.findByIdAndDelete(req.params.id);

    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ error: "Failed to delete story" });
  }
});
//Reels

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);


const Reel = mongoose.model('Reel', new mongoose.Schema({
  title: String,
  videoUrl: String,
  thumbnailUrl: String,
  createdAt: { type: Date, default: Date.now }
}));

const uploadsDir = path.join(__dirname, 'uploads');
const reelsDir = path.join(uploadsDir, 'reels');
const thumbnailsDir = path.join(uploadsDir, 'thumbnails');

[uploadsDir, reelsDir, thumbnailsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const authenticate = (req, res, next) => {
  console.log('Auth middleware triggered');

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token provided in header');
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('Token verification failed:', err.message);
        return res.status(401).json({ error: `Invalid token - ${err.message}` });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
};



const reelUpload = multer({
  storage: multer.diskStorage({
    destination: reelsDir,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  },
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

const generateThumbnail = (videoPath) => {
  return new Promise((resolve, reject) => {
    const thumbnailName = `thumb-${path.basename(videoPath)}.jpg`;
    const thumbnailPath = path.join(thumbnailsDir, thumbnailName);

    console.log(`Generating thumbnail from ${videoPath} to ${thumbnailPath}`);

    ffmpeg(videoPath)
      .on('end', () => {
        console.log('Thumbnail generated successfully');
        resolve({
          path: thumbnailPath,
          url: `/uploads/thumbnails/${thumbnailName}`
        });
      })
      .on('error', err => {
        console.error('Thumbnail generation error:', err);
        reject(err);
      })
      .screenshots({
        count: 1,
        folder: thumbnailsDir,
        filename: thumbnailName,
        size: '640x360'
      });
  });
};



app.post("/api/reels", reelUpload.single("video"), async (req, res) => {
  try {
    console.log('Upload request received');
    
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ 
        success: false,
        error: 'No video file uploaded' 
      });
    }

    console.log('Processing file:', req.file.path);

    const videoPath = req.file.path;
    const videoUrl = `/uploads/reels/${path.basename(videoPath)}`;
    let thumbnailUrl = null;

    try {
      console.log('Generating thumbnail...');
      const thumbnail = await generateThumbnail(videoPath);
      thumbnailUrl = thumbnail.url;
      console.log('Thumbnail generated:', thumbnailUrl);
    } catch (thumbnailError) {
      console.error('Thumbnail generation failed:', thumbnailError);
      // Continue without thumbnail if generation fails
    }

    console.log('Creating reel document...');
    const newReel = new Reel({
      title: req.body.title || 'Untitled Reel',
      videoUrl,
      thumbnailUrl
    });

    const savedReel = await newReel.save();
    console.log('Reel saved successfully:', savedReel._id);

    res.status(201).json({
      success: true,
      message: "Reel uploaded successfully",
      reel: savedReel
    });

  } catch (error) {
    console.error('SERVER ERROR DETAILS:', error);
    
    // Cleanup uploaded files if error occurred
    try {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (cleanupError) {
      console.error('Cleanup failed:', cleanupError);
    }

    res.status(500).json({
      success: false,
      error: 'Failed to upload reel',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.get('/api/reels', async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json(reels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reels' });
  }
});



app.delete('/api/reels/:id', verifyToken, async (req, res) => {
  try {
    const reelId = req.params.id;
    console.log("DELETE route hit with ID:", reelId);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(reelId)) {
      console.log("❌ Invalid ObjectId");
      return res.status(400).json({ success: false, error: 'Invalid reel ID format' });
    }

    // Try finding the reel
    const reel = await Reel.findById(reelId);
    console.log("🎯 Reel from DB:", reel);

    if (!reel) {
      return res.status(404).json({ success: false, error: 'Reel not found' });
    }

    await Reel.deleteOne({ _id: reelId });

    res.status(200).json({
      success: true,
      message: 'Reel deleted successfully',
      deletedId: reelId
    });

  } catch (error) {
    console.error('🔥 Delete error:', error);
    res.status(500).json({ success: false, error: 'Server error during deletion' });
  }
});

// router.delete('/reels/:id', async (req, res) => {
//   try {
//     console.log("DELETE request received for reel:", req.params.id);
    
//     // Basic validation
//     if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ 
//         success: false,
//         error: 'Invalid reel ID format' 
//       });
//     }

//     const reel = await Reel.findById(req.params.id);
//     if (!reel) {
//       return res.status(404).json({ 
//         success: false,
//         error: 'Reel not found' 
//       });
//     }

//     // Delete operations (keep your existing file deletion logic)
//     // ...

//     await Reel.deleteOne({ _id: req.params.id });
    
//     res.status(200).json({
//       success: true,
//       message: 'Reel deleted successfully',
//       deletedId: req.params.id
//     });

//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Server error during deletion'
//     });
//   }
// });

// module.exports = router;

// router.delete('/reels/:id', async (req, res) => {
//   try {
//     // 1. Verify Authorization header exists
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'Unauthorized - No token provided' });
//     }

//     // 2. Extract token
//     const token = authHeader.split(' ')[1];
    
//     // 3. Verify token (simple version - add proper JWT verify in production)
//     if (!token) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     // Rest of your existing delete logic...
//     const reel = await Reel.findById(req.params.id);
//     if (!reel) {
//       return res.status(404).json({ error: 'Reel not found' });
//     }

//     // ... file deletion logic ...

//     await Reel.deleteOne({ _id: req.params.id });
    
//     res.json({ 
//       success: true,
//       message: 'Reel deleted successfully' 
//     });

//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({ 
//       error: 'Failed to delete reel',
//       details: error.message 
//     });
//   }
// });


app.use('/uploads', express.static('uploads', {
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

app.use('/uploads', express.static('uploads')); // No auth
app.use('/api/reels', authenticate); // Auth only for API routes

//Uncomment below to generate a hash (don't keep it enabled in production)
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Server is running!"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));