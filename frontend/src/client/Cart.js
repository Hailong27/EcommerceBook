import { React, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { Trash3 } from "react-bootstrap-icons";
import Header from "../header/Header";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    isEmpty,
    items,
    totalItems,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();
  function linkImg(name) {
    let url = "http://localhost:8080/api/files/" + name;
    return url;
  }
  const handlePay = () => {
    window.location.href="http://localhost:3000/payment"
  }
  if (isEmpty)
    return (
      <>
        <Header />
        <h1 className="text-center" style={{ marginTop: "80px" }}>
          Your Cart is Empty
        </h1>
      </>
    );
  return (
    <>
      <Header />
      <section className="py-4 container" style={{ marginTop: "60px" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <table className="table table-light table-hover m-0">
              <tbody className="ms-auto">
                <tr style={{ fontSize: "20px", textAlign: "center" }}>
                  <td>Image</td>
                  <td>Title</td>
                  <td>Price (VNĐ)</td>
                  <td>Quantity</td>
                </tr>
                {items.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{ textAlign: "center", justifyContent: "center" }}
                    >
                      <td>
                        <img
                          src={linkImg(item.imageFeatureBooks[0].url)}
                          style={{ height: "6rem" }}
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.price / 1000}.000</td>
                      <td>
                        <button
                          className="btn btn-info mx-2"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="btn btn-info mx-2"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="btn btn-info ms-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash3 />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              className="mt-3 "
              style={{ textAlign: "end", marginRight: "40px" }}
            >
              <h3>Total Price: {cartTotal / 1000}.000 VNĐ</h3>
            </div>
            <div
              className="mt-3"
              style={{ textAlign: "end", marginRight: "40px" }}
            >
              <button
                className="btn btn-outline-primary"
                style={{ fontSize: "25px" }}
                onClick={handlePay}
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
