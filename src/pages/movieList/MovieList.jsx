import React, { useState, useEffect } from "react";
import axios from "axios";
import OriginalsCard from "../../components/originals/OriginalsCard";
import { IMG_PATH } from "../../components/action/ActionCard";
import YouTube from "react-youtube";

export const API_URL = "https://api.themoviedb.org/3";
export const Movie_Key = "43db337aa558a7e503eada6e85ff443b";
export const IMG_PATH_Original = "https://image.tmdb.org/t/p/original";

export const requests = {
  fetchTrending: `${API_URL}/trending/all/week?api_key=${Movie_Key}&language=en-US`,
  fetchNetflixOriginals: `${API_URL}/discover/movie?api_key=${Movie_Key}&language=en-US`,
  fetchTopRated: `${API_URL}/movie/top_rated?api_key=${Movie_Key}&language=en-US`,
  fetchActionMovies: `${API_URL}/discover/movie?api_key=${Movie_Key}&with_genres=28`,
  fetchComedyMovies: `${API_URL}/discover/movie?api_key=${Movie_Key}&with_genres=35`,
  fetchHorrorMovies: `${API_URL}/discover/movie?api_key=${Movie_Key}&with_genres=27`,
  fetchRomanceMovies: `${API_URL}/discover/movie?api_key=${Movie_Key}&with_genres=10749`,
  fetchDocumentaries: `${API_URL}/discover/movie?api_key=${Movie_Key}&with_genres=99`,
  fetchSearchs: `${API_URL}/search/movie?api_key=${Movie_Key}&language=en-US`,
  fetchMovies: `${API_URL}/discover/movie?api_key=${Movie_Key}&language=en-US`,
};

const MovieList = () => {
  // Get API from MovieList
  const [originals, setOriginals] = useState([]);
  // Get Data for click to play video
  const [selectedMovie, setSelectedMovie] = useState({});

  //  Show or hide Trailer
  const [showTrailer, setShowTrailer] = useState(false);

  //
  const getOriginals = async () => {
    const {
      data: { results },
    } = await axios.get(`${requests.fetchNetflixOriginals}`);

    // console.log(results);

    setOriginals(results);
    await clickeMovie(results[Math.floor(Math.random() * results.length - 1)]);
  };

  // Get movie
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

  //

  // Get data when click to movie
  const clickeMovie = async (movie) => {
    setShowTrailer(false);
    const data = await getMovie(movie.id);

    setSelectedMovie(data);
  };

  //
  useEffect(() => {
    getOriginals();
  }, []);

  // Render Data of Originals
  const renderOriginals = () =>
    originals.map((original) => (
      <OriginalsCard
        key={original.id}
        original={original}
        clickeMovie={clickeMovie}
      />
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

  const reloadPage = () => {
    window.location.reload(false);
  };

  //

  return (
    <div className="original-movies">
      <div
        className="play-videos"
        style={{
          backgroundImage: `url('${IMG_PATH_Original}${selectedMovie.backdrop_path}')`,
        }}
      >
        {selectedMovie.videos && showTrailer ? renderTrailer() : null}
        <div className="play-content max-width">
          <button className="play-btn btn" onClick={() => setShowTrailer(true)}>
            Play
          </button>
          <button className="play-btn btn" onClick={reloadPage}>
            MyList
          </button>
          <h1>{selectedMovie.title}</h1>
          {selectedMovie.overview ? <h2>{selectedMovie.overview}</h2> : null}
        </div>
      </div>

      <div
        className="originals max-width original-hidden"
        // onClick={() => setShowTrailer(!showTrailer)}
      >
        {renderOriginals()}
      </div>
    </div>
  );
};

export default MovieList;
