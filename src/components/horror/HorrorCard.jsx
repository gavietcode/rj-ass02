import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const HorrorCard = ({ horror, clickeMovie }) => {
  return (
    <div className="horror-card card" onClick={() => clickeMovie(horror)}>
      {horror.backdrop_path ? (
        <img
          className="imgWidth horror-img"
          src={`${IMG_PATH}${horror.backdrop_path}`}
          alt="HorrorIMG"
        />
      ) : (
        <div className="no-imgWidth">No IMG Found</div>
      )}
    </div>
  );
};

export default HorrorCard;
