import React, { useState, useEffect } from "react";
import { Image, Icon, Table } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import { paymentCartApi } from "../../../api/cart";
import { size } from "lodash";
import { useRouter } from "next/router";

export default function SummaryCart(props) {
  const { auth, logout } = useAuth();
  const { products, reloadCart, setReloadCart, address } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductCart } = useCart();

  if(products) {
    localStorage.setItem("PRODUCTS", products);
  }

  const router = useRouter();
  const { status, payment_id } = router.query;

  const { removeAllProductsCart } = useCart();

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, [reloadCart, products]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  console.log("datoooos: ", JSON.parse(localStorage.getItem("TOTAL_PRICE")));

  useEffect(() => {
    if (status === "approved") { 
      const order = {
        idPayment: payment_id,  
        address: localStorage.getItem("ADDRESS"),
        artwork: localStorage.getItem("PRODUCTS"),
        idUser: auth.idUser,
        totalPayment: parseFloat(localStorage.getItem("TOTAL_PRICE")),     
      };

      saveOrder(order);

      removeAllProductsCart(); 
      localStorage.removeItem("ADDRESS");
      localStorage.removeItem("TOTAL_PRICE");
    }
  }, [status]);

  const saveOrder = async (order) => {
    await paymentCartApi(order, logout);
  }

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>

      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image src={product.poster.url} alt={product.title} />
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.platform.title}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>$ {product.price}</Table.Cell>
              </Table.Row>
            ))}

            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear" />
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">
                $ {totalPrice.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
