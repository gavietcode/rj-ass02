import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const OriginalsCard = ({ original, clickeMovie }) => {
  return (
    <div className="originals-card card" onClick={() => clickeMovie(original)}>
      {original.poster_path ? (
        <img
          className="img originals-img"
          src={`${IMG_PATH}${original.poster_path}`}
          alt="OriginalsIMG"
        />
      ) : (
        <div className="no-img">No IMG Found</div>
      )}
    </div>
  );
};

export default OriginalsCard;
