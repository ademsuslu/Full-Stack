import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// getUser from localStorage
const user = JSON.parse(localStorage.getItem("user")); //login olmus user varmı kontrol edıyoruz

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User
const REGURL = "http://localhost:5000/api/users/";

// REGİSTER
const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await axios.post(REGURL + "register", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return REGURL.rejectWithValue(message);
  }
});
// LOGOUT
const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});
//  Login
const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(REGURL + "login", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return REGURL.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // loogut
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;
export { register, login, logout };
export default authSlice.reducer;
