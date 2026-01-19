import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { FaGamepad, FaNewspaper, FaTasks } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="Home">
      <h1 className="top">React Projects:</h1>
      <div className="project-links">
        <Link to='Todo' className="project-link">
          <FaTasks className="project-icon" /> Go to Todo Project
        </Link>
        <Link to='SpaceNews' className="project-link">
          <FaNewspaper className="project-icon" /> Go to SpaceNews
        </Link>
        <Link to='VideoGame' className="project-link">
          <FaGamepad className="project-icon" /> Go to VideoGame
        </Link>
      </div>
    </div>
  );
}

export default Home;
