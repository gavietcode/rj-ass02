import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const ActionCard = ({ action, clickeMovie }) => {
  return (
    <div className="action-card card" onClick={() => clickeMovie(action)}>
      {action.backdrop_path ? (
        <img
          className="imgWidth action-img"
          src={`${IMG_PATH}${action.backdrop_path}`}
          alt="ActionIMG"
        />
      ) : (
        <div className="no-imgWidth">No IMG Found</div>
      )}
    </div>
  );
};

export default ActionCard;
