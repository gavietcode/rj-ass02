import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const ComedyCard = ({ comedy, clickeMovie }) => {
  return (
    <div className="comedy-card card" onClick={() => clickeMovie(comedy)}>
      {comedy.backdrop_path ? (
        <img
          className="imgWidth comedy-img"
          src={`${IMG_PATH}${comedy.backdrop_path}`}
          alt="ComedyIMG"
        />
      ) : (
        <div className="no-imgWidth">No IMG Found</div>
      )}
    </div>
  );
};

export default ComedyCard;
