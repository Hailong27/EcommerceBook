import { React, useEffect, useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import "./BookDetail.css";
import Header from "../header/Header";

export default function BookDetail() {
  const [book, setBook] = useState("");
  const [ratings, setRatings] = useState("");
  const [comment, setComment] = useState(null);
  const [star, setStar] = useState(null);
  const [img, setImg] = useState("");
  const [err, setErr] = useState("");
  const { id } = useParams();
  const { addItem } = useCart();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/book/" + id)
      .then((data) => {
        setBook(data.data.data);
        setImg(
          `http://localhost:8080/api/files/${data.data.data.imageFeatureBooks[0].url}`
        );
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8080/api/book/${id}/comments`)
      .then((data) => {
        setRatings(data.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRating = (rating) => {
    let res = "";

    for (let i = 1; i <= parseInt(rating.star); i++) {
      res += "<span className='fa fa-star checked'></span>";
    }
    for (let i = parseInt(rating.star) + 1; i <= 5; i++) {
      res += "<span className='fa fa-star'></span>";
    }
    return res;
  };

  function chooseStar(e) {
    var x = parseFloat(e.target.dataset.star);
    var liStars = document.getElementsByClassName("star");
    for (let item of liStars) {
      if (item.classList.contains("selected"))
        item.classList.remove("selected");
    }
    for (let item of liStars) {
      if (parseFloat(item.dataset.star) <= x) item.classList.add("selected");
    }
    setStar(x);
  }

  const submitForm = (e) => {
    e.preventDefault();
    let check = true;

    if (!comment) {
      setErr("Bạn chưa đưa ra nhận xét !!!");
      check = false;
    }
    if (!star) {
      setErr("Bạn chưa đưa ra đánh giá !!!");
      check = false;
    }
    if (check === true) {
      let bodyFormData = new FormData();
      bodyFormData.append("comment", comment);
      bodyFormData.append("star", star);
      axios({
        method: "post",
        url: `http://localhost:8080/api/book/${id}/comments`,
        data: bodyFormData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log(response);
          window.location.href = `http://localhost:3000/book/${id}`;
        })
        .catch((err) => console.log(err));
    }
  };
  const starBook = () => {
    let sum = 0;
    ratings.map((rating) => {
      sum += parseInt(rating.star);
    });
    return (sum / ratings.length).toFixed();
  };

  const handleStar = (ratings) => {
    let sum = 0;
    ratings.map((rating) => {
      sum += parseInt(rating.star);
    });
    sum = (sum / ratings.length).toFixed();
    let res = "";

    for (let i = 1; i <= sum; i++) {
      res += "<span className='fa fa-star checked'></span>";
    }
    for (let i = sum + 1; i <= 5; i++) {
      res += "<span className='fa fa-star'></span>";
    }
    return res;
  };

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="row">
          <div className="col-6">
            <img src={img} width={400} height={500} />
          </div>
          <div className="col-md-6">
            <h1>{book.title}</h1>
            <hr />
            <h2>{book.price / 1000}.000 VNĐ</h2>
            <p>Tác giả: {book.author}</p>
            <div className="info-part row">
              <div className="d-flex">
                <div className="rating ">
                  {ratings.length === 0 ? (
                    <>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </>
                  ) : (
                    <div className="rating">{parse(handleStar(ratings))}</div>
                  )}
                </div>
                <div className="qlt ml-3">{ratings.length} đánh giá</div>
              </div>
            </div>
            <p>Ngày xuất bản: {book.dateRelease}</p>
            <p>Số trang: {book.totalPage} trang</p>
            <p style={{ textAlign: "justify" }}>{book.description}</p>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                addItem(book);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-5 ml-1">
        <div className="col">
          <div className="row">
            <div className="alert alert-primary">Review History</div>
          </div>
          {ratings &&
            ratings.map((rating) => {
              return (
                <div className="row mt-2">
                  <div className="col">
                    <div className="row">
                      <div className="d-flex pl-0">
                        <div className="col-1 pl-0">{rating.user.username}</div>
                        <div className="rating">
                          {parse(handleRating(rating))}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-0 pb-0">
                      <div className="col-6 pl-0 pt-0 pb-0">
                        {rating.comment}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="row pl-0 mt-3">
            <div className="alert alert-warning">Comment Section</div>
            <div>{err}</div>
            <form id="usrform" className="pl-0">
              <ul className="ratings">
                <li className="star" onClick={chooseStar} data-star="5"></li>
                <li className="star" onClick={chooseStar} data-star="4"></li>
                <li className="star" onClick={chooseStar} data-star="3"></li>
                <li className="star" onClick={chooseStar} data-star="2"></li>
                <li className="star" onClick={chooseStar} data-star="1"></li>
              </ul>
              <textarea
                rows="4"
                cols="70"
                name="comment"
                form="usrform"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <br></br>
              <button className="btn btn-success" onClick={submitForm}>
                Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
