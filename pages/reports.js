import React, { useEffect, useState } from "react";
import { Grid, Header, Container } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { Pie, Line } from "react-chartjs-2";
import { getAllOrders } from "../api/order";
import useAuth from "../hooks/useAuth";
import { size, map } from "lodash";

export default function Reports() {
  const [orders, setOrders] = useState([]);
  const { auth, logout } = useAuth();

  const year = new Date().getFullYear();

  let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let artworksByType = [0, 0, 0, 0];

  useEffect(() => {
    (async () => {
      const response = await getAllOrders();
      setOrders(response || []);
    })();
  }, []);

  console.log(orders);

  if (size(orders) > 0) {
    let month = null;
    for (var i = 1; i < 12; i++) {
      map(orders, (order) => {
        month = new Date(Date.parse(order.created_at)).getMonth();
        if (month === i) {
          months[i]++;
        }
      });
    }

    for (var j = 0; j < size(orders); j++) {
      let order = JSON.parse(orders[j].artwork);
      let platform = order[0].platform.title;
      switch (platform) {
        case "Abstracto":
          artworksByType[0]++;
          break;
        case "Surrealismo":
          artworksByType[1]++;
          break;
        case "Realismo":
          artworksByType[2]++;
          break;
        case "Pop":
          artworksByType[3]++;
          break;
        default:
          break;
      }
    }
    console.log("artworks by type: ", artworksByType);
  }

  const data = {
    labels: ["Abstracto", "Surrealismo", "Realismo", "PopArt"],
    datasets: [
      {
        label: "# of Votes",
        data: artworksByType,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(255, 99, 71, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 71, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataLine = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ventas",
        data: months,
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <BasicLayout>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column className="selssTitle">
          </Grid.Column>
          <Grid.Column>
          <h3>Obras más compradas</h3>
            <Pie data={data} width={100} height={100} />
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container>
        <div className="selssTitle">
          <h3>Ventas en el año</h3>
        </div>
        <Line data={dataLine} options={options} />
      </Container>
    </BasicLayout>
  );
}
