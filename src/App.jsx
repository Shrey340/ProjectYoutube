// App.jsx
import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import SearchResults from "./Pages/SearchResults/SearchResults";
import Sidebar from "./Components/Sidebar/Sidebar";

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route
          path="/search/:query"
          element={<SearchResultsWithSidebar sidebar={sidebar} />}
        />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

const SearchResultsWithSidebar = ({ sidebar }) => {
  return (
    <div className="home">
      <HomeLayout sidebar={sidebar}>
        <SearchResults />
      </HomeLayout>
    </div>
  );
};

const HomeLayout = ({ sidebar, children }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <div className="home">
        <Sidebar
          sidebar={sidebar}
          category={category}
          setCategory={setCategory}
        />
        {children}
      </div>
    </>
  );
};

export default App;
