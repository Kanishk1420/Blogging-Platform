# Bloggify - Modern Blogging Platform

A modern, responsive blogging platform built with React, Vite, Tailwind CSS, and Express.js backend.

![Bloggify Platform](./client/src/assets/Bloggify.png)

## Project Overview

This full-stack blogging platform allows users to create, read, update, and delete blog posts, as well as comment on posts. The platform features a modern UI/UX design, user authentication, and responsive design for all devices.

## Features

- **Modern UI/UX**: Sleek interface with Tailwind CSS styling
- **Responsive Design**: Mobile-friendly with hamburger menu and optimized layouts
- **User Authentication**: Secure login/signup with JWT
- **Blog Management**: Create, read, update, and delete blog posts
- **Interactive Comments**: Comment on blog posts
- **Image Upload**: Support for blog post images
- **Category Filtering**: Browse blogs by categories
- **Newsletter Subscription**: Capture user emails for updates
- **Password Visibility Toggle**: Enhance user experience during login
- **SVG Image Slider**: Engaging home page carousel
- **Responsive Footer**: Modern footer with social links

## Technology Stack

### Frontend
- **React**: Core UI library
- **Vite**: Fast build tool (migrated from Create React App)
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: For navigation
- **Axios**: For API requests

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication
- **Multer**: For handling file uploads

## Available Scripts

### Client

In the client directory, you can run:

```bash
cd client
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
```

The development server will be available at [http://localhost:5173](http://localhost:5173).

### Server

In the server directory, you can run:

```bash
cd server
npm install     # Install dependencies
npm start       # Start server with Node.js
# or
npm run dev     # Start server with nodemon for development
```

The server will run on port 8000 by default.

## Recent Improvements

- Migrated from Create React App to Vite for faster development
- Refactored JSX files to use proper .jsx extension for Vite compatibility
- Replaced styled-components with Tailwind CSS for more consistent styling
- Redesigned login/signup pages with improved error handling and password visibility toggle
- Updated header navigation with responsive design and hamburger menu for mobile
- Improved blog card layout with consistent image aspect ratios
- Added SVG image slider/carousel to the home page
- Implemented newsletter subscription section
- Added modern footer with social links
- Fixed authentication flow for protected routes
- Ensured mobile responsiveness throughout the application

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/Kanishk1420/Blogging-Platform.git
   cd blogging-platform
   ```

2. Set up environment variables:
   Create a `.env` file in the server directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. Install dependencies and start both client and server:
   ```bash
   # Terminal 1 - Client
   cd client
   npm install
   npm run dev

   # Terminal 2 - Server
   cd server
   npm install
   npm start
   ```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

## Deployment

The application will be deployed using services after development:
- Frontend: Vercel, or GitHub Pages
- Backend: Azure, or Render
- Database: MongoDB Atlas
