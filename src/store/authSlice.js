import { createSlice } from "@reduxjs/toolkit";
import decodeToken from "jwt-decode";

const initialState = {
	token: localStorage.getItem("token") || null,
	expirationDate: localStorage.getItem("expirationDate") || null,
	user: localStorage.getItem("user") || "",
	profile_picture_url: localStorage.getItem("profile_picture_url") || null,
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
			state.profile_picture_url = decoded.profile_picture_url;

			localStorage.setItem("user", state.user);
			localStorage.setItem("profile_picture_url", state.profile_picture_url);

			state.token = token;
			state.expirationDate = expirationDate;
		},
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("expirationDate");
			localStorage.removeItem("user");
			localStorage.removeItem("profile_picture_url");
		},
		changeProfile(state, action) {
			const { profile_picture_url } = action.payload;
			localStorage.setItem("profile_picture_url", profile_picture_url);
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
