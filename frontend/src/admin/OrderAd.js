import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import HeaderAd from "../header/HeaderAd";
export default function Orders() {
  const [status, setStatus] = useState("");
  const [carts, setCarts] = useState("");

  function getStatus(status) {
    switch (status) {
      case "INIT":
        return "Create order";
      case "CONFIRM":
        return "Confirm order";
      case "COMPLETE":
        return "Complete order";
    }
  }

  function updateStatus(idCart, id) {
    let bodyFormData = new FormData();
    bodyFormData.append("status", status);
    axios({
      method: "put",
      url: `http://localhost:8080/api/cart/${idCart}/update/${id}`,
      data: bodyFormData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((data) => {
        alert("Complete update!");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function selectedStatus(e) {
    setStatus(e.target.value);
  }
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/all-orders",
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
      <HeaderAd />
      <div class="container mt-5">
        <div class="card-wrapper container row">
          <div class="col">
            {carts &&
              carts.map((cart) => {
                let orders = cart.orders;
                return orders.map((order) => {
                  return (
                    <div class="card-customer row mt-2">
                      <div class="col-2">
                        <img
                          class="img-product"
                          src={`http://localhost:8080/api/files/${order.book.imageFeatureBooks[0].url}`}
                          alt=""
                        />
                      </div>
                      <div class="col-3 ml-3 pl-0">
                        <div class="row pl-0">
                          <div className="d-flex pl-0">
                            <p className="font-weight-bold">
                              {order.book.title}
                            </p>
                            <span>--</span>
                            <p>{order.book.author}</p>
                          </div>
                        </div>
                        <div class="row text-justify ">
                          {order.book.description}
                        </div>
                      </div>
                      <div class="col-1 ml-2">
                        <p className="text-center font-weight-bold">Quantity</p>
                        <p className="text-center">{order.quantity}</p>
                      </div>
                      <div class="col-2">
                        <p className="font-weight-bold">Status</p>
                        <div>
                          <select
                            class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example"
                            onChange={selectedStatus}
                          >
                            <option value={order.status}>
                              {getStatus(order.status)}
                            </option>
                            {order.status ==
                              "INIT" ? (
                                <>
                                  <option value="CONFIRM">Confirm order</option>
                                  <option value="COMPLETE">
                                    Complete order
                                  </option>
                                </>
                              ) : (<></>)}
                            {order.status ==
                              "CONFIRM" ? (
                                <>
                                  <option value="INIT">Create order</option>
                                  <option value="COMPLETE">
                                    Complete order
                                  </option>
                                </>
                              ) : (<></>)}
                            {order.status ==
                              "COMPLETE" ? (
                                <>
                                  <option value="INIT">Create order</option>
                                  <option value="COMPLETE">
                                    Confirm order
                                  </option>
                                </>
                              ) : (<></>)}
                            {/* <option value="CONFIRM">Confirm order</option>
                            <option value="COMPLETE">Complete order</option> */}
                          </select>
                          <button
                            className="btn btn-success"
                            onClick={() => updateStatus(cart.id, order.id)}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                      <div class="col-2">
                        <p className="font-weight-bold">Info Order</p>
                        <p>
                          <div className="">{cart.name}</div>
                        </p>
                        <p>
                          <div className="">{cart.address}</div>
                        </p>
                        <p>
                          <div className="">{cart.phone}</div>
                        </p>
                      </div>
                      <div class="col">
                        <p className="font-weight-bold">Time Init</p>
                        <p>
                          <div className="">{cart.date}</div>
                        </p>
                      </div>
                      <hr
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
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
