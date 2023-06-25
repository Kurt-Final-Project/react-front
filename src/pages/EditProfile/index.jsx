import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Input from "../../components/Input";
import ErrorText from "../../components/ErrorText";
import DataLoaderComponent from "../../utils/DataLoader";
import ProfilePicture from "../../components/ProfilePicture";
import { Loading } from "../../components/Spinner";
import { toaster } from "../../components/Toaster";

import { getUserDetailsApi, updateUserDetailsApi, updateUserPasswordApi } from "./api";
import classes from "../EditProfile/EditProfile.module.css";
import Button from "../../components/Button";

const EditProfile = () => {
	const { token, user: user_id } = useSelector((state) => state.auth);
	const [userDetails, setUserDetails] = useState(null);
	const [isUserLoading, setIsUserLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const getUserProfile = useCallback(async () => {
		setIsUserLoading(true);
		try {
			const res = await getUserDetailsApi({ token, user_id });
			const data = await res.json();

			if (!res.ok) {
				throw data.message;
			}

			setUserDetails(data.user);
			setIsUserLoading(false);
		} catch (err) {
			setIsUserLoading(false);
			console.log("An error occured.", err);
		}
	}, [token, user_id]);

	const updateUserDetails = async (values, { setSubmitting, setFieldError, setFieldTouched }) => {
		try {
			const res = await updateUserDetailsApi({ token, values });
			const data = await res.json();

			if (res.status === 422) {
				setFieldError(data.field, <ErrorText>{data.message}</ErrorText>);
				setFieldTouched(data.field, true, false);
				toaster.error(data.message);
				throw data;
			} else if (res.status === 403) {
				setFieldError("user_at", <ErrorText>{data.message}</ErrorText>);
				setFieldTouched("user_at", true, false);
				toaster.error(data.message);
				throw data;
			} else if (!res.ok) {
				throw data;
			}

			setSubmitting(false);
			toaster.success(data.message);
			return data;
		} catch (err) {
			setSubmitting(false);
			console.log("An error occured.", err);
		}
	};

	const updateUserPassword = async (values, { setSubmitting, resetForm, setFieldError, setFieldTouched }) => {
		try {
			const res = await updateUserPasswordApi({ token, values });
			const data = await res.json();

			if (res.status === 422) {
				setFieldError(data.field, <ErrorText>{data.message}</ErrorText>);
				setFieldTouched(data.field, true, false);
				toaster.error(data.message);
				throw data;
			} else if (res.status === 403) {
				setFieldError("user_at", <ErrorText>{data.message}</ErrorText>);
				setFieldTouched("user_at", true, false);
				toaster.error(data.message);
				throw data;
			} else if (!res.ok) {
				throw data;
			}

			setSubmitting(false);
			resetForm();
			toaster.success(data.message);
			return data;
		} catch (err) {
			setSubmitting(false);
			console.log("An error occured.", err);
		}
	};

	useEffect(() => {
		getUserProfile();
	}, [getUserProfile]);

	return (
		<div className={classes.containerEdit}>
			<DataLoaderComponent mainDependency={userDetails} loader={<Loading />} isLoading={isUserLoading}>
				{(data) => {
					return (
						<React.Fragment>
							<ProfilePicture src={`${process.env.REACT_APP_BACKEND_URL}/${data.profile_picture_url}`} />

							<Formik
								initialValues={{
									first_name: data.first_name,
									last_name: data.last_name,
									user_at: data.user_at,
									bio: data?.bio,
									birthday: data?.birthday && new Date(data.birthday).toISOString().slice(0, 10),
								}}
								validate={(values) => {
									const errors = {};
									if (!values.user_at) {
										errors.user_at = <ErrorText>Required</ErrorText>;
									}

									if (!values.first_name) {
										errors.first_name = <ErrorText>Required</ErrorText>;
									}

									if (!values.last_name) {
										errors.last_name = <ErrorText>Required</ErrorText>;
									}

									return errors;
								}}
								onSubmit={updateUserDetails}
							>
								{({ isSubmitting, errors, touched }) => (
									<Form className={classes.form}>
										<div className={classes.formText}>
											<h1 classes={classes.headingText}>Account Details</h1>
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

										<Input
											type="text"
											name="user_at"
											placeholder="Username"
											isInvalidField={errors.user_at && touched.user_at}
										/>
										<Input type="text" name="bio" placeholder="Bio" isInvalidField={errors.bio && touched.bio} />
										<div className={classes.birthText}>Birthday</div>
										<Input
											type="date"
											name="birthday"
											max="2016-01-01"
											placeholder="Birthday"
											isInvalidField={errors.birthday && touched.birthday}
										/>

										<Button
											type="submit"
											disabled={isSubmitting}
											className={classes.btnSubmit}
											btntext={"Update Profile"}
										/>
									</Form>
								)}
							</Formik>
						</React.Fragment>
					);
				}}
			</DataLoaderComponent>

			<React.Fragment>
				<Formik
					initialValues={{
						password: "",
						oldPassword: "",
						confirmPassword: "",
					}}
					validate={(values) => {
						const errors = {};
						if (values.password < 8) {
							errors.password = <ErrorText>Password must be at least 8 characters</ErrorText>;
						}

						if (!/^[a-zA-Z0-9!@#.+-^/]*$/i.test(values.password)) {
							errors.password = <ErrorText>Password contains unsupported characters</ErrorText>;
						}

						if (!values.password) {
							errors.password = <ErrorText>Required</ErrorText>;
						}

						if (!values.oldPassword) {
							errors.oldPassword = <ErrorText>Required</ErrorText>;
						}

						if (!values.confirmPassword) {
							errors.confirmPassword = <ErrorText>Required</ErrorText>;
						}

						if (values.password !== values.confirmPassword) {
							errors.confirmPassword = <ErrorText>Password does not match</ErrorText>;
						}

						return errors;
					}}
					onSubmit={updateUserPassword}
				>
					{({ isSubmitting, errors, touched }) => (
						<Form className={classes.form}>
							<div className={classes.formText}>
								<h1 classes={classes.headingText}>Change Password</h1>
							</div>
							<Input
								type={!showPassword ? "password" : "text"}
								name="oldPassword"
								placeholder="Old Password"
								isInvalidField={errors.oldPassword && touched.oldPassword}
								isPasswordField={true}
								isShowing={showPassword}
								setIsShowing={setShowPassword}
							/>

							<Input
								type={!showNewPassword ? "password" : "text"}
								name="password"
								placeholder="New Password"
								isInvalidField={errors.password && touched.password}
								isPasswordField={true}
								isShowing={showNewPassword}
								setIsShowing={setShowNewPassword}
							/>

							<Input
								type={!showConfirmPassword ? "password" : "text"}
								name="confirmPassword"
								placeholder="Confirm Password"
								isInvalidField={errors.confirmPassword && touched.confirmPassword}
								isPasswordField={true}
								isShowing={showConfirmPassword}
								setIsShowing={setShowConfirmPassword}
							/>

							<Button type="submit" disabled={isSubmitting} className={classes.btnSubmit} btntext={"Save Changes"} />
						</Form>
					)}
				</Formik>
			</React.Fragment>
		</div>
	);
};

export default EditProfile;
