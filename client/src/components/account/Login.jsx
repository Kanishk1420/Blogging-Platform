import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const errorTimeoutRef = useRef(null);

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        // Clear any existing error message
        showError('');
        
        // Clear any existing timeout when login values change
        if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
        }
    }, [login])
    
    // Set up auto-dismiss for error messages
    useEffect(() => {
        if (error) {
            // Set a timeout to clear the error after 5 seconds
            errorTimeoutRef.current = setTimeout(() => {
                showError('');
            }, 5000); // 5 seconds
        }
        
        // Cleanup function to clear timeout when component unmounts or error changes
        return () => {
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
            }
        };
    }, [error]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        try {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
                showError('');
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                
                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                // Display the specific error message from the API
                showError(response.msg || 'Username or password is incorrect');
            }
        } catch (error) {
            // More specific authentication error instead of server connection error
            showError('Username or password is incorrect');
        }
    }

    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                showError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                // Display specific signup error from the API
                showError(response.msg || 'Username already exists or invalid information');
            }
        } catch (error) {
            showError('Unable to create account. Please try again.');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
        showError(''); // Clear any errors when switching forms
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col items-center pt-10 pb-6">
                    <img src={imageURL} alt="blog" className="w-32 mb-6" />
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md w-[80%] mb-4 text-center relative">
                            {error}
                            <span 
                                className="absolute top-1 right-2 text-red-700 cursor-pointer"
                                onClick={() => showError('')}
                            >
                                ×
                            </span>
                        </div>
                    )}
                </div>
                
                {account === 'login' ? (
                    <div className="px-8 pb-8">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565D8]/25 focus:border-[#1565D8] transition-all duration-200"
                                id="username"
                                type="text"
                                name="username"
                                value={login.username}
                                onChange={onValueChange}
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565D8]/25 focus:border-[#1565D8] transition-all duration-200"
                                id="password"
                                type="password"
                                name="password"
                                value={login.password}
                                onChange={onValueChange}
                                placeholder="Enter password"
                            />
                        </div>
                        
                        <div className="mb-6">
                            <button
                                className="w-full bg-[#1565D8] hover:bg-[#0d4fb8] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={loginUser}
                            >
                                Log In
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-center">
                            <span className="border-b w-1/5"></span>
                            <p className="text-xs text-gray-500 uppercase mx-2">or</p>
                            <span className="border-b w-1/5"></span>
                        </div>
                        
                        <div className="mt-6">
                            <button
                                className="w-full bg-white hover:bg-gray-100 text-[#1565D8] border-[#1565D8] font-bold py-3 px-4 rounded border focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={toggleSignup}
                            >
                                Create an account
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="px-8 pb-8">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565D8]/25 focus:border-[#1565D8] transition-all duration-200"
                                id="name"
                                type="text"
                                name="name"
                                onChange={onInputChange}
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-username">
                                Username
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565D8]/25 focus:border-[#1565D8] transition-all duration-200"
                                id="signup-username"
                                type="text"
                                name="username"
                                onChange={onInputChange}
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                                Password
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565D8]/25 focus:border-[#1565D8] transition-all duration-200"
                                id="signup-password"
                                type="password"
                                name="password"
                                onChange={onInputChange}
                                placeholder="Enter password"
                            />
                        </div>
                        
                        <div className="mb-6">
                            <button
                                className="w-full bg-[#1565D8] hover:bg-[#0d4fb8] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={signupUser}
                            >
                                Sign Up
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-center">
                            <span className="border-b w-1/5"></span>
                            <p className="text-xs text-gray-500 uppercase mx-2">or</p>
                            <span className="border-b w-1/5"></span>
                        </div>
                        
                        <div className="mt-6">
                            <button
                                className="w-full bg-white hover:bg-gray-100 text-[#1565D8] border-[#1565D8] font-bold py-3 px-4 rounded border focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={toggleSignup}
                            >
                                Already have an account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login;