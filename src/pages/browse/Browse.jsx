import React from "react";
import MovieList from "../movieList/MovieList";
import Navbar from "../../components/navbar/Navbar";
import Originals from "../originals/Originals";
import Trending from "../trending/Trending";
import TopRate from "../topRate/TopRate";
import Action from "../action/Action";
import Comedy from "../comdey/Comedy";
import Horror from "../horror/Horror";
import Romance from "../romance/Romance";
import Document from "../document/Document";

function Browse() {
  return (
    <div className="browse">
      <div>
        <Navbar className="nav-component" />
        <MovieList />
        <Originals />
        <Trending />
        <TopRate />
        <Action />
        <Comedy />
        <Horror />
        <Romance />
        <Document />
      </div>
    </div>
  );
}

export default Browse;
