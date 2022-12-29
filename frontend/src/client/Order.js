import { React, useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import "./order.css";

export default function Order() {
  const [user, setUser] = useState("")
  const [carts, setCarts] = useState("");
  const getStatus = (status) => {
    if (status === "INIT") {
      return "Create order";
    } else if (status === "CONFIRM") {
      return "Confirm order";
    } else {
      return "Compelete order";
    }
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/orders",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        setCarts(data.data.data.reverse());
        console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="card-wrapper container row">
          <div className="col">
            {carts &&
              carts.map((cart) => {
                let orders = cart.orders;
                return orders.map((order) => {
                  return (
                    <div className="card-customer row mt-2">
                      <div className="col-2">
                        <img
                          className="img-product"
                          src={`http://localhost:8080/api/files/${order.book.imageFeatureBooks[0].url}`}
                          alt=""
                        />
                      </div>
                      <div className="col-4 ml-3 pl-0">
                        <div className="row text-justify ">
                          Tên sách: {order.book.title}
                        </div>
                        <div className="row text-justify ">
                          Tác giả: {order.book.author}
                        </div>
                        <div className="row text-justify ">
                          Giá bìa: {order.book.price / 1000}.000 (VNĐ)
                        </div>
                        <div className="row text-justify ">
                          Người nhận: {cart.name}
                        </div>
                        <div className="row text-justify ">
                          Địa chỉ: {cart.address}
                        </div>
                        <div className="row text-justify ">
                          Số điện thoại: {cart.phone}
                        </div>
                      </div>
                      <div className="col-1 ml-2">
                        <p className="text-center font-weight-bold">Quantity</p>
                        <p className="text-center">{order.quantity}</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold">Status</p>
                        <p>
                          <div className="btn btn-success">
                            {getStatus(order.status)}
                          </div>
                        </p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold">Initialization time</p>
                        <p>
                          <div className="">{cart.date}</div>
                        </p>
                      </div>
                      <hr style={{width: '100%', margin: '5px 5px'}}/>
                    </div>
                  );
                });
              })}
          </div>
        </div>
      </div>
    </>
  );
}
