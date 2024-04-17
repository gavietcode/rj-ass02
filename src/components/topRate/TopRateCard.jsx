import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const TopRateCard = ({ topRate, clickeMovie }) => {
  return (
    <div className="topRate-card card" onClick={() => clickeMovie(topRate)}>
      {topRate.backdrop_path ? (
        <img
          className="imgWidth topRates-img"
          src={`${IMG_PATH}${topRate.backdrop_path}`}
          alt="TopRateIMG"
        />
      ) : (
        <div className="no-imgWidth">No IMG Found</div>
      )}
    </div>
  );
};

export default TopRateCard;
