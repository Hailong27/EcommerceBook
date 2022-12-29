import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./homeadmin.css";
import HeaderAd from "../header/HeaderAd";

export default function BookList({ itemsPerPage }) {
  const [books, setBooks] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    axios
      .get("http://localhost:8080/api/books")
      .then((data) => {
        setBooks(data.data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  function linkImg(post) {
    let url = "http://localhost:8080/api/files/" + post;
    return url;
  }
  function IdDelete(id) {
    setIdDelete(id);
  }
  function deleteBook() {
    if (idDelete != null) {
      axios({
        method: "delete",
        url: "http://localhost:8080/api/book/" + idDelete,
        data: null,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
      setIdDelete(null);
    }
  }

  useEffect(()=>{
    if (role === "ROLE_USER") {
      window.location.href = "http://localhost:3000/";
      alert("Bạn không có quyền truy cập!");
    }
  })
  function Book({ props }) {
    return (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr className="text-center">
            <th scope="col">Index</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Date release</th>
            <th scope="col">Total page</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {props.map((book) => {
            return (
              <tr key={book.id}>
                <th scope="row">
                  <Link
                    to={`book/${book.id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "normal",
                    }}
                  >
                    {book.id}
                  </Link>
                </th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.typeBook}</td>
                <td>
                  <p>{book.description}</p>
                </td>
                <td scope="col">{book.dateRelease}</td>
                <td scope="col">{book.totalPage}</td>
                <td scope="col">{book.price}</td>
                <td scope="col-2">
                  <img
                    className="img-bd"
                    src={linkImg(book.imageFeatureBooks[0].url)}
                    alt=""
                  />
                </td>
                <td scope="col">
                  <Link
                    style={{ display: "inline-block" }}
                    to={`update-book/${book.id}`}
                    className="btn btn-success mr-3"
                  >
                    Modify
                  </Link>
                  <button
                    style={{ display: "inline-block" }}
                    onClick={() => IdDelete(book.id)}
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#exampleModal${book.id}`}
                  >
                    Delete
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal${book.id}`}
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Delete confirm
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          Do you want delete book?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteBook()}
                            data-dismiss="modal"
                            className="btn btn-primary"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <HeaderAd />
      <div className="container">
        <div className="d-flex justify-content-between">
          <h2>List Books</h2>
          <div>
            <Link to="insert-book" className="btn btn-success">
              Add book
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-1">
        <Book props={books} />
      </div>
    </div>
  );
}
