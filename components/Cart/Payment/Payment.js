import React, { useState, useEffect, useRef } from "react";
import { checkout } from "../../../api/checkout";
import useCart from "../../../hooks/useCart";

export default function Payment(props) {

  const checkoutForm = useRef(null);

  const { products, address } = props;
  const [paymentReady, setPaymentReady] = useState(false);

  const scrollToCheckout = () => {
    checkoutForm.current.scrollIntoView({ behavior: "smooth" });
  };

  let totalPrice = null;

  const checkoutAsync = async () => {
    products.map((index) => (totalPrice += index.price));

    localStorage.setItem("TOTAL_PRICE", totalPrice);

    var orderData = {
      quantity: "1",
      description: "Obras de arte",
      price: totalPrice,
    };

    const resultId = await checkout(orderData);

    var script = document.createElement("script");

    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = resultId.id;
    setPaymentReady(true);
    document.getElementById("button-checkout").innerHTML = "";
    document.querySelector("#button-checkout").appendChild(script);

    scrollToCheckout();
  };

  useEffect(() => {
    if (address) {
      checkoutAsync();
      console.log(totalPrice);
    }
  }, [address]);

  return (
    <div>
      {paymentReady && (
        <section ref={checkoutForm} className="payment-form dark">
          <div className="container_payment">
            <div className="block-heading">
              <h2>Checkout</h2>
              <p>Ya casi tenes tus obras de arte!</p>
            </div>
            <div className="form-payment">
              <div className="payment-details">
                <div className="form-group col-sm-12">
                  <br />
                  <div id="button-checkout"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
