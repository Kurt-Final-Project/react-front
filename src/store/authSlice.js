import { createSlice } from "@reduxjs/toolkit";
import decodeToken from "jwt-decode";

const initialState = {
	token: localStorage.getItem("token") || null,
	expirationDate: localStorage.getItem("expirationDate") || null,
	user: localStorage.getItem("user") || "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			const { token, expirationDate } = action.payload;

			localStorage.setItem("token", token);
			localStorage.setItem("expirationDate", expirationDate);

			const decoded = decodeToken(token);
			state.user = decoded.user_id;
			state.user_at = decoded.user_at;
			localStorage.setItem("user", state.user);

			state.token = token;
			state.expirationDate = expirationDate;
		},
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("expirationDate");
			localStorage.removeItem("user");
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
