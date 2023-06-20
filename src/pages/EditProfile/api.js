export const getUserDetailsApi = async ({ token, user_at }) => {
	const queryParams = new URLSearchParams({
		own: true,
	});

	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/user/profile/${user_at}?${queryParams}`, {
		method: "GET",
		headers: {
			Authorization: "bearer " + token,
		},
	});

	return res;
};

export const updateUserDetailsApi = async ({ token, values }) => {
	const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/user/profile", {
		method: "PUT",
		headers: {
			Authorization: "bearer " + token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});

	return res;
};
