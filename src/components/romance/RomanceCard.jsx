import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const RomanceCard = ({ romance, clickeMovie }) => {
  return (
    <div className="romance-card card" onClick={() => clickeMovie(romance)}>
      {romance.backdrop_path ? (
        <img
          className="imgWidth romance-img"
          src={`${IMG_PATH}${romance.backdrop_path}`}
          alt="RomanceIMG"
        />
      ) : (
        <div className="no-imgWidth">No IMG Found</div>
      )}
    </div>
  );
};

export default RomanceCard;
