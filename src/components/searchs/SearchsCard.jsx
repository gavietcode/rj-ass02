import React from "react";
import { IMG_PATH } from "../originals/OriginalsCard";

const SearchsCard = ({ search, clickeMovie }) => {
  return (
    <div className="search-card card" onClick={() => clickeMovie(search)}>
      {search.poster_path ? (
        <img
          className="img search-img"
          src={`${IMG_PATH}${search.poster_path}`}
          alt="SearchIMGs"
        />
      ) : (
        <div className="no-img">No IMG Found</div>
      )}
    </div>
  );
};

export default SearchsCard;
