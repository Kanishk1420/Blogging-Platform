import { useContext, useState } from "react";
import { Typography, Box } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);
    const [deleting, setDeleting] = useState(false);
    
    const removeComment = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            setDeleting(true);
            await API.deleteComment(comment._id);
            setToggle(prev => !prev);
        }
    }

    return (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#1565D8] text-white flex items-center justify-center mr-2">
                        {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-800">{comment.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </span>
            </div>
            
            <p className="text-gray-700 mt-2">{comment.comments}</p>
            
            {comment.name === account.username && 
                <div className="mt-3 flex justify-end">
                    <button 
                        onClick={removeComment}
                        disabled={deleting}
                        className="text-red-500 hover:text-red-600 text-xs flex items-center transition-colors duration-200"
                    >
                        <DeleteOutlineIcon fontSize="small" className="mr-1" />
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            }
        </div>
    );
};

export default Comment;