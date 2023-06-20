export const uploadProfileApi = async ({ token, picture }) => {
	const formData = new FormData();
	formData.append("picture", picture);

	const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/user/profile`, {
		method: "PATCH",
		headers: {
			Authorization: "bearer " + token,
		},
		body: formData,
	});

	return res;
};
