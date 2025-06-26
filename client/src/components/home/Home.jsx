import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, InputAdornment, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

// Import your SVG 
import publishArticleSVG from '../../assets/undraw_blogging_t042.svg';

// Sample blog post data (replace with API data later)
const samplePosts = [
  {
    id: 1,
    title: "Future of Work",
    excerpt: "Majority of people will work in jobs that don't exist today.",
    image: "https://images.unsplash.com/photo-1657639028182-24e11504c7c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      name: "Johanna Murray",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      verified: true
    },
    date: "02 May"
  },
  {
    id: 2,
    title: "Why Use External IT Support",
    excerpt: "Thanks to never-ending piles of data & the amount of insight.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      name: "Eugene Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true
    },
    date: "02 May"
  },
  {
    id: 3,
    title: "Future of Learning",
    excerpt: "A constant ability to learn will be on the most crucial skills.",
    image: "https://images.unsplash.com/photo-1530825894095-9c184b068fcb?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      name: "Helen Hughes",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      verified: true
    },
    date: "02 May"
  },
  {
    id: 4,
    title: "Help Finding Information Online",
    excerpt: "Majority of people will work in jobs that don't exist today.",
    image: "https://images.unsplash.com/photo-1627780538498-473424a9c46c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      name: "Bobby Stevens",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      verified: true
    },
    date: "02 May"
  },
  {
    id: 5,
    title: "How Does An LCD Screen Work",
    excerpt: "Thanks to never-ending piles of data & the amount of insight.",
    image: "https://images.unsplash.com/photo-1547658718-1cdaa0852790?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      name: "Lettie Hale",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      verified: true
    },
    date: "02 May"
  },
  {
    id: 6,
    title: "Headset No Longer Wired For Sound",
    excerpt: "A constant ability to learn will be on the most crucial skills.",
    image: "https://images.unsplash.com/photo-1610041321327-b794c052db27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      name: "Anne Bryan",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      verified: true
    },
    date: "02 May"
  }
];

// Blog Card Component
const BlogCard = ({ post }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }
    }}>
      <Box sx={{ 
        position: 'relative',
        paddingTop: '56.25%' // 16:9 aspect ratio
      }}>
        <CardMedia
          component="img"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          image={post.image}
          alt={post.title}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography gutterBottom variant="h5" component="h2" sx={{ 
          fontWeight: '600', 
          color: '#1e3a8a',
          fontSize: '1.25rem',
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.3
        }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.5
        }}>
          {post.excerpt}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mt: 'auto'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={post.author.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: '500' }}>
                {post.author.name}
              </Typography>
              <Typography variant="caption" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'text.secondary',
                fontSize: '0.7rem' 
              }}>
                <Box component="span" sx={{ 
                  width: 8, 
                  height: 8, 
                  backgroundColor: '#4CAF50', 
                  borderRadius: '50%',
                  mr: 0.5,
                  display: 'inline-block'
                }}></Box>
                Verified writer
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {post.date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  // In a real app, you'd fetch posts from an API
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // Simulate API call
    setPosts(samplePosts);
  }, []);

  return (
    <Box className="pt-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content Section */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
              Read the most <br className="hidden md:block" />interesting articles
            </h1>
            
            <p className="text-slate-600 text-lg mb-8 max-w-xl">
              Discover insightful perspectives, expert advice, and thought-provoking 
              content from our community of passionate writers and industry experts.
            </p>
            
            {/* Search Box with Fixed Width */}
            <div className="bg-white rounded-lg shadow-md flex mb-8 max-w-screen">
              <TextField
                placeholder="Search article"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: '8px',
                    '& fieldset': { border: 'none' },
                  }
                }}
                sx={{ flex: 1 }}
              />
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#2563EB',
                  '&:hover': { bgcolor: '#1D4ED8' },
                  borderRadius: '8px',
                  boxShadow: 'none',
                  px: 3,
                  minWidth: '100px'
                }}
              >
                Search
              </Button>
            </div>
            
            {/* Popular Tags with Increased Size and Italic Style */}
            <div>
              <span className="text-slate-600 font-medium mr-4">Popular Tags:</span>
              <div className="inline-flex flex-wrap gap-3 mt-3">
                <span className="bg-blue-100 text-blue-600 px-5 py-1.5 rounded-full text-base italic font-medium">Design</span>
                <span className="bg-blue-100 text-blue-600 px-5 py-1.5 rounded-full text-base italic font-medium">User Experience</span>
                <span className="bg-blue-100 text-blue-600 px-5 py-1.5 rounded-full text-base italic font-medium">User Interfaces</span>
              </div>
            </div>
          </div>
          
          {/* Right Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src={publishArticleSVG} 
              alt="Publishing articles illustration" 
              className="max-w-full h-auto" 
              style={{ maxHeight: '450px' }}
            />
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <Box sx={{ py: 8, backgroundColor: '#f9fafb' }}>
        <Box className="container mx-auto px-4 md:px-6 lg:px-8">
          <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 'bold', 
            mb: 5, 
            textAlign: 'center',
            color: '#1576D8'  // Changed from #1e3a8a to #1576D8
          }}>
            Latest Articles
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: '360px' }}>
                  <BlogCard post={post} />
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button 
              variant="outlined" 
              endIcon={<ArrowForwardIcon />}
              component={Link}
              to="/blog"
              sx={{
                borderColor: '#2563EB',
                color: '#2563EB',
                borderRadius: '9999px',
                px: 4,
                py: 1,
                '&:hover': {
                  borderColor: '#1D4ED8',
                  backgroundColor: 'rgba(37, 99, 235, 0.04)'
                }
              }}
            >
              More articles
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;