import React from 'react';
import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

// Import your SVG 
import publishArticleSVG from '../../assets/undraw_blogging_t042.svg';

const Home = () => {
  return (
    <Box className="pt-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
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
    </Box>
  );
};

export default Home;