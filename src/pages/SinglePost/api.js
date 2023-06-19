export const getSingleBlogApi = async ({ token, id }) => {
	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/blog/${id}`, {
		method: "GET",
		headers: {
			Authorization: "bearer " + token,
		},
	});

	return res;
};

export const getAllCommentsApi = async ({ token, id }) => {
	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/impression/comment/${id}`, {
		method: "GET",
		headers: {
			Authorization: "bearer " + token,
		},
	});

	return res;
};
