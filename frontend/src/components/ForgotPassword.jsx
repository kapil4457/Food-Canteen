import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "./MetaData";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import Loading from "./Loading";

const ForgotPassword = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, message, loading } = useSelector(
		(state) => state.forgotPassword
	);
	const [email, setEmail] = useState("");

	const forgotPasswordSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.set("email", email);
		dispatch(forgotPassword(myForm));
		alert.success(message);
		if (error) {
			alert.error(error);
			history.push("/password/forgot");
		}
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			alert.success(message);
		}
	}, [dispatch, error, alert]);

	return (
		<>
			<MetaData title="Forgot Password" />
			{loading ? (
				<Loading />
			) : (
				<Container>
					<Box>
						<h2>Forgot Password</h2>
						<form className="signUpForm" onSubmit={forgotPasswordSubmit}>
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

							{/* Submit Button */}
							<input type="submit" value="Send" className="signUpBtn" />
						</form>
					</Box>
				</Container>
			)}
		</>
	);
};

export default ForgotPassword;

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

	.signUpEmail {
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
		font-weight: 400;
		color: gray;
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	height: 50%;
	width: 28%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-shadow: 0px 1px 10px black;
	border-radius: 4px;

	@media all and (max-width: 800px) {
		width: 80%;
	}
`;
