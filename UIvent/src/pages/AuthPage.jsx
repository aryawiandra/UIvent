import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const AuthPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false,
        terms: false
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({...formData, [e.target.name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle auth logic here

        if (activeTab === 'login') {
            navigate('/events'); // Redirect to events page after sign in
        }
    };

    return (
        <div className="min-h-screen w-screen overflow-y-auto no-scrollbar bg-gradient-to-br from-yellow-50 to-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div 
                    className="mb-8 flex justify-center items-center cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl tracking-tight mr-2 group-hover:bg-yellow-600 transition-colors">
                        UI
                    </div>
                    <span className="text-2xl font-extrabold text-yellow-600 tracking-tight group-hover:text-yellow-700 transition-colors">UIvent</span>
                </div>
                
                {/* Auth Container */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b">
                        <button
                            className={`flex-1 py-4 text-sm tracking-wide ${
                                activeTab === 'login'
                                ? 'text-yellow-600 border-b-2 border-yellow-500 font-semibold'
                                : 'text-gray-500 hover:text-yellow-500 font-medium'
                            }`}
                            onClick={() => setActiveTab('login')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`flex-1 py-4 text-sm tracking-wide ${
                                activeTab === 'register'
                                ? 'text-yellow-600 border-b-2 border-yellow-500 font-semibold'
                                : 'text-gray-500 hover:text-yellow-500 font-medium'
                            }`}
                            onClick={() => setActiveTab('register')}
                        >
                            Create Account
                        </button>
                    </div>
                    
                    {/* Forms */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {activeTab === 'register' && (
                                <Input
                                    label="Full Name"
                                    name="name"
                                    type="text"
                                    id="register-name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                            
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                id={`${activeTab}-email`}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                id={`${activeTab}-password`}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            
                            {activeTab === 'login' ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#" className="text-sm text-yellow-600 hover:text-yellow-500 font-medium">
                                        Forgot password?
                                    </a>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={formData.terms}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                                        required
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 font-medium">
                                        I agree to the terms
                                    </label>
                                </div>
                            )}
                            
                            <Button type="submit" className="w-full">
                                {activeTab === 'login' ? 'Sign in' : 'Create Account'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;