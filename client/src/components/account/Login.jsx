import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

// Initial values remain the same
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
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { setAccount } = useContext(DataContext);

    // Updated with a sleeker logo or keep your existing one
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        // Clear any existing error message
        showError('');
        
        // Clear any existing timeout when login values change
        if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
        }
    }, [login]);
    
    // Auto-dismiss for error messages
    useEffect(() => {
        if (error) {
            // Set a timeout to clear the error after 5 seconds
            errorTimeoutRef.current = setTimeout(() => {
                showError('');
            }, 5000); // 5 seconds
        }
        
        // Cleanup function
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

    const navigateBack = () => {
        // Check if there's a previous path stored in state (passed when redirecting here)
        const returnPath = location.state?.from || '/';
        navigate(returnPath);
    };

    const loginUser = async () => {
        try {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
                showError('');
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                sessionStorage.setItem('username', response.data.username);
                sessionStorage.setItem('name', response.data.name);
                setAccount({ name: response.data.name, username: response.data.username });
                
                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigateBack(); // This will send the user back to the destination
            } else {
                showError(response.msg || 'Username or password is incorrect');
            }
        } catch (error) {
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
                showError(response.msg || 'Username already exists or invalid information');
            }
        } catch (error) {
            showError('Unable to create account. Please try again.');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
        showError('');
    }

    const toggleLoginPasswordVisibility = () => {
        setShowLoginPassword(!showLoginPassword);
    };
    
    const toggleSignupPasswordVisibility = () => {
        setShowSignupPassword(!showSignupPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 font-['Roboto',sans-serif] pt-16">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="flex flex-col items-center pt-10 pb-6">
                    <div className="text-2xl font-bold text-[#1565D8] mb-6">Bloggify</div>
                    {/* Or keep your original logo */}
                    {/* <img src={imageURL} alt="blog" className="w-32 mb-6" /> */}
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {account === 'login' ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        {account === 'login' ? 'Sign in to access your account' : 'Join our blogging community'}
                    </p>
                    
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
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
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
                        <div className="mb-6 relative">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565D8]/25 focus:border-[#1565D8] transition-all duration-200 pr-10"
                                    id="password"
                                    type={showLoginPassword ? "text" : "password"}
                                    name="password"
                                    value={login.password}
                                    onChange={onValueChange}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleLoginPasswordVisibility}
                                >
                                    {showLoginPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <button
                                className="w-full bg-[#1565D8] hover:bg-[#0d4fb8] text-white font-medium py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={loginUser}
                            >
                                Sign In
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-center">
                            <span className="border-b w-1/5"></span>
                            <p className="text-xs text-gray-500 uppercase mx-2">or</p>
                            <span className="border-b w-1/5"></span>
                        </div>
                        
                        <div className="mt-6">
                            <button
                                className="w-full bg-white hover:bg-gray-50 text-[#1565D8] font-medium py-3 px-4 rounded-full border border-[#1565D8] focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={toggleSignup}
                            >
                                Create an account
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="px-8 pb-8">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
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
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-username">
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
                        <div className="mb-6 relative">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565D8]/25 focus:border-[#1565D8] transition-all duration-200 pr-10"
                                    id="signup-password"
                                    type={showSignupPassword ? "text" : "password"}
                                    name="password"
                                    onChange={onInputChange}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleSignupPasswordVisibility}
                                >
                                    {showSignupPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <button
                                className="w-full bg-[#1565D8] hover:bg-[#0d4fb8] text-white font-medium py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
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
                                className="w-full bg-white hover:bg-gray-50 text-[#1565D8] font-medium py-3 px-4 rounded-full border border-[#1565D8] focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={toggleSignup}
                            >
                                Already have an account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;