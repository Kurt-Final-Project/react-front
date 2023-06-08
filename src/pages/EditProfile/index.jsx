import React from "react";
import { useSubmit } from "react-router-dom";
import { Formik, Form } from "formik";
import { MdError } from "react-icons/md";
import Input from "../../components/Input";

import classes from "../EditProfile/EditProfile.module.css";

const EditProfile = () => {
	const submit = useSubmit();

	return (
		<div className={classes.containerEdit}>
			<Formik
				initialValues={{ firstname: "", lastname: "", username: "", date: "" }}
				validate={(values) => {
					const errors = {};
					if (!values.username) {
						errors.username = (
							<i className={classes.errorText}>
								<MdError />
								Required
							</i>
						);
					}

					if (!values.date) {
						errors.date = (
							<i className={classes.errorText}>
								<MdError />
								Required
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
							<h1 classes={classes.headingText}>Account Details</h1>
						</div>

						<div className={classes.fieldName}>
							<Input type="text" name="firstname" placeholder="First Name" isInvalidField={errors.firstname && touched.firstname} />
							<Input type="text" name="lastname" placeholder="Last Name" isInvalidField={errors.lastname && touched.lastname} />
						</div>

						<div className={classes.fieldName}>
							<Input type="text" name="username" placeholder="Username" isInvalidField={errors.username && touched.username} />
							<Input type="date" name="date" placeholder="Birthday" isInvalidField={errors.date && touched.date} />
						</div>

						<button type="submit" disabled={isSubmitting} className={classes.btnSubmit}>
							Apply Changes
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default EditProfile;
