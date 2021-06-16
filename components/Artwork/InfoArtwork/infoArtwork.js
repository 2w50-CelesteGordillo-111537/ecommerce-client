import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es";
import CarouselScreenshots from "../CarouselScreenshots";

export default function InfoArtwork(props) {
  const { artwork } = props;
  return (
    <div className="info-artwork">
      <ReactPlayer
        className="info-artwork__video"
        url={artwork.video}
        controls={true}
      />
      <CarouselScreenshots
        title={artwork.title}
        screenshots={artwork.screenshots}
      />
      <div className="info-artwork__content">
        <div dangerouslySetInnerHTML={{ __html: artwork.summary }} />

        <div className="info-artwork__content-date">
          <h4>Fecha de creación:</h4>
          <p>{moment(artwork.releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
