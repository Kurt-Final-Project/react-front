import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { useSubmit, NavLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { MdError } from "react-icons/md";

import bg from "../../assets/blog-background.svg";
import classes from "./Signup.module.css";

const Signup = () => {
	const submit = useSubmit();

	return (
		<div className={classes.container}>
			<div className={classes.child}>
				<img className={classes.backgroundImage} src={bg} alt="background" />
			</div>

			<div className={classes.child}>
				<Formik
					initialValues={{ firstname: "", lastname: "", username: "", email: "", password: "" }}
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

						if (values.password < 8) {
							errors.password = (
								<i className={classes.errorText}>
									<MdError />
									Password must be at least 8 characters or more
								</i>
							);
						}

						if (!values.firstname) {
							errors.firstname = (
								<i className={classes.errorText}>
									<MdError />
									Required
								</i>
							);
						}

						if (!values.lastname) {
							errors.lastname = (
								<i className={classes.errorText}>
									<MdError />
									Required
								</i>
							);
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							submit(values, {
								method: "POST",
								action: "",
							});

							setSubmitting(false);
						}, 400);
					}}
				>
					{({ isSubmitting, errors, touched }) => (
						<Form className={classes.form}>
							<div className={classes.formText}>
								<h1 classes={classes.headingText}>Signup</h1>
								<p className={classes.midText}>Start blogging your journey!</p>
							</div>
							<div className={classes.fieldName}>
								<Input type="text" name="firstname" placeholder="First Name" isInvalidField={errors.firstname && touched.firstname} />
								<Input type="text" name="lastname" placeholder="Last Name" isInvalidField={errors.lastname && touched.lastname} />
							</div>

							<div className={classes.fieldName}>
								<Input type="email" name="email" placeholder="Email" isInvalidField={errors.email && touched.email} />
								<Input type="password" name="password" placeholder="Password" isInvalidField={errors.password && touched.password} />
							</div>

							<Button type="submit" disabled={isSubmitting} className={classes.btnSubmit} btnText={"Submit"} />

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
