import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, forEach } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import ListArtworks from "../components/ListArtworks";

export default function wishlist() {
  const [artwork, setArtwork] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const artworksList = [];
        forEach(response, (data) => {
          artworksList.push(data.artwork);
        });
        setArtwork(artworksList);
      } else {
        setArtwork([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>

        <div className="data">
          {!artwork && <Loader active>Cargando obras</Loader>}
          {artwork && size(artwork) === 0 && (
            <div className="data__not-found">
              <h3>No tienes ninguna obra en tu lista</h3>
            </div>
          )}
          {size(artwork) > 0 && <ListArtworks artwork={artwork} />}
        </div>
      </div>
    </BasicLayout>
  );
}
