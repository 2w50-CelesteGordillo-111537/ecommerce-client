import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getArtworkByUrlApi } from "../api/artwork";
import HeaderArtwork from "../components/Artwork/HeaderArtwork";
import TabsArtwork from "../components/Artwork/TabsArtwork";

export default function Artworks() {
  const [artwork, setArtwork] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getArtworkByUrlApi(query.artworks);
      setArtwork(response);
    })();
  }, [query]);

  if (!artwork) return null;

  return (
    <BasicLayout>
      <HeaderArtwork artwork={artwork} />
      <TabsArtwork artwork={artwork} />
    </BasicLayout>
  );
}
