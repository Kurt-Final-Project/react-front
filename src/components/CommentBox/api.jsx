export const postReplyApi = async ({ token, comment, blog_id }) => {
	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/impression/comment`, {
		method: "POST",
		headers: {
			Authorization: "bearer " + token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ comment, blog_id }),
	});

	return res;
};
