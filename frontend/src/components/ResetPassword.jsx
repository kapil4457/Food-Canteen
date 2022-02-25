import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import Loading from "./Loading";

const ResetPassword = ({ match }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, success, loading } = useSelector(
		(state) => state.forgotPassword
	);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const resetPasswordSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.set("password", password);
		myForm.set("confirmPassword", confirmPassword);

		dispatch(resetPassword(match.params.token, myForm));
		alert.success("Password Updated Successfully");
		history.push("/login");
		if (error) {
			alert.error(error);
		}
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success("Password Updated Successfully");
			history.push("/login");
		}
	}, [dispatch, error, alert, history, success]);
	return (
		<>
			<MetaData title="Change Password" />
			{loading ? (
				<Loading />
			) : (
				<Container>
					<Box>
						<h2>Update Profile</h2>
						<form className="signUpForm" onSubmit={resetPasswordSubmit}>
							{/*New  Password */}
							<LoginPassword className="loginPasswordDiv">
								<LockOpenIcon />
								<input
									type="password"
									placeholder="New Password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
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
							<input type="submit" value="Update" className="signUpBtn" />
						</form>
					</Box>
				</Container>
			)}
		</>
	);
};

export default ResetPassword;

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
				font: 300 1.5vmax "Roboto";
			}
		}
	}
`;
const Box = styled.div`
	h2 {
		width: 100%;
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		color: gray;
		font-weight: 400;
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
		height: 60%;
		width: 80%;
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
