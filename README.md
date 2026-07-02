# Super Yuva NGO

A full-stack NGO portfolio and content management project with a React/Vite frontend and an Express/MongoDB backend. The app supports story submissions and reel uploads with thumbnail generation, admin authentication, and a responsive NGO portfolio experience.

## Project Structure

- `backend/` - Express API server
  - `index.js` - main server and API implementation
  - `authMiddleware.js` - JWT authentication middleware
  - `models/` - Mongoose models (admin and story data)
  - `uploads/` - uploaded video and thumbnail assets
- `portfolio/` - React frontend built with Vite
  - `src/` - application source files
  - `src/components/` - reusable UI and page components
  - `public/` - static assets

## Key Features

### Backend
- Admin login with JWT authentication
- Story creation, listing, and deletion
- Reel uploads using Multer
- Thumbnail generation for uploaded reels via FFmpeg
- Upload asset serving from `/uploads`
- MongoDB persistence using Mongoose
- CORS configuration for local development and production

### Frontend
- React + Vite application
- Tailwind CSS styling
- Multiple page routes: Home, Inspiration, About, Contact, Work, Achieve, Login, Add Story, Reels, Add Reel
- Login flow for admin access
- Story and reel interfaces for NGO content management

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer, FFmpeg, Axios
- Frontend: React, React Router, Vite, Tailwind CSS, Radix UI, Framer Motion
- Tools: ESLint, PostCSS


## API Endpoints

### Admin
- `POST /api/admin/login` - admin authentication and JWT generation

### Stories
- `POST /api/stories` - submit a new story with an optional cover image
- `GET /api/stories` - get all stories
- `DELETE /api/stories/:id` - delete a story by ID

### Reels
- `POST /api/reels` - upload a new reel/video file
- `GET /api/reels` - fetch uploaded reels
- `DELETE /api/reels/:id` - delete a reel by ID (protected route)

### Static assets
- `GET /uploads/*` - serve uploaded story assets, reel files, and thumbnails

## Notes

- The backend uses `ffmpeg-static` and `ffprobe-static` to generate video thumbnails automatically.
- CORS is configured to accept requests from `http://localhost:5173` and `https://super-yuva-ngo.vercel.app`.
- The frontend includes routes for NGO content presentation and admin content submission.

## Build for Production

```bash
cd portfolio
npm run build
```

## License

This project is available to use and customize for your NGO portfolio development.
