import React, { useState, useEffect, useLayoutEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastArtworkApi } from "../api/artwork";
import ListArtworks from "../components/ListArtworks";

export default function Home() {
  const [artwork, setArtwork] = useState(null);
  console.log(artwork);

  useEffect(() => {
    (async () => {
      const response = await getLastArtworkApi(50);
      if (size(response) > 0) setArtwork(response);
      else setArtwork([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {!artwork && <Loader active>Cargando obras de arte</Loader>}
      {artwork && size(artwork) === 0 && (
        <div>
          <h3>No hay obras de arte</h3>
        </div>
      )}
      {size(artwork) > 0 && <ListArtworks artwork={artwork}/>}
    </BasicLayout>
  );
}
