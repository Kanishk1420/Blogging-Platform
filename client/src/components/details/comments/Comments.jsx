import { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

//components
import Comment from './Comment';

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
            setLoading(false);
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        if (!comment.comments.trim()) return;
        
        setLoading(true);
        await API.newComment(comment);
        setComment(initialValue);
        setToggle(prev => !prev);
    }
    
    return (
        <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Comments</h3>
            
            {/* Add Comment Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-[#1565D8] text-white flex items-center justify-center">
                            {account.username ? account.username.charAt(0).toUpperCase() : "G"}
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <textarea
                            className="block w-full rounded-md border border-gray-300 focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D8]/20 py-3 px-4 placeholder-gray-400 shadow-sm resize-none"
                            rows="3"
                            placeholder={account.username ? "Add a comment..." : "Please login to comment"}
                            value={comment.comments}
                            onChange={(e) => handleChange(e)}
                            disabled={!account.username}
                        />
                        <div className="mt-3 flex items-center justify-end">
                            <button
                                className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-medium ${
                                    account.username 
                                        ? 'bg-[#1565D8] text-white hover:bg-[#0d4fb8]' 
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                } transition-colors duration-200`}
                                onClick={addComment}
                                disabled={!account.username || loading}
                            >
                                {loading ? "Posting..." : "Post Comment"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {loading && comments.length === 0 && (
                    <div className="text-center py-6 text-gray-500">Loading comments...</div>
                )}
                
                {!loading && comments.length === 0 && (
                    <div className="text-center py-6 text-gray-500">No comments yet. Be the first to comment!</div>
                )}
                
                {comments && comments.length > 0 && comments.map(comment => (
                    <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                ))}
            </div>
        </div>
    )
}

export default Comments;