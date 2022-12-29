import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState("");
  const [message, setMessage] = useState("");
  function loginForm(e) {
    e.preventDefault();
    let check = true;
    if (!password) {
      check = false;
      setMessage("Chưa điền password !!!");
    }
    if (!username) {
      check = false;
      setMessage("Chưa điền trường username !!!");
    }
    if (check === true) {
      axios({
        method: "post",
        url: "http://localhost:8080/api/auth/signin",
        data: {
          username: username,
          password: password,
        },
      }).then(
        (response) => {
          setJwt(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("role", response.data.roles[0]);
          if (response.data.roles[0] === "ROLE_USER")
            window.location.href = "http://localhost:3000/";
          else window.location.href = "http://localhost:3000/admin";
        },
        (error) => {
          setMessage("Tài khoản hoặc mật khẩu không chính xác !!!");
        }
      );
    }
  }

  return (
    <>
      <Header />
      <div className="container" style={{ width: "500px", marginTop: "60px" }}>
        <h2 className="text-center my-3">Login</h2>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">
              Username
            </label>
            <input
              type="text"
              id="form2Example1"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example2">
              Password
            </label>
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <small id="emailHelp" class="form-text text-muted">
              {message}
            </small>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-block mb-4 w-100"
            onClick={loginForm}
          >
            Sign in
          </button>
          <div className="text-center">
            <p className="text">
              Not a member? <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
