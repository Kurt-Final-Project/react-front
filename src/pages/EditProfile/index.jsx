import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Input from "../../components/Input";
import ErrorText from "../../components/ErrorText";
import DataLoaderComponent from "../../utils/DataLoader";
import ProfilePicture from "../../components/ProfilePicture";
import { Loading } from "../../components/Spinner";
import { toaster } from "../../components/Toaster";

import { getUserDetailsApi, updateUserDetailsApi } from "./api";
import classes from "../EditProfile/EditProfile.module.css";

const EditProfile = () => {
	const { token, user_at } = useSelector((state) => state.auth);
	const [userDetails, setUserDetails] = useState(null);
	const [isUserLoading, setIsUserLoading] = useState(false);

	const getUserProfile = useCallback(async () => {
		setIsUserLoading(true);
		try {
			const res = await getUserDetailsApi({ token, user_at });
			const data = await res.json();

			if (!res.ok) {
				throw data.message;
			}

			setUserDetails(data.user);
			setIsUserLoading(false);
		} catch (err) {
			setIsUserLoading(false);
			console.log(err);
		}
	}, [token, user_at]);

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
			console.log("An error occured!");
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
									bio: data.bio,
									birthday: new Date(data.birthday).toISOString().slice(0, 10),
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

										<button type="submit" disabled={isSubmitting} className={classes.btnSubmit}>
											Apply Changes
										</button>
									</Form>
								)}
							</Formik>
						</React.Fragment>
					);
				}}
			</DataLoaderComponent>
		</div>
	);
};

export default EditProfile;
