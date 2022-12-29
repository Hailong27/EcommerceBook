import { useState } from "react";
import axios from "axios";
import HeaderAd from "../header/HeaderAd";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [dateRelease, setDateRealse] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [price, setPrice] = useState("");
  const [typeBook, setTypeBook] = useState("");
  const [files, setFiles] = useState("");
  const [img, setImg] = useState("");
  const [err, setErr] = useState("");
  function previewFiles(e) {
    setFiles(e.target.files);
    setImg(URL.createObjectURL(e.target.files[0]));
  }
  function submitForm(e) {
    let check = true;
    if (!files) {
      check = false;
      setErr("Chưa điền upload ảnh !!!");
    }
    if (typeBook==null) {
      check = false;
      setErr("Chưa chọn thể loại sách !!!");
    }
    if (!price) {
      check = false;
      setErr("Chưa điền trường giá sách !!!");
    }
    if (!dateRelease) {
      check = false;
      setErr("Chưa điền trường ngày ra mắt !!!");
    }
    if (!description) {
      check = false;
      setErr("Chưa điền trường mô tả !!!");
    }
    if (!author) {
      check = false;
      setErr("Chưa điền trường tác giả !!!");
    }
    if (!title) {
      check = false;
      setErr("Chưa điền trường tiêu đề !!!");
    }
    e.preventDefault();
    let bodyFormData = new FormData();
    if (check === true) {
      bodyFormData.append("title", title);
      bodyFormData.append("author", author);
      bodyFormData.append("description", description);
      bodyFormData.append("dateRelease", dateRelease);
      bodyFormData.append("totalPage", totalPage);
      bodyFormData.append("price", price);
      bodyFormData.append("typeBook", typeBook);
      for (let i = 0; i < files.length; i++) {
        bodyFormData.append("files", files[i]);
      }

      console.log(bodyFormData.entries, files);
      axios({
        method: "post",
        url: "http://localhost:8080/api/book/insert",
        data: bodyFormData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:3000/admin";
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div>
      <HeaderAd/>
      <div className="wrapper-tpl" style={{marginTop: '80px'}}>
        <div className="container mt-5">
          <div className="title">
            <h3> Add book</h3>
          </div>
          <div className="err">{err}</div>
          <form className="mt-5">
            <div className="wrapper row">
              <div className="left col-6">
                <div className="row d-flex justify-content-between">
                  <div className="col-5">
                    <label for="exampleInputEmail1">Title</label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="col-5">
                    <label for="exampleInputEmail1">Author</label>
                    <input
                      onChange={(e) => setAuthor(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter title"
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <label for="validationTextarea">Description</label>
                    <textarea
                      className="form-control is-invalid"
                      id="validationTextarea"
                      placeholder="Required description"
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      rows="10"
                    ></textarea>
                  </div>
                </div>
                <div className="row d-flex justify-content-between mt-2">
                  <div className="col-5">
                    <label for="exampleInputPassword1">Date release</label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder=""
                      onChange={(e) => setDateRealse(e.target.value)}
                    />
                  </div>
                  <div className="col-5">
                    <label for="exampleInputPassword1">Total page</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Total page"
                      onChange={(e) => setTotalPage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-5">
                    <label for="exampleInputPassword1">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Total page"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label for="exampleInputPassword1">Type of book</label>
                    <select
                      className="custom-select custom-select-lg mb-3"
                      placeholder="Enter type of book"
                      onChange={(e) => setTypeBook(e.target.value)}
                    >
                      <option value="null"></option>
                      <option value="Giải trí">Giải trí</option>
                      <option value="Học Tập">Học tập</option>
                      <option value="Khoa học">Khoa học</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="right col-6">
                <label for="exampleInputPassword1">Upload image</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="validatedCustomFile"
                    multiple
                    onChange={previewFiles}
                    required
                  />
                  <label className="custom-file-label" for="validatedCustomFile">
                    Choose file...
                  </label>
                  <div className="invalid-feedback">
                    Example invalid custom file feedback
                  </div>
                </div>
                <div id="preview">
                  <img src={img} alt="" />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={submitForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
