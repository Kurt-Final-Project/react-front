import { redirect } from "react-router-dom";

const getAuthToken = () => {
	const token = localStorage.getItem("token");
	return token;
};

const isAuthenticatedLoader = () => {
	const token = getAuthToken();

	if (!token) {
		return redirect("/");
	}

	return null;
};

export default isAuthenticatedLoader;
