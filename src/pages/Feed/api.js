export const fetchAllBlogsApi = async ({ token, page }) => {
	const queryParams = new URLSearchParams({
		page,
	});

	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/blog?${queryParams}`, {
		method: "GET",
		headers: {
			Authorization: "bearer " + token,
		},
	});
	return res;
};
