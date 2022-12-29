import { React, useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import {
  BoxArrowInRight,
  PersonAdd,
  Cart3,
  Truck,
  BoxArrowRight,
} from "react-bootstrap-icons";

export default function Header() {
  const { totalUniqueItems } = useCart();
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const handleToCart = () => {
    window.location.href = "http://localhost:3000/cart";
  };
  return (
    <>
      <div
        className="m-0"
        style={{
          top: "0",
          overflow: "hidden",
          position: "fixed",
          width: "100%",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-light t-0">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Book Store
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav-brand mx-auto">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  {!username ? (
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/login"
                    >
                      <BoxArrowInRight /> Login
                    </Link>
                  ) : (
                    <></>
                  )}
                </li>
                <li className="nav-item mx-2">
                  {!username ? (
                    <Link
                      className="nav-link btn btn-outline-primary"
                      to="/signup"
                    >
                      <PersonAdd /> Register
                    </Link>
                  ) : (
                    <></>
                  )}
                </li>
                <li className="nav-item">
                  {username ? (
                    <Link
                      className="nav-link btn btn-outline-primary mx-2"
                      to="/orders"
                    >
                      <Truck /> Orders
                    </Link>
                  ) : (
                    <></>
                  )}
                </li>
                <li className="nav-item mx-2">
                  {username ? (
                    <button
                      className="nav-link btn btn-outline-primary"
                      onClick={handleToCart}
                    >
                      <Cart3 />({totalUniqueItems})
                    </button>
                  ) : (
                    <></>
                  )}
                </li>
                <li className="nav-item mx-2">
                  {username ? (
                    <button
                      className="nav-link btn btn-outline-primary"
                      onClick={Logout}
                    >
                      <BoxArrowRight /> Logout
                    </button>
                  ) : (
                    <></>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
