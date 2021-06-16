import React from 'react';
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import { 
    breakpointUpSm, 
    breakpointUpMd, 
    breakpointUpLg } 
    from "../../utils/breakpoint";

export default function ListArtworks(props) {
    const { artwork } = props; 
    const { width } = useWindowSize();
    
    const getColumnsRender = () => {
        switch (true) {
          case width > breakpointUpLg:
            return 5;
          case width > breakpointUpMd:
            return 3;
          case width > breakpointUpSm:
            return 2;
          default:
            return 1;
        }
      };

    return (
        <div className="list-artworks">
        <Grid>
            <Grid.Row columns={getColumnsRender()}>
                {map(artwork, (artwork) => (
             <Artwork artwork={artwork} />
                 ))}
            </Grid.Row>
      </Grid>  
        </div>
    )
}

function Artwork(props) {
    const { artwork } = props;
  
    return (
        
      <Grid.Column className="list-artworks__artwork">
        <Link href={`/${artwork.url}`}>
          <a>
            <div className="list-artworks__artwork-poster">
              <Image src={artwork.poster.url} alt={artwork.title} />
              <div className="list-artworks__artwork-poster-info">
                {artwork.discount ? (
                  <span className="discount">-${artwork.discount}</span>
                ) : (
                  <span />
                )}
                <span className="price">${artwork.price}</span>
              </div>
            </div>
            <h2>{artwork.title}</h2>
          </a>
        </Link>
      </Grid.Column>
    );
  }