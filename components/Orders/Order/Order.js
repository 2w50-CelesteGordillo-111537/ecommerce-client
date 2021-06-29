import React, { useState, useEffect } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";

export default function Order(props) {
  const { order } = props;
  const { artwork, totalPayment, created_at, address } = order;


  const url = JSON.parse(artwork)[0].url;
  const poster = JSON.parse(artwork)[0].poster;
  const title = JSON.parse(artwork)[0].title;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster && poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p> $ {totalPayment}</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(created_at).format("L")} - {moment(created_at).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        address={address}
        title={title}
      />
    </>
  );
}

function AddressModal(props) {
  const { showModal, setShowModal, address, title } = props;

  const parsedAddress = JSON.parse(address);

  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente dirección:</h3>
      <div>
        <p>{parsedAddress.name}</p>
        <p>{parsedAddress.address}</p>
        <p>
          {parsedAddress.state}, {parsedAddress.city}{" "}
          {parsedAddress.postalCode}
        </p>
        <p>{parsedAddress.phone}</p>
      </div>
    </BasicModal>
  );
}
