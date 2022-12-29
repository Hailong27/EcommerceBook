import { React, useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import {
  Truck,
  BoxArrowRight,
} from "react-bootstrap-icons";

export default function HeaderAd() {
  const { totalUniqueItems } = useCart();
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);
  const Logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    window.location.href="/"
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
            <Link className="navbar-brand" to="/admin">
              Book Store
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav-brand mx-auto">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {username ? (
                    <Link
                      className="nav-link btn btn-outline-primary mx-2"
                      to="/admin/orders"
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
