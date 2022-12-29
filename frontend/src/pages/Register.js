import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState("");
  const roles = ["user"];
  function signUpForm(e) {
    e.preventDefault();
    let check = true;
    if (!password) {
      check = false;
      setMessage("Chưa điền password !!!");
    }
    if (!email) {
      check = false;
      setMessage("Chưa điền email !!!");
    }
    if (!username) {
      check = false;
      setMessage("Chưa điền trường username !!!");
    }
    if (check === true) {
      axios({
        method: "post",
        url: "http://localhost:8080/api/auth/signup",
        data: {
          username: username,
          password: password,
          roles: roles,
          email: email,
        },
      })
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:3000/login";
        })
        .catch((error) => {
          setMessage("Đăng ký không thành công !!!!");
        });
    }
  }

  return (
    <>
      <Header />
      <div className="container" style={{ width: "500px", marginTop: "60px" }}>
        <h2 className="text-center my-3">Sign Up</h2>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">
              Username
            </label>
            <input
              type="text"
              id="form2Example1"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">
              Email address
            </label>
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
            type="submit"
            className="btn btn-primary btn-block mb-4 w-100"
            onClick={signUpForm}
          >
            Register
          </button>

          <div className="text-center">
            <p>
              Are you a member? <Link to="/login">Login </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
