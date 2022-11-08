import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button onClick={handleLogout} className="btn" to="/login">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            {" "}
            <li>
              <Link to="/">
                <FaSignInAlt />
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FaSignOutAlt /> Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
