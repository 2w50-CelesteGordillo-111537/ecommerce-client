import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchArtworksApi } from "../api/artwork";
import ListArtwork from "../components/ListArtworks";

export default function search() {
  const [artwork, setArtwork] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-artwork").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchArtworksApi(query.query);
        if (size(response) > 0) setArtwork(response);
        else setArtwork([]);
      } else {
        setArtwork([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      {!artwork && <Loader active>Buscando obras</Loader>}
      {artwork && size(artwork) === 0 && (
        <div>
          <h3>No se han encontrado obras</h3>
        </div>
      )}
      {size(artwork) > 0 && <ListArtwork artwork={artwork} />}
    </BasicLayout>
  );
}
