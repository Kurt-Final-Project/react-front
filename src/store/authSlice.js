import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: localStorage.getItem("token") || null };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			const { token, expirationDate } = action.payload;

			console.log(token, expirationDate);
			localStorage.setItem("token", token);
			localStorage.setItem("expirationDate", expirationDate);

			return { token, expirationDate };
		},
		logout(state) {
			localStorage.removeItem("token");
			localStorage.removeItem("expirationDate");

			return { token: null };
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
