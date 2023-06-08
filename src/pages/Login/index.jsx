import React from "react";
import Input from "../../components/Input";
import { useSubmit, NavLink, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import classes from "./Login.module.css";
import { MdError } from "react-icons/md";
import bg from "../../assets/blog-bg.svg";

const Login = () => {
	// const submit = useSubmit();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onUserSubmit = (values) => {
		const { email, password } = values;

		if (email === "test@test.com" && password === "123") {
			// http post
			const token = "hahahaha";

			dispatch(authActions.login({ token }));
			localStorage.setItem("token", token);

			return navigate("/");
		}
	};

	return (
		<div className={classes.container}>
			<div className={classes.child}>
				<img className={classes.backgroundImage} src={bg} alt="background" />
			</div>

			<div className={classes.child}>
				<Formik
					initialValues={{ email: "", password: "" }}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = (
								<i className={classes.errorText}>
									<MdError />
									Required
								</i>
							);
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = (
								<i className={classes.errorText}>
									<MdError />
									Invalid email address
								</i>
							);
						}

						if (!values.password) {
							errors.password = (
								<i className={classes.errorText}>
									<MdError />
									Required
								</i>
							);
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						onUserSubmit(values);
						setSubmitting(false);
					}}
				>
					{({ isSubmitting, errors, touched }) => (
						<Form className={classes.form}>
							<div className={classes.formText}>
								<h1 classes={classes.headingText}>Login</h1>
								<p className={classes.midText}>Start blogging your journey!</p>
							</div>

							<div className={classes.fieldName}>
								<Input type="email" name="email" placeholder="Email" isInvalidField={errors.email && touched.email} />
								<Input type="password" name="password" placeholder="Password" isInvalidField={errors.password && touched.password} />
							</div>

							<button type="submit" disabled={isSubmitting} className={classes.btnSubmit}>
								Submit
							</button>

							<div className={classes.linkContainer}>
								Dont have an account?
								<NavLink to="/signup" className={classes.link}>
									Signup
								</NavLink>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;

export async function action({ params, request }) {
	// let formData = await request.formData();
	// const email = formData.get("email");
	// const password = formData.get("password");
	// return null;
}
