import { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const DetailView = () => {
    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {  
        if (window.confirm('Are you sure you want to delete this post?')) {
            await API.deletePost(post._id);
            navigate('/');
        }
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            {loading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                        <div className="h-80 bg-gray-200 rounded-lg w-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-64"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative">
                        <img 
                            src={post.picture || defaultImage} 
                            alt={post.title} 
                            className="w-full h-[50vh] object-cover rounded-xl shadow-md"
                        />
                        
                        {account.username === post.username && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Link 
                                    to={`/update/${post._id}`}
                                    className="p-2 bg-white rounded-full shadow-md text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <Edit />
                                </Link>
                                <button 
                                    onClick={deleteBlog}
                                    className="p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors duration-200"
                                >
                                    <DeleteOutline />
                                </button>
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-gray-800">{post.title}</h1>

                    <div className="flex flex-col sm:flex-row justify-between items-center text-gray-600 mb-8">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <div className="h-8 w-8 rounded-full bg-[#1565D8] text-white flex items-center justify-center mr-2">
                                {post.username ? post.username.charAt(0).toUpperCase() : "A"}
                            </div>
                            <Link to={`/?username=${post.username}`} className="text-gray-700 hover:text-[#1565D8] transition-colors duration-200 font-medium">
                                {post.username}
                            </Link>
                        </div>
                        <div className="text-sm text-gray-500">
                            {new Date(post.createdDate).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric'
                            })}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <div className="prose prose-lg max-w-none">
                            {post.description && post.description.split('\n').map((paragraph, index) => (
                                paragraph ? <p key={index} className="mb-4 text-gray-700">{paragraph}</p> : <br key={index} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-200 pt-6">
                        <Comments post={post} />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailView;