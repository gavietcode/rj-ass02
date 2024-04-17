import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const TrendingCard = ({ trending, clickeMovie }) => {
  return (
    <div className="trending-card card" onClick={() => clickeMovie(trending)}>
      {trending.backdrop_path ? (
        <img
          className="imgWidth trendings-img"
          src={`${IMG_PATH}${trending.backdrop_path}`}
          alt="TrendingIMG"
        />
      ) : (
        <div className="no-imgWidth">No IMG Found</div>
      )}
    </div>
  );
};

export default TrendingCard;
