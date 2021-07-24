import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";

export default function Faq() {
  const [state, setState] = useState({ activeIndex: 0 });

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;

    setState({ activeIndex: newIndex });
  };

  const { activeIndex } = state;

  return (
    <BasicLayout>
      <div className="accordion">
        <Accordion styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
           ¿Cómo creo mi usuario en FridArt?</Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
            Debe hacer click en la sección del Menú donde dice Mi Cuenta, 
            luego se abrirá una ventanita con título Crear nuevo usuario, 
            en la misma debe hacer click en el botón de la izquierda, registrarse.
A continuación, se abrirá una ventana como la siguiente 
en la que deberá completar todos los campos para poder registrarse. 
Por último hacer click en el botón de la derecha Registrar.
            <img src="images/crearUsuario.png" />
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            ¿Cómo funciona el carrito?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
            Primero debes iniciar sesión con tu email y contraseña. 
            Luego selecciona desde la vista general, o de alguna vista por Estilos, la obra que deseas comprar. 
            Haz click sobre sobre la misma y se abrirá una nueva vista de la Obra, con información de la misma, 
            un video y el precio con o sin descuento. A continuación hacer click en el botón comprar como se puede ver 
            en la imagen representativa. Inmediatamente saldrá un cartelito verde que indicará que has añadido una 
            obra al carrito. En el ícono del Carrito que aparece en el menú se sumará un uno a la cantidad de obras que deseas comprar. 
            <img src="images/pagos.png" />
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            ¿Qué medios de pago aceptan?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
            Se aceptan distintos medios de pago. Entre ellos están tarjeta de débito o crédito (mastercard o visa) 
            y efectivo. 
La página está enlazada a Mercado Pago, así que podrás utilizar tu cuenta personal para realizar el pago. 
El mismo se realiza desde la vista de Carrito, luego seleccionar una dirección de envío y luego hacer click 
en el botón celeste Pagar. Inmediatamente se abrirá una ventana como se puede ver a continuación en la que podrá 
elegir las distintas opciones de pago y completar distintos campos para realizar el pago.
            <img src="images/Comprar.png" />
            </p>
          </Accordion.Content>
        </Accordion>
      </div>
    </BasicLayout>
  );
}
