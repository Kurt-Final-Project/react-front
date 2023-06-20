export const getImpressionsApi = async ({ token, body }) => {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/impression/like`, {
		method: "POST",
		headers: {
			Authorization: "bearer " + token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	return res;
};
