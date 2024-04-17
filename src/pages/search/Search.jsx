import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchsCard from "../../components/searchs/SearchsCard";
import YouTube from "react-youtube";
import { API_URL, Movie_Key } from "../movieList/MovieList";
import { IMG_PATH } from "../../components/action/ActionCard";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//
const Search = () => {
  // Get API from MovieList
  const [searchs, setSearchs] = useState([]);
  // Get Data for click to play video
  const [selectedMovie, setSelectedMovie] = useState({});

  const [searchsKey, setSearchsKey] = useState("");

  const [playTrailer, setPlayTrailer] = useState(false);

  //
  const getSearchs = async (searchsKey) => {
    const type = searchsKey ? "search" : "discover";

    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: Movie_Key,
        query: searchsKey,
        language: "en-US",
      },
    });
    setSearchs(results);
    await clickeMovie(results[0]);
  };

  const getMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: Movie_Key,
        append_to_response: "videos",
        language: "en-US",
      },
    });
    return data;
  };

  // Get data when click to movie
  const clickeMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await getMovie(movie.id);
    // console.log(data);
    setSelectedMovie(data);
  };

  //
  useEffect(() => {
    getSearchs();
  }, []);

  // Render Data of Searchs
  const renderSearchs = () =>
    searchs.map((search) => (
      <SearchsCard key={search.id} search={search} clickeMovie={clickeMovie} />
    ));

  // Render Trailer
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.type === "Trailer" || vid.type === "Teaser"
    );

    const key = trailer ? trailer.key : selectedMovie.videos.results[0];

    return selectedMovie.videos.results.length > 0 ? (
      <YouTube
        videoId={key}
        containerCalssName={"youtube-cotainer"}
        opts={{
          width: "850px",
          height: "450px",
          playerVars: {
            autoplay: 0,
          },
        }}
      />
    ) : (
      <img
        className="imgVideos"
        src={`${IMG_PATH}${selectedMovie.backdrop_path}`}
        alt="No-Bacdrop-IMG"
      />
    );
  };

  const searchMovies = (e) => {
    e.preventDefault();
    getSearchs(searchsKey);
  };

  const resetMovies = (e) => {
    e.preventDefault();
    getSearchs();
    setSearchsKey();
  };

  //

  return (
    <div className="search-movies">
      <Navbar />
      <header className="search-header">
        <div className="search-form">
          <form onSubmit={searchMovies} className="form-input">
            <div className="input-item">
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchsKey(e.target.value)
                }
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>

            <div>
              <button type="submit">Search!</button>
              <button type="submit" onClick={resetMovies}>
                Reset!
              </button>
            </div>
          </form>
        </div>
      </header>
      <h1 className="max-width">Search Movies</h1>
      <div
        className="searchs max-width"
        onClick={() => setPlayTrailer(!playTrailer)}
      >
        {renderSearchs()}
        {console.log(selectedMovie)}
      </div>
      {playTrailer ? (
        <div className="play-videos max-width">
          {selectedMovie.videos ? renderTrailer() : null}
          <div className="play-content max-width">
            <h1>{selectedMovie.title}</h1>
            {selectedMovie.release_date ? (
              <h2>
                Release date: {selectedMovie.release_date} <br />{" "}
                <span>Vote: {selectedMovie.vote_average}/10</span>
              </h2>
            ) : null}
            {selectedMovie.overview ? <h2>{selectedMovie.overview}</h2> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
