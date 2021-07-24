import React from "react";
import { Icon, Grid } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import BasicLayout from "../layouts/BasicLayout";

export default function Contact() {
  const AnyReactComponent = ({ text }) => (
    <Icon name="map marker" color="red" size="big">
      {text}
    </Icon>
  );
  const defaultProps = {
    center: {
      lat: -31.00724515247353,
      lng: -64.07411623128407,
    },
    zoom: 15,
  };

  return (
    <BasicLayout>
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
            <div style={{ height: "50vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyDeU5gaIFxkpLGvbR8Tq9fbP2HPiIwXtLM",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={-31.00724515247353}
                  lng={-64.07411623128407}
                  text="Fridart"
                />
              </GoogleMapReact>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column className="contactText">
            <h1 className="contactTitle">Nuestra Oficina</h1>
            <p><h3>FridArt</h3></p>
            <p>Osvaldo Conterno 2321</p>
            <p>Teléfono: 3525555043</p>
            <p>CP: 5223</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BasicLayout>
  );
}
