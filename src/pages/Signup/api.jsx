import ErrorText from "../../components/ErrorText";
import { toaster } from "../../components/Toaster";

const handleUserSubmit = async (values, { setSubmitting, setFieldError, setFieldTouched }) => {
	setSubmitting(true);

	try {
		const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/user/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});

		const data = await res.json();

		if (res.status === 422) {
			setFieldError(data.field, <ErrorText>{data.message}</ErrorText>);
			setFieldTouched(data.field, true, false);
		} else if (!res.ok) {
			toaster.error(data.message);
			throw data;
		}

		setSubmitting(false);
		return data;
	} catch (err) {
		setSubmitting(false);
		throw err;
	}
};

export default handleUserSubmit;
