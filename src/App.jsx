import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo/Todo";
import Quiz from "./pages/Quiz/Quiz";
import SpaceNews from "./pages/Space News/SpaceNews";
import VideoGame from "./pages/Video Game/VideoGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Todo" element={<Todo/>} />
      <Route path="/Quiz" element={<Quiz/>} />
      <Route path="/SpaceNews" element={<SpaceNews/>} />
      <Route path="/VideoGame" element={<VideoGame/>} />
    </Routes>
  );
}

export default App;
