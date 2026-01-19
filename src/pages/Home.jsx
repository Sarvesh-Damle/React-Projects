import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaNewspaper, FaTasks, FaBrain } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    name: 'Todo App',
    path: '/Todo',
    icon: <FaTasks />,
    description: 'A simple and effective way to manage your daily tasks.'
  },
  {
    id: 2,
    name: 'Space News',
    path: '/SpaceNews',
    icon: <FaNewspaper />,
    description: 'Get the latest updates and news from the universe.'
  },
  {
    id: 3,
    name: 'Video Game',
    path: '/VideoGame',
    icon: <FaGamepad />,
    description: 'Dive into a fun and interactive gaming experience.'
  },
  {
    id: 4,
    name: 'Quiz App',
    path: '/Quiz',
    icon: <FaBrain />,
    description: 'Test your knowledge with challenging questions.'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">
      <header className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl text-slate-800 font-extrabold mb-4 tracking-tight">
          React Projects
        </h1>
        <p className="text-2xl text-slate-500 mb-6 font-light">
          Built by Sarvesh
        </p>
        <p className="inline-block px-6 py-2 rounded-full bg-blue-50 text-slate-600 border border-blue-200 text-lg shadow-sm">
          Explore my collection of interactive applications.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-7xl px-4">
        {projects.map((project) => (
          <Link 
            to={project.path} 
            key={project.id} 
            className="group bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-400 border border-transparent transition-all duration-300 ease-in-out"
          >
            <div className="text-5xl text-cyan-400 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600">
              {project.icon}
            </div>
            <h2 className="text-2xl text-slate-700 mb-4 font-semibold">
              {project.name}
            </h2>
            <p className="text-slate-500 mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            <span className="font-semibold text-blue-600 flex items-center gap-1 transition-all group-hover:gap-2 group-hover:text-teal-500">
              Try it out <span>&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;