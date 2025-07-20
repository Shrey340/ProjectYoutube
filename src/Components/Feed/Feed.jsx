import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageToken = "") => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12&regionCode=US&videoCategoryId=${category}&key=${API_KEY}&pageToken=${pageToken}`;

    try {
      const res = await fetch(videoList_url);
      const result = await res.json();

      setData((prev) => [...prev, ...result.items]);
      setNextPageToken(result.nextPageToken || "");

      if (!result.nextPageToken) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setData([]);
    setNextPageToken("");
    setHasMore(true);
    fetchData();
  }, [category]);

  return (
    <div className="feed-left">
      <InfiniteScroll
        dataLength={data.length}
        next={() => fetchData(nextPageToken)}
        hasMore={hasMore}
        loader={
          <p style={{ textAlign: "center", padding: "20px" }}>Loading...</p>
        }
        endMessage={
          <p style={{ textAlign: "center", padding: "20px" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="feed-grid">
          {data.map((item, index) => (
            <Link
              key={index}
              to={`video/${item.snippet.categoryId}/${item.id}`}
              className="card"
            >
              <img src={item.snippet.thumbnails.medium.url} alt="video" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>
                {value_converter(item.statistics.viewCount)} Views &bull;{" "}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
