import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";

import { Formik, Form } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import handleUserSubmit from "./api";
import bg from "../../assets/blog-background.svg";
import classes from "./Signup.module.css";

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onUserSubmitHandler = async (...args) => {
		const payload = await handleUserSubmit(...args);
		if (payload?.token) {
			dispatch(authActions.login(payload));
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
					initialValues={{ first_name: "", last_name: "", user_at: "", email: "", password: "", confirmPassword: "" }}
					validate={(values) => {
						const errors = {};

						if (!values.email) {
							errors.email = <ErrorText>Required</ErrorText>;
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = <ErrorText>Invalid email address</ErrorText>;
						}

						if (!values.user_at) {
							errors.user_at = <ErrorText>Required</ErrorText>;
						} else if (!/^[a-zA-Z0-9.\-_]+$/.test(values.user_at)) {
							errors.user_at = <ErrorText>Username must only contain alphanumeric characters and -._</ErrorText>;
						}

						const maxCharacters = 8;
						if (values.password.length < maxCharacters) {
							errors.password = <ErrorText>Password must be at least 8 characters or more</ErrorText>;
						}

						if (!values.confirmPassword) {
							errors.confirmPassword = <ErrorText>Required</ErrorText>;
						} else if (values.password.length >= maxCharacters && values.password !== values.confirmPassword) {
							errors.confirmPassword = <ErrorText>Password does not match</ErrorText>;
						}

						if (!values.first_name) {
							errors.first_name = <ErrorText>Required</ErrorText>;
						}

						if (!/^[a-zA-Z]+$/.test(values.first_name)) {
							errors.first_name = <ErrorText>Name must only contain letters</ErrorText>;
						}

						if (!values.last_name) {
							errors.last_name = <ErrorText>Required</ErrorText>;
						}

						if (!/^[a-zA-Z]+$/.test(values.last_name)) {
							errors.last_name = <ErrorText>Name must only contain letters</ErrorText>;
						}

						return errors;
					}}
					onSubmit={onUserSubmitHandler}
				>
					{({ isSubmitting, errors, touched }) => (
						<Form className={classes.form}>
							<div className={classes.formText}>
								<h1 classes={classes.headingText}>Signup</h1>
								<p className={classes.midText}>Start blogging your journey!</p>
							</div>
							<div className={classes.fieldName}>
								<Input
									type="text"
									name="first_name"
									placeholder="First Name"
									isInvalidField={errors.first_name && touched.first_name}
								/>
								<Input
									type="text"
									name="last_name"
									placeholder="Last Name"
									isInvalidField={errors.last_name && touched.last_name}
								/>
							</div>

							<div className={classes.fieldName}>
								<Input
									type="text"
									name="user_at"
									placeholder="Username"
									isInvalidField={errors.user_at && touched.user_at}
								/>
								<Input type="email" name="email" placeholder="Email" isInvalidField={errors.email && touched.email} />
								<Input
									type="password"
									name="password"
									placeholder="Password"
									isInvalidField={errors.password && touched.password}
								/>

								<Input
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
									isInvalidField={errors.confirmPassword && touched.confirmPassword}
								/>
							</div>

							<Button type="submit" disabled={isSubmitting} className={classes.btnSubmit} btntext={"Submit"} />

							<div className={classes.linkContainer}>
								Already have an account?
								<NavLink to="/login" className={classes.link}>
									Login
								</NavLink>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Signup;
