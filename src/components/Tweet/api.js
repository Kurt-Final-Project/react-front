export const postCommentApi = async ({ token, description }) => {
	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/blog`, {
		method: "POST",
		headers: {
			Authorization: "bearer " + token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ description }),
	});

	return res;
};
