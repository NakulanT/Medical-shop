import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();

  const contactInfo = {
    number: "6382426090",
    email: "arashi@gmail.com",
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">⚕ Arashi Medicals</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="whatsapp">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="facebook">Register</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}

            <Tooltip
              label={`📞: ${contactInfo.number}\n \n∼ 📧: ${contactInfo.email}`}
              placement="bottom-start" // You can try different placement values
            >
              <Button colorScheme="pink" variant="ghost" >Help</Button>
            </Tooltip>
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="pink" variant="ghost">
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
