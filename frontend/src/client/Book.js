import React from "react";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";

export default function Book(props) {
  const { addItem } = useCart();
  return (
    <div className="items col-11 col-md-6 col-lg-3 mb-4">
      <div
        className="p-0 h-100 shadow"
        style={{ textAlign: "center", borderRadius: "20px" }}
      >
        <Link className="nav-link" to={`/book/${props.id}`}>
          <img
            src={props.img}
            className="card-img-top img-fluid"
            style={{ height: "300px", pointerEvents: "none" }}
          />
          <div className="card-body" style={{ margin: "10px 10px" }}>
            <h5 className="card-title">{props.title}</h5>
            <h5 className="card-title">{props.price / 1000}.000 VNĐ</h5>
            <p
              className="card-text"
              style={{
                textAlign: "justify",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
              }}
            >
              {props.desc}
            </p>
          </div>
        </Link>
        <button
          className="btn btn-success"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            addItem(props.book);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
