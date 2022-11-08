import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password do not match!");
    } else {
      const formData = {
        name,
        email,
        password,
      };
      dispatch(register(formData));
    }
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
          <FaUser /> Register
        </h1>
        <p>please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              onChange={onChange}
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              type="text"
            />
          </div>

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
            <input
              onChange={onChange}
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              type="text"
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
