import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import { useParams, Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  const fetchSearchResults = async () => {
    const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${API_KEY}`;
    const res = await fetch(search_url);
    const data = await res.json();
    setResults(data.items);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="feed">
      {results.map((item, index) => {
        const videoId = item.id.videoId || item.id; 
        return (
          <Link
            key={index}
            to={`/video/${item.snippet.categoryId || 0}/${videoId}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
