import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstant";
import MetaData from "./MetaData";
import Loading from "./Loading";

const UpdatePassword = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, isUpdated, loading } = useSelector((state) => state.profile);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const registerSubmit = (e) => {
		e.preventDefault();
		console.log("Register Form Submitted");
		const myForm = new FormData();
		myForm.set("oldPassword", oldPassword);
		myForm.set("newPassword", newPassword);
		myForm.set("confirmPassword", confirmPassword);

		dispatch(updatePassword(myForm));
		alert.success("Profile Updated Successfully");
		history.push("/account");
		if (error) {
			alert.error(error);
		}
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("Password Updated Successfully");
			history.push("/account");
			dispatch({
				type: UPDATE_PASSWORD_RESET,
			});
		}
	}, [dispatch, error, alert, history, isUpdated]);
	return (
		<>
			<MetaData title="Change Password" />

			{loading ? (
				<Loading />
			) : (
				<Container>
					<Box>
						<h2>Update Password</h2>
						<form className="signUpForm" onSubmit={registerSubmit}>
							{/*Old  Password */}
							<LoginPassword className="loginPasswordDiv">
								<VpnKeyIcon />
								<input
									type="password"
									placeholder="Old Password"
									required
									value={oldPassword}
									onChange={(e) => setOldPassword(e.target.value)}
								/>
							</LoginPassword>

							{/*New  Password */}
							<LoginPassword className="loginPasswordDiv">
								<LockOpenIcon />
								<input
									type="password"
									placeholder="New Password"
									required
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</LoginPassword>

							{/*Confirm  Password */}
							<LoginPassword className="loginPasswordDiv">
								<LockIcon />
								<input
									type="password"
									placeholder="Confirm Password"
									required
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</LoginPassword>

							{/* Submit Button */}
							<input type="submit" value="Change" className="signUpBtn" />
						</form>
					</Box>
				</Container>
			)}
		</>
	);
};

export default UpdatePassword;

const Container = styled.div`
	height: 74vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	.signUpForm {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2vmax;
		gap: 1rem;
		justify-content: space-evenly;
		height: 90%;
		transition: all 0.5s;
		@media all and (max-width: 800px) {
			gap: 0rem;
		}

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

			@media all and (max-width: 800px) {
				height: 2rem;
			}
		}
	}
`;
const Box = styled.div`
	h2 {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		@media all and (max-width: 800px) {
			padding-top: 2rem;
		}
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
	}
`;
const LoginPassword = styled.div`
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
`;
