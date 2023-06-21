export const deleteCommentApi = async ({ token, blog_id, comment_id }) => {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/impression/comment/${blog_id}`, {
		method: "PUT",
		headers: {
			Authorization: "bearer " + token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ comment_id }),
	});
	return res;
};
