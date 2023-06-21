export const getLikesAndCommentsApi = async ({ token, blog_id }) => {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/impression/${blog_id}`, {
		method: "GET",
		headers: {
			Authorization: "bearer " + token,
		},
	});
	return res;
};

export const deleteBlogApi = async ({ token, blog_id }) => {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog/${blog_id}`, {
		method: "DELETE",
		headers: {
			Authorization: "bearer " + token,
		},
	});
	return res;
};
