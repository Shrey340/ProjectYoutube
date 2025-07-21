import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import { useParams, Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${API_KEY}`;
      const res = await fetch(search_url);
      const data = await res.json();
      setResults(data.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setTimeout(() => setLoading(false), 2000); // Delay for 2 seconds
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  const SkeletonCard = () => (
    <div className="card skeleton-card">
      <div className="skeleton thumbnail"></div>
      <div className="skeleton title"></div>
      <div className="skeleton channel"></div>
      <div className="skeleton info"></div>
    </div>
  );

  return (
    <div className="feed">
      {loading
        ? Array(10)
            .fill()
            .map((_, index) => <SkeletonCard key={index} />)
        : results.map((item, index) => {
            const videoId = item.id.videoId || item.id;
            return (
              <Link
                key={index}
                to={`/video/${item.snippet.categoryId || 0}/${videoId}`}
                className="card"
              >
                <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
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
