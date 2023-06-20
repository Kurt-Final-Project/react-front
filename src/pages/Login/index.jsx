import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";

import { Formik, Form } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import handleUserSubmit from "./api";
import bg from "../../assets/blog-bg.svg";
import classes from "./Login.module.css";

const Login = () => {
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
					initialValues={{ email: "", password: "" }}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = <ErrorText>Required</ErrorText>;
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = <ErrorText>Invalid email address</ErrorText>;
						}

						if (!values.password) {
							errors.password = <ErrorText>Required</ErrorText>;
						}

						return errors;
					}}
					onSubmit={onUserSubmitHandler}
				>
					{({ isSubmitting, errors, touched }) => (
						<Form className={classes.form}>
							<div className={classes.formText}>
								<h1 classes={classes.headingText}>Login</h1>
								<p className={classes.midText}>Start blogging your journey!</p>
							</div>

							<div className={classes.fieldName}>
								<Input type="email" name="email" placeholder="Email" isInvalidField={errors.email && touched.email} />
								<Input
									type="password"
									name="password"
									placeholder="Password"
									isInvalidField={errors.password && touched.password}
								/>
							</div>

							<Button type="submit" disabled={isSubmitting} className={classes.btnSubmit} btntext={"Submit"} />

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
