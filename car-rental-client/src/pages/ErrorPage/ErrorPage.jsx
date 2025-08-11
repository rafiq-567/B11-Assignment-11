import React from 'react';
import { Link } from 'react-router'; 
import errorImg from '../../assets/404.avif'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4 mt-20">
      <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-4 animate-bounce">404</h1>
      <p className="text-xl md:text-2xl text-center mb-8">Oops! The page you're looking for doesn't exist.</p>

    
      <img
        src={errorImg}
        alt="Page Not Found"
        className="max-w-40  mb-10 rounded-lg shadow-lg"
      />

      <Link
        to="/" 
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;