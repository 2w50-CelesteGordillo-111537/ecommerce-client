import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import {
  getArtworksPlattformApi,
  getTotalArtworksPlatformApi,
} from "../../api/artwork";
import ListArtworks from "../../components/ListArtworks";
import Pagination from "../../components/Pagination";

const limitPerPage = 20;

export default function Platform() {
  const { query } = useRouter();
  const [artwork, setArtwork] = useState(null);
  const [totalArtworks, setTotalArtworks] = useState(null);

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else return currentPages * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getArtworksPlattformApi(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setArtwork(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalArtworksPlatformApi(query.platform);
      setTotalArtworks(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!artwork && <Loader active>Cargando obras</Loader>}
      {artwork && size(artwork) === 0 && (
        <div>
          <h3>No hay obras</h3>
        </div>
      )}
      {size(artwork) > 0 && <ListArtworks artwork={artwork} />}
      {totalArtworks ? (
        <Pagination
          totalArtworks={totalArtworks}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
