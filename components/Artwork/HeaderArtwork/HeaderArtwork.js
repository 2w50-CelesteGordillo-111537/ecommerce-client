import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../api/favorite";

export default function HeaderArtwork(props) {
  const { artwork } = props;
  const { poster, title } = artwork;
  return (
    <Grid className="header-artwork">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info artwork={artwork} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const { artwork } = props;
  const { title, summary, price, discount, url } = artwork;
  const [isFavorite, setIsFavorite] = useState(false);
  const [realoadFavorite, setRealoadFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, artwork.id, logout);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
    setRealoadFavorite(false);
  }, [artwork, realoadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, artwork.id, logout);
      setRealoadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, artwork.id, logout);
      setRealoadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-artwork__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-artwork__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-artwork__buy">
        <div className="header-artwork__buy-price">
          <p>Precio de venta al publico: ${price}</p>
          {!discount ? (
            <div className="header-artwork__buy-price-actions">
              <p>${price}</p>
            </div>
          ) : (
            <div className="header-artwork__buy-price-actions">
              <p>-{discount}% </p>
              <p> ${(price - Math.floor(price * discount) / 100).toFixed(2)}</p>
            </div>
          )}
        </div>
        <Button
          className="header-artwork__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
