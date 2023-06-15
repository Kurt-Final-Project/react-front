import { redirect } from "react-router-dom";

const getAuthToken = () => {
	let token = localStorage.getItem("token");
	const expirationDate = localStorage.getItem("expirationDate");

	if (Date.now() > +expirationDate) {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationDate");
		token = null;
	}

	return token;
};

const isAuthenticatedLoader = () => {
	const token = getAuthToken();

	if (!token) {
		return redirect("/login");
	}

	return null;
};

export const isAuthenticated = () => {
	const token = getAuthToken();

	if (token) {
		return redirect("/feed");
	}

	return null;
};

export default isAuthenticatedLoader;
