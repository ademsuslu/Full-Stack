import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    dispatch(login(formData));
  };
  useEffect(() => {
    isError && toast.error(message);
    isSuccess && user && navigate("/");
    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

  isLoading && <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start getting start goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              onChange={onChange}
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              type="email"
            />
          </div>

          <div className="form-group">
            <input
              onChange={onChange}
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              type="password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
