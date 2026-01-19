import React from "react";
import "./SpaceNews.css";
import useSWR from "swr";

const SpaceNews = () => {
  // const [newsList, setNewsList] = useState([]);

  const fetcher = (...args) => fetch(...args).then(response => response.json());

  const { data, isLoading } = useSWR('https://api.spaceflightnewsapi.net/v4/articles', fetcher)

  return (
    <div className="newsMain">
      <div className="newstitle">
        <h1>Space News</h1>
      </div>

      {isLoading ? (<div className="loader"></div>) : (<div className="newsContainer">
        {data && data?.results?.length > 0 ? (data?.results?.map((article) =>
        (
          <div key={article?.id} className="article" onClick={() => { window.location.href = article?.url }} >
            <h3 className="articleTitle">{article?.title}</h3>
            {article.image_url && <img src={article?.image_url} alt="article_image" className="articleImage" />}

            <div className="articleInfo">
              <p><strong>Summary:</strong> {article?.summary}</p>
              <p><strong>News Source:</strong> {article?.news_site}</p>
              <h4><strong>Published On:</strong> {new Date(article?.published_at).toLocaleString()}</h4>
            </div>
          </div>
        )
        )) : (
          <p>No articles found.</p>
        )}
      </div>)}
    </div>
  );
};

export default SpaceNews;
