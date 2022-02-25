import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, login, register } from "../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import Loading from "./Loading";

// kapilsoni5861@gmail.com
const LoginSignUp = ({ location }) => {
	const history = useHistory();

	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const loginTab = useRef(null);
	const registerTab = useRef(null);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [loginUnder, setLoginUnder] = useState("3px solid tomato");
	const [registerUnder, setRegisterUnder] = useState("");
	const [loginFormVis, setLoginFormVis] = useState("");
	const [registerFormVis, setregisterFormVis] = useState("");

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState(`user.png`);

	const { name, email, password } = user;

	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(loginEmail, loginPassword));
		console.log("Login  Form Submitted");
	};

	const under1 = (e) => {
		setRegisterUnder("");
		setLoginUnder("3px solid tomato");
		setLoginFormVis("flex");
		setregisterFormVis("none");
	};

	const under2 = () => {
		setLoginUnder("");
		setRegisterUnder("3px solid tomato");
		setLoginFormVis("none");
		setregisterFormVis("flex");
	};

	const registerSubmit = (e) => {
		e.preventDefault();
		console.log("Register Form Submitted");
		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("avatar", avatar);
		dispatch(register(myForm));
		if (error) {
			alert.error(error);
		}
	};

	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	const redirect = location.search ? location.search.split("=")[1] : "/account";

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		setregisterFormVis("none");

		if (isAuthenticated) {
			dispatch(loadUser());
			history.push(redirect);
		}
	}, [dispatch, error, alert, history, isAuthenticated, redirect]);

	return (
		<>
			<MetaData title="Login" />

			{loading ? (
				<Loading />
			) : (
				<Container>
					<Box>
						<div className="head">
							<Toggle>
								<p onClick={under1} style={{ borderBottom: loginUnder }}>
									LOGIN
								</p>
								<p onClick={under2} style={{ borderBottom: registerUnder }}>
									REGISTER
								</p>
							</Toggle>
						</div>

						{/* Login Form */}
						<form
							className="loginForm"
							ref={loginTab}
							onSubmit={loginSubmit}
							style={{ display: loginFormVis }}
						>
							<LoginEmail className="loginEmailDiv">
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									value={loginEmail}
									onChange={(e) => setLoginEmail(e.target.value)}
								/>
							</LoginEmail>

							<LoginPassword className="loginPasswordDiv">
								<LockOpenIcon />
								<input
									type="password"
									placeholder="Password"
									required
									value={loginPassword}
									onChange={(e) => setLoginPassword(e.target.value)}
								/>
							</LoginPassword>
							<NavLink to="password/forgot">Forgot Password ? </NavLink>
							<input type="submit" value="Login" className="loginBtn" />
						</form>

						{/* Register Form */}
						<form
							className="signUpForm"
							ref={registerTab}
							encType="multipart/form-data"
							onSubmit={registerSubmit}
							style={{ display: registerFormVis }}
						>
							{/* Name */}
							<div className="signUpName">
								<FaceIcon />
								<input
									type="text"
									placeholder="Name"
									required
									name="name"
									value={name}
									onChange={registerDataChange}
								/>
							</div>
							{/* Email */}
							<div className="signUpEmail">
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									name="email"
									value={email}
									onChange={registerDataChange}
								/>
							</div>
							{/* Password */}
							<div className="signUpPassword">
								<LockOpenIcon />
								<input
									type="text"
									placeholder="Password"
									required
									name="password"
									value={password}
									onChange={registerDataChange}
								/>
							</div>
							{/* User Image */}
							<div id="registerImage">
								<img src={avatarPreview} alt="Avatar Preview" />
								<input
									type="file"
									required
									name="avatar"
									accept="image/*"
									onChange={registerDataChange}
								/>
							</div>
							{/* Submit Button */}
							<input
								type="submit"
								value="Register"
								className="signUpBtn"
								//  disabled={loading ? true:false}
							/>
						</form>
					</Box>
				</Container>
			)}
		</>
	);
};

export default LoginSignUp;

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
			// color:rgba(0,0,0,0.623);
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
	.loginForm,
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
			@media all and (max-width: 800px) {
				font: 500 1.5vmax "Gill Sans";
			}
		}

		.loginBtn,
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

	.loginPasswordDiv,
	.loginEmailDiv,
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
const Toggle = styled.div`
	display: flex;
	height: 3vmax;

	p {
		color: rgba(0, 0, 0, 0.678);
		font: 300 1vmax "Roboto";
		font-size: 1.3rem;
		transition: all 0.5s;
		cursor: pointer;
		display: grid;
		place-items: center;
		width: 100%;

		&:hover {
			color: tomato;
		}
	}
	@media all and (max-width: 800px) {
		height: 5vmax;
	}
`;
const LoginEmail = styled.div``;
const LoginPassword = styled.div``;
