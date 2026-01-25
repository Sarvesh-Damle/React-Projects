import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-gray-700 hover:text-gray-900 transition-all z-50 group border border-gray-200"
      aria-label="Back to Home"
    >
        <IoArrowBack className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
    </button>
  );
};

export default BackButton;
