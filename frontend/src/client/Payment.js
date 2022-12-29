import { React, useState } from "react";
import { useCart } from "react-use-cart";
import Header from "../header/Header";
import axios from "axios";

export default function Payment() {
  const { items, cartTotal, clearCartMetadata} = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");

  const handleClick = () => {
    if (!name || !address || !phone) {
      return setErr("Vui lòng điền đủ thông tin");
    } else if (name && address && phone) {
      addToCart();
      alert("Bạn đã đặt hàng thành công");
      window.location.href = "http://localhost:3000/orders";
      clearCartMetadata();
    }
  };
  function linkImg(name) {
    let url = "http://localhost:8080/api/files/" + name;
    return url;
  }
  function addToCart() {
    let ids = [];
    let quantities = [];
    for (var i = 0; i < items.length; i++) {
      ids.push(items[i].id);
      quantities.push(items[i].quantity);
    }
    axios({
      method: "post",
      url: "http://localhost:8080/api/cart/add",
      data: {
        id: ids.join(" "),
        quantity: quantities.join(" "),
        name: name,
        address: address,
        phone: phone,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {})
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Header />
      <section className="py-4 container" style={{ marginTop: "60px" }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <table className="table table-light table-hover m-0">
              <tbody className="ms-auto">
                <tr style={{ fontSize: "20px", textAlign: "center" }}>
                  <td>Products</td>
                  <td>Delivery Info</td>
                  <td>Total Price</td>
                </tr>
                <tr
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <td>
                    {items.map((item) => {
                      return (
                        <>
                          <div>
                            <p>
                              <img
                                src={linkImg(item.imageFeatureBooks[0].url)}
                                style={{
                                  height: "5rem",
                                  marginRight: "10px",
                                }}
                              />
                              {item.title}
                            </p>
                            <p>
                              {item.price / 1000}.000 x {item.quantity} ={" "}
                              {(item.price * item.quantity) / 1000}.000 VNĐ
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </td>
                  <td>{cartTotal / 1000}.000 VNĐ</td>
                  <td>
                    <form
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div className="form-outline mb-4">
                        <label className="form-label ml-2">
                          Tên người nhận
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setName(e.target.value);
                            setErr("");
                          }}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label ml-2">
                          Địa chỉ giao hàng
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAddress(e.target.value);
                            setErr("");
                          }}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label ml-2">Số điện thoại</label>
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setErr("");
                          }}
                        />
                      </div>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <p style={{ textAlign: "end", marginRight: "40px" }}>{err}</p>
              <div
                className="mt-3"
                style={{ textAlign: "end", marginRight: "40px" }}
              >
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "25px" }}
                  onClick={handleClick}
                >
                  Pay now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
