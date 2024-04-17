import React from "react";
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const DocumentCard = ({ document, clickeMovie }) => {
  return (
    <div className="document-card card" onClick={() => clickeMovie(document)}>
      {document.backdrop_path ? (
        <img
          className="imgWidth document-img"
          src={`${IMG_PATH}${document.backdrop_path}`}
          alt="DocumentIMG"
        />
      ) : (
        <div className="no-imgWidth">No IMG Found</div>
      )}
    </div>
  );
};

export default DocumentCard;
