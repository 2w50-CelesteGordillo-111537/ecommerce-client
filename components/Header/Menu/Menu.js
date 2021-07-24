import React, { useState, useEffect } from "react";
import {
  Container,
  Menu,
  Grid,
  Icon,
  Label,
  Dropdown,
} from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";

const options = [
  { key: 1, text: "Choice 1", value: 1 },
  { key: 2, text: "Choice 2", value: 2 },
  { key: 3, text: "Choice 3", value: 3 },
];

export default function MenuWeb() {
  const [platforms, setPlatforms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Inicia sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getPlatformsApi();
      setPlatforms(response || []);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms platforms={platforms} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatforms(props) {
  const { platforms } = props;

  return (
    <Menu>
      {map(platforms, (platform) => (
        <Link href={`/artworks/${platform.url}`} key={platform._id}>
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  const { productsCart } = useCart();
  //console.log("User: ", user.role.name)
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Favoritos
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          {user.role.name === "Admin" ? (
            <Link href="/reports">
              <Menu.Item as="a">
                <Icon name="chart area" />
              </Menu.Item>
            </Link>
          ) : null}
          <Menu.Item as="a">
            <Dropdown icon="info" button className="icon" floating>
              <Dropdown.Menu>
                <Dropdown.Item href="/faq">FAQ's</Dropdown.Item>
                <Dropdown.Item href="/terms">
                  Términos y condiciones
                </Dropdown.Item>
                <Dropdown.Item href="/contact">Contáctanos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item className="m-0" onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item onClick={onShowModal}>
            <Icon name="user outline" />
            Mi cuenta
          </Menu.Item>
          <Menu.Item as="a">
            <Dropdown icon="info" button className="icon" floating>
              <Dropdown.Menu>
                <Dropdown.Item href="/faq">FAQ's</Dropdown.Item>
                <Dropdown.Item href="/terms">
                  Términos y condiciones
                </Dropdown.Item>
                <Dropdown.Item href="/contact">Contáctanos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
