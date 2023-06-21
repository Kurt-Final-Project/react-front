export const getAllBlogsApi = async ({ token, id, page }) => {
	const queryParams = new URLSearchParams({
		page,
	});

	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/blog/user/${id}?${queryParams}`, {
		method: "GET",
		headers: {
			Authorization: "bearer " + token,
		},
	});

	return res;
};

export const getUserProfileApi = async ({ token, id }) => {
	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/user/profile/${id}`, {
		method: "GET",
		headers: {
			Authorization: "bearer " + token,
		},
	});

	return res;
};
