import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getArtworkByUrlApi } from "../api/artwork";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping";
import Payment from "../components/Cart/Payment";

export default function Cart() {
  const router = useRouter();
  const { status } = router.query;

  const { getProductsCart, removeAllProductsCart } = useCart();
  let products = getProductsCart();

  useEffect(() => {
    if (status === "approved") {
      (async () => {
        await removeAllProductsCart();
      })();
    }
  }, [status]);

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}

function FullCart(props) {
  const { products } = props;
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getArtworkByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart
        products={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
      <AddressShipping setAddress={setAddress} />
      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
}
