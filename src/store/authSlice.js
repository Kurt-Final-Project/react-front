import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: localStorage.getItem("token") || null };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			const token = action.payload.token;
			localStorage.setItem("token", token);

			return { token };
		},
		logout(state) {
			localStorage.removeItem("token");
			return { token: null };
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
