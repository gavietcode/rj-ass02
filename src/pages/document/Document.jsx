import React, { useState, useEffect } from "react";
import axios from "axios";
import DocumentCard from "../../components/document/DocumentCard";
import { IMG_PATH } from "../../components/action/ActionCard";
import YouTube from "react-youtube";
import { API_URL, Movie_Key } from "../movieList/MovieList";
// import { IMG_PATH } from "../movieList/MovieList";
import { requests } from "../movieList/MovieList";

//
const Document = () => {
  // Get API from MovieList
  const [documents, setDocuments] = useState([]);
  // Get Data for click to play video
  const [selectedMovie, setSelectedMovie] = useState({});

  //  Show or hide Trailer
  const [showTrailer, setShowTrailer] = useState(false);

  //
  const getDocument = async () => {
    const {
      data: { results },
    } = await axios.get(`${requests.fetchDocumentaries}`);

    // console.log(results);

    setDocuments(results);
    await clickeMovie(results[0]);
  };

  const getMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: Movie_Key,
        append_to_response: "videos",
        language: "en-Us",
      },
    });
    return data;
  };

  // Get data when click to movie
  const clickeMovie = async (movie) => {
    setShowTrailer(false);
    const data = await getMovie(movie.id);

    setSelectedMovie(data);
  };

  //
  useEffect(() => {
    getDocument();
  }, []);

  // Render Data of topRate
  const renderDocument = () =>
    documents.map((document) => (
      <DocumentCard
        key={document.id}
        document={document}
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

  //

  return (
    <div className="document-movies">
      <h1 className="max-width movie-title">Tài liệu</h1>
      <div
        className="document max-width"
        onClick={() => setShowTrailer(!showTrailer)}
      >
        {renderDocument()}
      </div>
      {showTrailer ? (
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

export default Document;
