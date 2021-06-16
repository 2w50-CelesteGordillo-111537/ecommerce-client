import React from "react";
import { Tab } from "semantic-ui-react";
import InfoArtwork from "../InfoArtwork";

export default function TabsArtwork(props) {
  const { artwork } = props;

  const panes = [
    {
      menuItem: "Información",
      render: () => (
        <Tab.Pane>
          <InfoArtwork artwork={artwork} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tabs-artwork" panes={panes} />;
}
