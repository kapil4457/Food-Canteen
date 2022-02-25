import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../constants/userConstant";
import MetaData from "./MetaData";
import Loading from "./Loading";

const UpdateProfile = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();
	const { user } = useSelector((state) => state.user);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);
	const [name, setName] = useState("");
	const [email, setEmail] = useState(user.email);
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState(`user.png`);

	const registerSubmit = (e) => {
		e.preventDefault();
		console.log("Register Form Submitted");
		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("avatar", avatar);
		dispatch(updateProfile(myForm));
		alert.success("Profile Updated Successfully");
		history.push("/account");
		if (error) {
			alert.error(error);
		}
	};
	// const updateProfileDataChange = (e) => {
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		if (reader.readyState === 2) {
	// 			setAvatarPreview(reader.result);
	// 			setAvatar(reader.result);
	// 		}
	// 	};
	// 	reader.readAsDataURL(e.target.files[0]);
	// };

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setAvatarPreview(user.avatar.url);
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("Profile Updated Successfully");
			dispatch(loadUser());
			history.push("/account");
			dispatch({
				type: UPDATE_PROFILE_RESET,
			});
		}
	}, [dispatch, error, alert, history, user, isUpdated]);
	return (
		<>
			<MetaData title="Update Profile" />

			{loading ? (
				<Loading />
			) : (
				<Container>
					<Box>
						<h2>Update Profile</h2>
						<form
							className="signUpForm"
							encType="multipart/form-data"
							onSubmit={registerSubmit}
						>
							{/* Name */}
							<div className="signUpName">
								<FaceIcon />
								<input
									type="text"
									placeholder="Name"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							{/* Email */}
							<div className="signUpEmail">
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* Uncomment when you solve the backend cloudinary updation problem in UserController */}
							{/* User Image
						<div id="registerImage">
							<img src={avatarPreview} alt="Avatar Preview" />
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={updateProfileDataChange}
							/>
						</div> */}

							{/* Submit Button */}
							<input type="submit" value="Update" className="signUpBtn" />
						</form>
					</Box>
				</Container>
			)}
		</>
	);
};

export default UpdateProfile;

const Container = styled.div`
	height: 74vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	#registerImage {
		width: 100%;
		display: flex;
		align-items: center;
		img {
			width: 30px;
			height: 30px;

			position: absolute;
			transform: translateX(1vmax);
			font-size: 1.6vmax;
		}
		input {
			padding: 1vmax 4vmax;
			padding-right: 1vmax;
			width: 100%;
			box-sizing: border-box;
			border: 1px solid rgba(0, 0, 0, 0.267);
			border-radius: 4px;
			outline: none;
		}
	}
	.signUpForm {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2vmax;
		gap: 1rem;
		justify-content: space-evenly;
		height: 90%;
		transition: all 0.5s;

		a {
			text-decoration: none;
			align-self: flex-end;
			transition: all 0.5s;
			font: 500 0.9vmax "Gill Sans";
			color: rgba(0, 0, 0, 0.651);

			&:hover {
				color: black;
			}
		}

		.signUpBtn {
			border: none;
			background-color: tomato;
			color: white;
			font: 300 0.9vmax "Roboto";
			width: 100%;
			padding: 0.8vmax;
			cursor: pointer;
			transition: all 0.5s;
			border-radius: 4px;
			outline: none;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);

			&:hover {
				background-color: rgba(179, 66, 46);
			}
		}
	}

	.signUpName,
	.signUpEmail,
	.signUpPassword {
		display: flex;
		width: 100%;
		align-items: center;

		input {
			padding: 1vmax 4vmax;
			padding-right: 1vmax;
			width: 100%;
			box-sizing: border-box;
			border: 1px solid rgba(0, 0, 0, 0.267);
			border-radius: 4px;
			outline: none;
		}

		svg {
			position: absolute;
			transform: translateX(1vmax);
			font-size: 1.6vmax;
			color: rgba(0, 0, 0, 0.623);
		}
	}
`;
const Box = styled.div`
	h2 {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	height: 80%;
	width: 28%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-shadow: 0px 1px 10px black;
	border-radius: 4px;
	.head {
		button {
			background-color: tomato;
			height: 3px;
			width: 50%;
			border: none;
			transition: all 0.5s;
		}
	}
	@media all and (max-width: 800px) {
		width: 90%;
		height: 70%;
		padding: 0 3rem;
		h2 {
			padding-top: 3rem;
		}
		.signUpBtn {
			height: 2rem;
		}
	}
`;
