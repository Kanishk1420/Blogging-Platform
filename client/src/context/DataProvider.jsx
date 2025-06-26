import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({ username: '', name: '' });
    
    useEffect(() => {
        // Check if user is logged in on component mount
        const accessToken = sessionStorage.getItem('accessToken');
        
        if (accessToken) {
            // If token exists, fetch user details or decode JWT
            const username = sessionStorage.getItem('username') || '';
            const name = sessionStorage.getItem('name') || '';
            setAccount({ username, name });
        }
    }, []);

    return (
        <DataContext.Provider value={{ 
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;